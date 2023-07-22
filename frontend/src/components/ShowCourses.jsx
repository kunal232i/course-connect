import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowCourses() {
  const url = import.meta.env.BASE_URL;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    const auth = `Bearer ${token}`;
    try {
      const res = await axios.get(`${url}/admin/courses`, {
        headers: {
          Authorization: auth,
        },
      });
      console.log(res.data.courses);
      setCourses(res.data.courses);
    } catch (error) {
      console.log("Error :" + error);
    }
  };

  return (
    <Box
      bgcolor="#3AA6B9"
      width="100%"
      minHeight="100vh"
      pt={2}
      textAlign="center"
    >
      <Typography variant="h4" component="h1" color="white" mb={2}>
        All Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid key={course._id} item xs={12} sm={6} md={4} lg={3}>
            <Course course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function Course({ course }) {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      style={{
        backgroundColor: "#f0f0f0",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          {course.description}
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Price: ${course.price}
        </Typography>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 200,
            marginBottom: 16,
          }}
        >
          <img
            src={course.image}
            alt={course.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        </div>
        <Typography variant="body2" component="p" color="textSecondary">
          Published: {course.published ? "Yes" : "No"}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/updateCourse/" + course._id);
          }}
          style={{
            marginTop: 16,
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  );
}

export default ShowCourses;
