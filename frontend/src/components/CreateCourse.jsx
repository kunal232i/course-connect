import React from "react";
import {
  TextField,
  Card,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

function CreateCourse() {
  const url = import.meta.env.BASE_URL;
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [fileLink, setFileLink] = React.useState("");
  const [checked, setChecked] = React.useState(true);

  const handleSubmit = async () => {
    const newCourse = {
      title,
      description,
      price,
      image: fileLink,
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
    } catch (error) {
      console.log("Errors : " + error);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
          <h1>Create Course Page</h1>
          <TextField
            id="outlined-basic"
            label="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br /> <br />
          <TextField
            id="outlined-basic"
            label="Description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br /> <br />
          <TextField
            id="outlined-basic"
            label="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br /> <br />
          <TextField
            id="outlined-basic"
            label="Img-Link"
            type="text"
            value={fileLink}
            onChange={(e) => setFileLink(e.target.value)}
          />
          <br /> <br />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="Published"
          />
          <br /> <br />
          <Button
            variant={"contained"}
            onClick={() => {
              handleSubmit();
            }}
          >
            Create Course
          </Button>
        </Card>
      </center>
    </div>
  );
}
export default CreateCourse;
