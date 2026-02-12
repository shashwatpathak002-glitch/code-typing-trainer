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
    wpm: Number(wpm.toFixed(2)),
    time: elapsedSeconds
  };
}

const LANGUAGES = ["python", "javascript", "java", "cpp", "c", "ruby", "go", "rust", "php"];
const DIFFICULTIES = ["easy", "medium", "hard"];

const DIFFICULTY_COLORS = {
  easy: "#10b981",
  medium: "#f59e0b",
  hard: "#ef4444"
};

export default function App() {
  const [language, setLanguage] = useState("python");
  const [difficulty, setDifficulty] = useState("hard");
  const [snippet, setSnippet] = useState("");
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startedAt) {
        setElapsedTime(Math.floor((Date.now() - startedAt) / 1000));
      }
    }, 100);
    return () => clearInterval(timer);
  }, [startedAt]);

  useEffect(() => {
    loadSnippet();
  }, [language, difficulty]);

  async function loadSnippet() {
    try {
      setLoading(true);
      const data = await fetchSnippet(language, difficulty);
      setSnippet(data.snippet || "");
      setTyped("");
      setStats(null);
      setElapsedTime(0);
      setError("");
    } catch (e) {
      setError("Could not load snippet.");
    } finally {
      setLoading(false);
    }
  }

  function handleStart() {
    setTyped("");
    setStats(null);
    setElapsedTime(0);
    setStartedAt(Date.now());
  }

  function handleStop() {
    if (!startedAt) return;
    const elapsedSeconds = (Date.now() - startedAt) / 1000;
    const s = computeStats(snippet, typed, elapsedSeconds);
    setStats(s);
    setHistory([...history, { ...s, language, difficulty }]);
    setStartedAt(null);
  }

  function handleReset() {
    loadSnippet();
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="app">
      <div className="header">
        <h1>\u26a1 Code Typing Trainer</h1>
        <p className="subtitle">Improve your programming typing speed</p>
      </div>

      <div className="controls-section">
        <div className="selector-group">
          <label>Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={startedAt !== null}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-group">
          <label>Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={startedAt !== null}
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff} value={diff}>
                <span style={{ color: DIFFICULTY_COLORS[diff] }}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </span>
              </option>
            ))}
          </select>
        </div>

        <div className="difficulty-badge" style={{ borderColor: DIFFICULTY_COLORS[difficulty] }}>
          <span style={{ color: DIFFICULTY_COLORS[difficulty] }}>
            {difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      {loading && <p className="loading">Loading snippet...</p>}
      {error && <p className="error">\u26a0 {error}</p>}

      {!loading && snippet && (
        <>
          <div className="snippet-container">
            <pre className="snippet">{snippet}</pre>
          </div>

          {startedAt && (
            <div className="timer-display">
              <span className="timer">{formatTime(elapsedTime)}</span>
            </div>
          )}

          <div className="controls">
            <button
              onClick={handleStart}
              disabled={startedAt !== null}
              className="btn-primary"
            >
              ▶ Start
            </button>
            <button
              onClick={handleStop}
              disabled={startedAt === null}
              className="btn-warning"
            >
              ⏹ Stop
            </button>
            <button
              onClick={handleReset}
              disabled={startedAt !== null}
              className="btn-secondary"
            >
              ⟳ Reset
            </button>
          </div>

          <textarea
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Start typing the code here..."
            rows={14}
            disabled={startedAt === null && !stats}
          />

          {stats && (
            <div className="stats-container">
              <h3>Practice Results</h3>
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-label">WPM</div>
                  <div className="stat-value">{stats.wpm.toFixed(1)}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-label">Accuracy</div>
                  <div className="stat-value">{stats.accuracy.toFixed(1)}%</div>
                </div>
                <div className="stat-box">
                  <div className="stat-label">Time</div>
                  <div className="stat-value">{formatTime(Math.floor(stats.time))}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-label">Characters</div>
                  <div className="stat-value">{stats.correctChars}/{stats.totalChars}</div>
                </div>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="history-section">
              <h3>Recent Attempts</h3>
              <div className="history-list">
                {history.slice(-5).reverse().map((attempt, idx) => (
                  <div key={idx} className="history-item">
                    <span className="history-lang">{attempt.language}</span>
                    <span
                      className="history-diff"
                      style={{ borderColor: DIFFICULTY_COLORS[attempt.difficulty] }}
                    >
                      {attempt.difficulty}
                    </span>
                    <span className="history-wpm">{attempt.wpm.toFixed(1)} WPM</span>
                    <span className="history-acc">{attempt.accuracy.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
