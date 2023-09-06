import React from "react";
import axios from "axios";
import { TextField, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${url}/admin/login`, {
        username: email,
        password: password,
      });
      const TOKEN = res.data.token;
      localStorage.setItem("token", TOKEN);
      console.log(res.data);
      navigate("/courses");
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  return (
    <div
      style={{
        background: "#3AA6B9",
        width: "100%",
        height: "100%",
      }}
    >
      <center style={{ padding: "200px" }}>
        <Card
          varient={"outlined"}
          style={{
            width: "400px",
            padding: "20px",
          }}
        >
          <h1>Login to the website</h1>
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /> <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /> <br />
          New here ? <a href="/Register">Register</a>
          <br /> <br />
          <Button
            variant={"contained"}
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
        </Card>
      </center>
    </div>
  );
}

export default Login;
