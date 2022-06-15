
import axios from "axios";
import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";



const theme = createTheme();

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                SolarX
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Profile(){

    const id = useParams();
    console.log("Hello id"+id.id);
    const api = `https://tutorial4-api.herokuapp.com/api/users/${id.id}`;
    const [profile, setprofile] = useState([]);
    useEffect( () => {
            axios.get(api)
                .then(res => {
                    console.log(res.data.data);
                    setprofile(res.data.data) ;
                }).catch(function (error) {
                    console.log(error.toString());
                }
            );

        }
    );

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>

                    <Typography variant="h6" color="inherit" noWrap>
                       SolarX Profile Details
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>


                <Container sx={{ py: 1 }} maxWidth="xs">

                    <Card>
                        <CardMedia
                            component="img"
                            image= {profile.picture}
                            alt="profile picture"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {profile.title} {profile.firstName} {profile.lastName}
                            </Typography>
                            <Typography>
                                Email: {profile.email}
                            </Typography>
                            
                        </CardContent>

                    </Card>

                </Container>
            </main>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center">
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
        </ThemeProvider>

    );
}