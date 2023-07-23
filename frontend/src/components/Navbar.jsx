import React from "react";
import axios from "axios";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const url = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    userEmail();
  }, []);

  const userEmail = async () => {
    const token = localStorage.getItem("token");
    const auth = `Bearer ${token}`;

    try {
      const res = await axios.get(`${url}/admin/me`, {
        headers: {
          Authorization: auth,
        },
      });
      setLoggedIn(true);
      setEmail(res.data.username);
    } catch (error) {
      setLoggedIn(false);
      console.log("Error : " + error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUsername("");
  };

  const handleCourse = () => {
    navigate("/createCourse");
  };

  const handleCourses = () => {
    navigate("/courses");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/">
            CourseConnect{" "}
          </Typography>
          {loggedIn ? (
            <>
              <Button variant="contained" onClick={handleCourses}>
                {" "}
                Courses{" "}
              </Button>
              <Button variant="contained" onClick={handleCourse}>
                {" "}
                Add Course{" "}
              </Button>
              <Typography
                variant="subtitle1"
                component="span"
                sx={{ marginRight: "1rem" }}
              >
                {" "}
                {email}{" "}
              </Typography>
              <Button variant="contained" onClick={handleLogout}>
                {" "}
                Logout{" "}
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleLogin}>
                {" "}
                Login{" "}
              </Button>
              <Button variant="contained" onClick={handleSignup}>
                {" "}
                Signup{" "}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
