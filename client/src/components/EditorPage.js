import React, { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import Editor from "./Editor";
import Client from "./Client";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";

const EditorPage = () => {
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const editorContentRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const socket = await initSocket();
        socketRef.current = socket;

        socket.on("connect_error", handleConnectionError);
        socket.on("connect_failed", handleConnectionError);

        socket.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });

        socket.on(ACTIONS.JOINED, handleParticipantJoined);
        socket.on(ACTIONS.DISCONNECTED, handleParticipantLeft);
      } catch (error) {
        handleConnectionError(error);
      }
    };

    initializeSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [roomId, location.state?.username]);

  const handleConnectionError = (error) => {
    console.error("Connection Error:", error);
    toast.error("Connection failed. Please try again later.");
    navigate("/");
  };

  const handleParticipantJoined = ({ clients, username, socketId }) => {
    if (username !== location.state?.username) {
      toast.success(`${username} has joined the room.`);
    }
    setParticipants(clients);
    socketRef.current.emit(ACTIONS.SYNC_CODE, {
      code: editorContentRef.current,
      socketId,
    });
  };

  const handleParticipantLeft = ({ socketId, username }) => {
    toast.success(`${username} has left the room.`);
    setParticipants((prev) =>
      prev.filter((client) => client.socketId !== socketId)
    );
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard.");
    } catch (error) {
      console.error("Copy Room ID Failed:", error);
      toast.error("Failed to copy Room ID.");
    }
  };

  const leaveRoom = () => {
    navigate("/");
  };

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-10 d-flex flex-column h-100">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              editorContentRef.current = code;
            }}
          />
        </div>
        <div className="col-md-2 bg-light d-flex flex-column h-100">
          <div className="flex-grow-1 overflow-auto">
            <div className="mt-2">
              <button
                className="btn btn-success w-100 mb-2 p-3"
                onClick={copyRoomId}
              >
                Copy Room ID
              </button>
              <button
                className="btn btn-warning w-100 mb-2 p-2"
                onClick={leaveRoom}
              >
                Leave Room
              </button>
            </div>
            <h6 className="mb-3">USERS</h6>
            {participants.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
