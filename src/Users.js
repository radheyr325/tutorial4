import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import Axios from "axios";

import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

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


const theme = createTheme();

export default function Users() {

    const [cards, setCards]= useState([]);


    useEffect(() =>{
        Axios.get("https://tutorial4-api.herokuapp.com/api/users").then((response) =>{
           setCards(response.data.data);
        });
    },[]);

    const navigate = useNavigate();
    const handlesubmit = (id) => {

        navigate(`/users/${id}`);
    }


    const initialValues = { search: "" };
    const [formValue, setFormValue] = useState(initialValues);
    const [searchdata, setSearchdata] = useState([]);

    const searchBar = (e) => {
        e.preventDefault();

        console.log("search input", formValue.search);


        const searchedprofile = cards.filter((val) => {
            if (formValue.search.toLowerCase().includes(val.firstName.toLowerCase())) {
                return val.firstName;
            }
        })
        console.log("Searched data is here ", searchedprofile)
        setSearchdata(searchedprofile);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        SolarX
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>

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
                            Solar X
                        </Typography>

                                <TextField
                                    label="Search First Name "
                                      name={"search"}    value={formValue.search}  onChange={handleChange}
                                 />

                            <Button
                             sx={{mt:1, ml:2}}
                        type='submit'
                        onClick={searchBar}
                        variant="contained"
                    >
                        Search
                    </Button>   {
                        searchdata.map((card) => (
                            <Container sx={{ py: 1 }} maxWidth="xs">

                                <Card variant="outlined"
                                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        image= {card.picture}
                                        alt="photo"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title} {card.firstName} {card.lastName}
                                        </Typography>
                                        <Typography>
                                            Email: {card.email}
                                        </Typography>
                                        <CardActions>

                                            <Button size="small"  onClick={() => handlesubmit(card.id)}>View</Button>

                                        </CardActions>
                                    </CardContent>

                                </Card>

                            </Container>
                        ))
                    }
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            List Of Users
                        </Typography>

                    </Container>
                </Box>
                <Container maxWidth="xl">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '0%',
                                        }}
                                        image={card.picture}
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}. {card.firstName} {card.lastName}
                                        </Typography>
                                        <Typography>
                                            Email : {card.email}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => handlesubmit(card.id)}>View</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">

                <Copyright />
            </Box>

        </ThemeProvider>
    );
}