import React, {Suspense} from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//Navigationbar and the links to other pages 
const Header = () => {


  return (
    <div>
    <Box sx={{  }}>
    <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        
        <Button to='/' component={Link} variant="contained" >{"Homepage"}</Button>

        <Button to='/Books' component={Link} variant="contained" >{"Books"}</Button>

        <Button to='/Register' component={Link} variant="contained" >{"Register"}</Button>
        
        <Button to='/Login' component={Link} variant="contained" >{"Login"}</Button>
        </Typography>
      </Toolbar>
    </AppBar>
    </Box>
    </div>
  )
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <Header />
        </Suspense>
    )
}
