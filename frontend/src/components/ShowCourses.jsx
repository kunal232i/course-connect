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
import {BASE_URL} from "../config";

function ShowCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    const auth = `Bearer ${token}`;
    try {
      const res = await axios.get(`${BASE_URL}/admin/courses`, {
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
      width="100%"
      minHeight="100vh"
      pt={2}
      textAlign="center"
    >
      <Typography variant="h4" component="h1" color="black" mb={2}>
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

export function Course({course}) {
    const navigate = useNavigate();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img
            src={course.image}
            alt={course.title}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit</Button>
        </div>
    </Card>

}

export default ShowCourses;
