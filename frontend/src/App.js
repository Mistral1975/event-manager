import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/api/test")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Errore nella richiesta API:", error));
  }, []);

  return (
    <div>
      <h1>Test Proxy</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
