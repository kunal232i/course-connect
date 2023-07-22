import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const isLoggedIn = localStorage.getItem("token");

  return (
    <div>
      <div sx={{ padding: "40px 0" }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Welcome to the Course Selling Website!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Learn and grow with our diverse collection of high-quality courses
            taught by experts in their fields.
          </Typography>
          <div sx={{ textAlign: "center", marginTop: "20px" }}>
            <Grid container spacing={2} justifyContent="center">
              {isLoggedIn ? (
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    color="primary"
                  >
                    Logout
                  </Button>
                </Grid>
              ) : (
                <>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleSignUp}
                      color="primary"
                    >
                      Register
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleLogIn}
                      color="primary"
                    >
                      LogIn
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Landing;
