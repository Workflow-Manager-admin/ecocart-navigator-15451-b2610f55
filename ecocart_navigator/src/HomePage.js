import React from "react";
import "./App.css";

// PUBLIC_INTERFACE
function HomePage({ onShopNow }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 56%, #4caf50 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 80
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={"/logo192.png"}
            alt="EcoCart Logo"
            className="homepage-logo-img"
            style={{
              width: 95,
              height: 95,
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 2px 16px 0 #4caf5040",
              marginRight: 20
            }}
          />
          <span
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#388E3C",
              fontFamily: "'Inter', 'Roboto', sans-serif"
            }}
          >
            EcoCart Navigator
          </span>
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#357a38",
            fontWeight: 500,
            marginBottom: 24,
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto",
            letterSpacing: 0.1
          }}
        >
          Shop smarter and greener.<br />
          Discover eco-friendly products and track your environmental impact!
        </div>
        <button
          className="btn btn-large"
          onClick={onShopNow}
          style={{
            background: "linear-gradient(95deg, #4caf50, #81c784)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 22,
            padding: "18px 55px",
            borderRadius: 32,
            border: "none",
            outline: "none",
            cursor: "pointer",
            boxShadow: "0 5px 30px 0 #81c78440, 0 2px 10px 0 #357a3840",
            transition: "background .19s"
          }}
        >
          Shop Now
        </button>
      </div>
      {/* Earthy backdrop for atmosphere */}
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100vw",
          height: "200px",
          background:
            "radial-gradient(ellipse at 50% 100%, #43a047 70%, transparent 100%)",
          zIndex: 1
        }}
      />
    </div>
  );
}

export default HomePage;
