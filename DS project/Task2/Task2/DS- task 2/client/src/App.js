import './App.css';
import Header from './components/Header';
import SubmitComment from './components/SubmitComment';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Register from './components/Register';
import Login from './components/Login';
import { Paper } from '@mui/material';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

function App() {
  const [user, setUser] = useState([]);
  const [jwt, setJwt] = useState("")



  return (
      <Router>
        <div className="App">
        <ThemeProvider theme={darkTheme}>
          <Header/>
          {/* Conditional rendering: Present You are logged in text when logged in */}
          <h2>{jwt ? `You are logged in!` : ""}</h2>
            <Routes>
              <Route path='/' element={<><h1>Welcome to the Library app!</h1></>}></Route>
              <Route path='/register' element={<><h1>Registration Page</h1> <Register user={user} setUser={setUser}/></>}></Route>
              <Route path='/login' element={<><h1>Login Page</h1> <Login setJwt={setJwt} setUser={setUser} jwt={jwt}/></>}></Route>
              <Route path='/books' element={<><h1>Books</h1><SubmitComment user={user} jwt={jwt}/></>}></Route>
            </Routes>
        </ThemeProvider>

        </div>
      </Router>
  );
}

export default App;
