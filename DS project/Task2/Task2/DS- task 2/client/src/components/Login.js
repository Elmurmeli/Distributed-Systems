import React from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Buffer } from 'buffer';


//Microservice for login handle and authentication

const Login = ({setJwt, jwt, setUser}) => {
    const [userData, setUserData] = useState({})


    //Submit function for submitting the login information
    const submit = (e) => {
        e.preventDefault()

        fetch("/api/login/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                //Set jwt and save it.
                if(data.token) {
                    setJwt(data.token)
                    setUser(JSON.parse(Buffer.from(data.token.split(".")[1], "base64").toString()))
                }
            })
    }
    //Handles changes on the text fields for username and password
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }


  return (
    <div>
        <form onSubmit={submit} onChange={handleChange}>
        
        <Container maxWidth="xs" >
            <Paper elevation={24}>
                <h1>Login</h1>
                <br></br>
                <Grid 

                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '10vh' }}
                >
                    <TextField  type="text" placeholder="Enter Username" name='username' id='name' />
                    <br/>
                    <TextField type="password" placeholder= "Enter Password" name='password' id='password' />
                    <br/>
                    <Button variant="contained" endIcon={<SendIcon />} style={{padding:5}}  type="submit" value="submit" id='submit'>
                    Login
                    </Button>
                    <br/>
                </Grid>
            </Paper>
        </Container>
        </form>
    </div>
  )
}

export default Login
