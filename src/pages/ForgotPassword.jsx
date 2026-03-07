import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div style={{ padding: 40 }}>
      <h2>Reset Password</h2>

      <input
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={() => alert("Reset link sent to " + email)}>
        Send Reset Link
      </button>
    </div>
  );
};

export default ForgotPassword;
