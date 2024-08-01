import React, { useState } from "react";
import axios from "axios";
import { TextField, Typography, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";
import {BASE_URL} from "../config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/signup`, {
        username: email,
        password: password,
      });
      const TOKEN = res.data.token;
      localStorage.setItem("token", TOKEN);
      setUser({userEmail: email, isLoading: false})
      navigate("/courses");
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Course Connect. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br/><br/>
          <TextField
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br/><br/>
          <Button
            size={"large"}
            variant="contained"
            onClick={handleSignup}
          >
            Signup
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
