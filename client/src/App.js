import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EditorPage from "./components/EditorPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            // Define default options
            style: {
              background: "#000",
              color: "#fff",
            },
            // Default options for specific types
            success: {
              duration: 4000,
              style: {
                background: "#000",
                color: "#fff",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "#000",
                color: "#fff",
              },
            },
          }}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </>
  );
}

export default App;
