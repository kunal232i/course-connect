import React, { useState } from "react";
import {
  TextField,
  Card,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

function CreateCourse() {
  const url = import.meta.env.VITE_BASE_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(true);

  const handleSubmit = async () => {
    const newCourse = {
      title,
      description,
      price,
      image: image,
      published: checked,
    };

    try {
      const token = localStorage.getItem("token");
      const auth = `Bearer ${token}`;
      const res = await axios.post(`${url}/admin/courses`, newCourse, {
        headers: {
          Authorization: auth,
        },
      });
      console.log(res.data);
      alert("Course Added!");
    } catch (error) {
      console.log("Errors: " + error);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant={"outlined"}
          style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="Published"
          />
          <br /><br />

          <Button
            size={"large"}
            variant="contained"
            onClick={handleSubmit}
          > Add course</Button>
        </Card>
      </div>
    </div>
  );
}

export default CreateCourse;
