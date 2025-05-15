// src/components/Home.jsx
export default function Home({ onStart }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🧠 Welcome to React Quiz App</h1>
      <p>Test your knowledge with this fun quiz!</p>
      <button
        onClick={onStart}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}
