import React, { useEffect, useState } from "react";
import { fetchSnippet } from "./api";

function computeStats(original, typed, elapsedSeconds) {
  const totalChars = typed.length;
  const correctChars = typed
    .split("")
    .filter((ch, i) => ch === original[i])
    .length;
  const accuracy =
    original.length === 0 ? 0 : (correctChars / original.length) * 100;
  const minutes = elapsedSeconds / 60;
  const wpm = minutes > 0 ? (correctChars / 5) / minutes : 0;
  return {
    totalChars,
    correctChars,
    accuracy: Number(accuracy.toFixed(2)),
    wpm: Number(wpm.toFixed(2))
  };
}

export default function App() {
  const [snippet, setSnippet] = useState("");
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchSnippet("python", "hard");
        setSnippet(data.snippet || "");
        setTyped("");
        setStats(null);
        setError("");
      } catch (e) {
        setError("Could not load snippet.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function handleStart() {
    setTyped("");
    setStats(null);
    setStartedAt(Date.now());
  }

  function handleStop() {
    if (!startedAt) return;
    const elapsedSeconds = (Date.now() - startedAt) / 1000;
    const s = computeStats(snippet, typed, elapsedSeconds);
    setStats(s);
    setStartedAt(null);
  }

  return (
    <div className="app">
      <h1>Code Typing Trainer</h1>
      {loading && <p>Loading snippet...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && snippet && (
        <>
          <h2>Python – Hard</h2>
          <pre className="snippet">{snippet}</pre>
          <div className="controls">
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
          </div>
          <textarea
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Start typing the code here..."
            rows={14}
          />
          {stats && (
            <div className="stats">
              <p>WPM: {stats.wpm}</p>
              <p>Accuracy: {stats.accuracy}%</p>
              <p>Correct chars: {stats.correctChars} / {snippet.length}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
