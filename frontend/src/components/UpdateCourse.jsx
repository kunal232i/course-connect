import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, TextField, Typography, Grid, Button } from "@mui/material";
import axios from "axios";

const UpdateCourse = () => {
  const url = import.meta.env.VITE_BASE_URL;
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const token = localStorage.getItem("token");
    const auth = `Bearer ${token}`;
    const res = await axios.get(`${url}/admin/courses/` + courseId, {
      headers: {
        Authorization: auth,
      },
    });
    console.log(res.data.courseById[0]);
    setCourse(res.data.courseById[0]);
  };

  if (!course) {
    return (
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Loading....
      </div>
    );
  }

  return (
    <div>
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </div>
  );
};

function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard({ course, setCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.image);
  const [price, setPrice] = useState(course.price);

  const handleEdit = () => {
    const token = localStorage.getItem("token");
    const auth = `Bearer ${token}`;
    axios.put(
      `${url}/admin/courses/` + course._id,
      {
        title: title,
        description: description,
        image: image,
        published: true,
        price,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: auth,
        },
      }
    );
    let updatedCourse = {
      _id: course._id,
      title: title,
      description: description,
      image: image,
      published: true,
      price,
    };
    setCourse(updatedCourse);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update course details
          </Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />
          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button
            variant="contained"
            onClick={async () => {
              const token = localStorage.getItem("token");
              const auth = `Bearer ${token}`;
              axios.put(
                `${url}/admin/courses/` + course._id,
                {
                  title: title,
                  description: description,
                  image: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: auth,
                  },
                }
              );
              let updatedCourse = {
                _id: course._id,
                title: title,
                description: description,
                image: image,
                published: true,
                price,
              };
              setCourse(updatedCourse);
            }}
          >
            {" "}
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const course = props.course;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={course.image} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{course.title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {course.price} </b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default UpdateCourse;
