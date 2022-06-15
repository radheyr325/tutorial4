import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import Axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                SolarX
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {

    const authorize =(e) =>{
        e.preventDefault();
        console.log(email);
        console.log(pswd);
        Axios.post('https://tutorial4-api.herokuapp.com/api/users/login',{
            email : email,
            password : pswd
        }).then((response) =>{
            alert(response.data.message);
            window.location.href = "/users";
        }).catch((response)=>{
            alert(response.response.data.message);
        })
    }

    const [email, setEmail] = React.useState('');
    const [pswd, setPswd] = React.useState('');



    return (
        <Grid container component="main" >
            <CssBaseline />
            <Grid item xs={false} sm={4} md={4}  />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div >

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form  onSubmit={authorize}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) =>setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e)=>setPswd(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                        >
                            Sign In
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}