import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room ID generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }
    navigate(`/editor/${roomId}`, { state: { username } });
    toast.success("Room joined");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-10 col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h4 className="card-title mb-4">Fill up to Join a Room</h4>

              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="form-control mb-3"
                placeholder="Room ID"
                onKeyUp={handleInputEnter}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control mb-3"
                placeholder="Username"
                onKeyUp={handleInputEnter}
              />
              <button
                onClick={joinRoom}
                className="btn btn-primary btn-block mb-3"
              >
                Join Room
              </button>
              <p className="mb-0">
                Create your own Room: {" "}
                <button onClick={generateRoomId} className="btn btn-link p-0">
                  Click Here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
