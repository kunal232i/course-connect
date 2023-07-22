import React from "react";
import axios from "axios";
import { TextField, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const url = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSingup = async () => {
    try {
      const res = await axios.post(`${url}/admin/signup`, {
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
    <div style={{ background: "#3AA6B9", width: "100%", height: "100%" }}>
      <center style={{ padding: "200px" }}>
        <Card varient={"outlined"} style={{ width: "400px", padding: "20px" }}>
          <h1>Register to the website</h1>
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            value={email}
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
          Already a user? <a href="/login">Login</a>
          <br /> <br />
          <Button
            variant={"contained"}
            onClick={() => {
              handleSingup();
            }}
          >
            Register
          </Button>
        </Card>
      </center>
    </div>
  );
};

export default Signup;
