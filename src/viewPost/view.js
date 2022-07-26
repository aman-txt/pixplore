
import React, { useRef, useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from "@mui/material/Box";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Login } from "../components/Login";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver'
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

export default function View() {

  const { route } = useAuthenticator(context => [context.route]);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return route === 'authenticated' ? <Newview /> : <Login />;
}
const Newview = () => {
  const downloadImage = () => {
    saveAs(location.state.id, tit +".jpg") // Put your image url here.
  }

  
  let navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.id);
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  var [dest,setDesc] = useState();
  var [tit,setTit] = useState();
  useEffect(() => {
    console.log(user.username);
    axios.post('https://ggvb5ukil4fp2yfkcdvz4iyzfm0phqpk.lambda-url.us-east-1.on.aws/', {
      ImgId: location.state.id
    }).then(function (response) {
      var desc = new Map(Object.entries(response.data.description));
      var title = new Map(Object.entries(response.data.title))
      
      
      setTit(title.get('S').toString());
      setDesc(desc.get('S').toString());
      
      console.log(tit);
      console.log(dest);
    })
      .catch(function (error) {
        console.log(error);
      })


  }, []);
  console.log(user.user_id);
  return (
    <>
      <Card sx={{ maxWidth: 800, margin: "2% auto 5% auto", float: "none", marginBottom: "10px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            width="400"
            image={location.state.id}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {tit}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dest}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => {
            axios.post("https://outku7xbn4d6fn33k4cdumriiq0kqvqb.lambda-url.us-east-1.on.aws/", {
              user_id: user.username,
              key: location.state.id
            });
            navigate("/user/feed")
          }
          } >
            SAVE
          </Button>
          <Button onClick={downloadImage}>Download!</Button> 
          {/* <a href={location.state.id} download="proposed_file_name">Download</a> */}
        </CardActions>
      </Card>
      <Box sx={{ bgcolor: "background.paper", p: 2 }} component="footer">
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
  )
}