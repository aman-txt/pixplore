import React from "react";
import "../Posts/createPost.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//const cors = require('cors');
//app.use(cors());
import { useState } from "react";
import axios from "axios";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Login } from "../components/Login";
import FileBase64 from 'react-file-base64';
import { useNavigate } from "react-router-dom";
const Input = styled("input")({
  display: "none",
});


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/user/feed">
        PixPlore : Explore your Interests
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function CreatePost() {
  const { route } = useAuthenticator(context => [context.route]);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return route === 'authenticated' ? <NewCreatePost /> : <Login />;
}
function NewCreatePost() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const [photo, setPhoto] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(photo["selectedFile"]));

    axios.post("https://756dhuerdlh436y77rnhhovfzu0ssebb.lambda-url.us-east-1.on.aws/", {
      file: photo["selectedFile"],
      user_id: user.username,
      title: title,
      description: description
    },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
      .then((result) => {
        console.log(result.data);
        console.log(result.data.uploadResult.Location);
      })
      .catch((err) => {
        console.error(err);
      }).finally(
        navigate("/user/feed")
      );
  };
 
  return (
    <>

      <Box
        sx={{
          boxShadow: 3,
          maxWidth: "70%",
          maxHeight: "40%",
          margin: "2% auto 5% auto",
          borderRadius: 4,
        }}
      >
        <form>
          <label className="label">
            Choose an image to upload from your system
          </label>
          <br />
          <TextField
            id="outlined-basic"
            label="Enter Image Title"
            variant="outlined"
            sx={{ width: "40%" }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <TextField
            id="outlined-multiline-flexible"
            label="Image Description here"
            multiline
            maxRows={4}
            sx={{ width: "40%" }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />          
          <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setPhoto({ selectedFile: base64 })} />
          <Stack direction="row" alignItems="center" spacing={2}>

            <label htmlFor="contained-button-file">

              <Button variant="contained" component="span" onClick={onSubmit}>
                Submit
              </Button>
            </label>
          </Stack>
          <Container sx={{ py: 3 }}>
            <Card
              sx={{
                maxWidth: "30%",
                display: "flex",
                flexDirection: "column",
                margin: "2% auto 5% auto",
              }}
            >              
              <CardMedia
                component="img"
                image={photo["selectedFile"]}
                alt="random"                
              />
            </Card>
          </Container>
        </form>
      </Box>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Always Follow your dreams!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}

