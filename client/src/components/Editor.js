import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";

import "codemirror/theme/monokai.css";
import "codemirror/theme/material.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/dracula.css";

import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  const defaultCode = "// Write your code here\n";

  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "ambiance",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          value: defaultCode, // Set the default code here
        }
      );

      // Sync the code
      editorRef.current = editor;

      editor.setSize(null, "115%");
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue(); // Code has value which we write
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, []);

  // Data received from server
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <div style={{ height: "600px" }}>
      <textarea id="realtimeEditor" defaultValue={defaultCode}></textarea>
    </div>
  );
}

export default Editor;
