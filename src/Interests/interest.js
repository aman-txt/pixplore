import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useAuthenticator } from '@aws-amplify/ui-react';
import TextField from "@mui/material/TextField";
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

function Interests() {
  const [data, setData] = useState('');
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  let interestsObj = ""
  useEffect(() => {

  }, []);

  const handleSubmit = async () => {

   


    console.log(document.getElementById("username").value);
    console.log(document.getElementById("desc").value);
    // make axios post request

    axios.post("https://nlhhrt7ol4eniujfzhl743alz40zdtmw.lambda-url.us-east-1.on.aws/",
      {
        user_id: user.username, interests: interestsObj.slice(0, interestsObj.length - 1), user_name: document.getElementById("username").value,
        profile_desc: document.getElementById("desc").value
      }
    )
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
    navigate("/user/feed")
  };

  const handleChange = (event) => {
    console.log("hi" + user.username);
    interestsObj = interestsObj + event.target.value.toString() + ","

    console.log(interestsObj.toString())

  }
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          marginTop={"50px"}
          gutterBottom
        >
          What are you interested In?
        </Typography>

        <form >
          <Box>
          <br />
            <TextField
              id="username"
              label="Enter New UserId"
              variant="outlined"
              sx={{ width: "40%" }}
              onChange={(e) => {

              }}
            />
            <br />
            <br />
            <TextField
              id="desc"
              label="Tell us something about you.."
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(e) => {

              }}
            />
            <br />
            <Fab
              color="primary"
              style={{
                height: "60px",
                width: "120px",
                marginTop: "50px",
              }}
              value="Landscape"
              onClick={handleChange}
            >Landscape


            </Fab>
            <Fab
              color="primary"
              aria-label="like"
              style={{
                height: "60px",
                width: "120px",
                marginLeft: "50px",
                marginTop: "50px",
              }}
              value="Sea"
              onClick={handleChange}
            >Sea

            </Fab>
            <Fab
              color="primary"
              aria-label="like"
              style={{
                height: "60px",
                width: "120px",
                marginLeft: "50px",
                marginTop: "50px",
              }}
              value="Plant"
              onClick={handleChange}
            >Plant

            </Fab>
            <Fab
              color="primary"
              aria-label="like"
              style={{
                height: "60px",
                width: "120px",
                marginTop: "50px",
              }}
              value="Mountain"
              onClick={handleChange}
            >Mountain

            </Fab>

            <Fab
              color="primary"
              aria-label="like"
              style={{
                height: "60px",
                width: "120px",
                marginLeft: "50px",
                marginTop: "50px",
              }}
              value="Building"
              onClick={handleChange}
            >Building

            </Fab>
            <Fab
              color="primary"
              aria-label="like"
              style={{
                height: "60px",
                width: "120px",
                marginLeft: "50px",
                marginTop: "50px",
              }}
              value="Person"
              onClick={handleChange}
            >Person

            </Fab>
            <Fab
              color="primary"
              aria-label="like"
              style={{
                height: "60px",
                width: "120px",
                marginTop: "50px",
              }}
              value="Nature"
              onClick={handleChange}
            >Nature

            </Fab>
            <Fab
              color="primary"
              aria-label="like"
              style={{
                height: "60px",
                width: "120px",
                marginLeft: "50px",
                marginTop: "50px",
              }}
              value="Meal"
              onClick={handleChange}
            >Meal

            </Fab>
          </Box>



          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            style={{ marginTop: "10%" }}
            onClick={handleSubmit}


          >
            CONTINUE
          </Button></form></Container>

      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          END
        </Typography>
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

    </>
  );
}

export default Interests;
