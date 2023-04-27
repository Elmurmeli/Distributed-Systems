import React from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

//Microservice for Registration
const Register = ({user, setUser}) => {

    //Submit function for registering user
    
    const onSubmit= (e) => {
        e.preventDefault();
      //Create const newUser that we use in the fetch body
       const newUser = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        fetch("/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser),
            mode: "cors"
        })
        
        
    }
    //Handles changes on the username and password textfields
    const handleLogin = (e) => {
      setUser({...user, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <form onSubmit={onSubmit} onChange={handleLogin}>
      <Container maxWidth="xs" >

          <Paper elevation={24}>
                <h1>Register</h1>
                <br></br>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '10vh' }}
                >

                    <TextField type="text" placeholder="Enter Username" name='username' id='name' />
                    <br/>
                    <TextField type="password" placeholder= "Enter Password" name='password' id='password' />
                    <br/>
                    <Button variant="contained" endIcon={<SendIcon />} style={{padding:5}}  type="submit" value="submit" id='submit'>
                    Register
                    </Button>
                    <br></br>
                </Grid>
          </Paper>
        </Container>
      </form>
    </div>
  )
}

export default Register
