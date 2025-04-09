import React, { useState } from "react";  
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "../firebase";  
import { useNavigate } from "react-router-dom";  
import './Auth.css'; // Import the new CSS file  

const Auth = () => {  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [user, setUser] = useState(null);  
  const [error, setError] = useState("");  
  const navigate = useNavigate();  

  const handleSignUp = async () => {  
    try {  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);  
      setUser(userCredential.user);  
      setError("");  
      alert("Sign-up successful! Redirecting...");  
      navigate("/dashboard");  
    } catch (err) {  
      setError(err.message);  
    }  
  };  

  const handleLogin = async () => {  
    try {  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);  
      setUser(userCredential.user);  
      setError("");  
      alert("Login successful! Redirecting...");  
      navigate("/dashboard");  
    } catch (err) {  
      setError(err.message);  
    }  
  };  

  const handleLogout = async () => {  
    try {  
      await signOut(auth);  
      setUser(null);  
      alert("Logged out successfully!");  
      navigate("/auth");  
    } catch (err) {  
      setError(err.message);  
    }  
  };  

  return (  
    <div className="auth-container">  
      <div className="auth-box">  
        <h2 className="auth-title">🌟 Login / Register 🌟</h2>  
        {error && <p className="error-message">{error}</p>}  
        {user ? (  
          <p className="welcome-message">Welcome, {user.email}!</p>  
        ) : (  
          <div className="input-group">  
            <input  
              type="email"  
              placeholder="Email"  
              className="auth-input"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
            />  
            <input  
              type="password"  
              placeholder="Password"  
              className="auth-input"  
              value={password}  
              onChange={(e) => setPassword(e.target.value)}  
            />  
          </div>  
        )}  
        <div className="button-group">  
          {!user ? (  
            <>  
              <button onClick={handleSignUp} className="auth-button signup-button">Sign Up</button>  
              <button onClick={handleLogin} className="auth-button login-button">Login</button>  
            </>  
          ) : (  
            <button onClick={handleLogout} className="auth-button logout-button">Logout</button>  
          )}  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Auth;