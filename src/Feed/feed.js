
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Login } from '../components/Login';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/user/feed">
        PixPlore : Explore your Intrests
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();


export default function Album() {
  const { route } = useAuthenticator(context => [context.route]);


  return route === 'authenticated' ? <OldAlbum /> : <Login />;
}

function OldAlbum() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  var [links, setLinks] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    console.log(user.username);
    axios.post('https://grzhgfcds4zdkywxrx6lnwkzyu0lvego.lambda-url.us-east-1.on.aws/', {
      user_id: user.username
    }).then(function (response) {
      console.log(response.data.toString());
      axios.post('https://fmzdy563bcs2aw5jo6shmau3ty0coqao.lambda-url.us-east-1.on.aws/', { interests: response.data.toString() })
        .then(function (response1) {
          console.log(response1.data.toString().split(","))
          setLinks(response1.data.toString().split(","));
        })
        .catch(function (error) {
          console.log(error);
        })

    })
      .catch(function (error) {
        console.log(error);
      })


  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <p>{ }</p>
        <div className='addIcon' style={{
          position: "fixed",
          bottom: "5%",
          right: "5%"
        }}>

          <Fab color="primary" aria-label="add" >
            <AddIcon onClick={() => navigate("/create/post")} />
          </Fab>
        </div>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              F E E D
            </Typography>
            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography> */}
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>


            {links.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%', display: 'flex', flexDirection: 'column', maxWidth: "auto",
                    maxHeight: "auto",
                  }}

                  onClick={() => { navigate("/view/post", { state: { id: card } }) }}
                >
                  <CardMedia
                    height={"200"}
                    component="img"
                    image={card}
                    alt="random"
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">

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
    </ThemeProvider >
  );
}