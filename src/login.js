import React, { Component } from 'react';
import {Text, View } from 'react-native';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

import Service from './service';
import Register from './register';
import Forget from './forget';
import Home from './home';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login({navigation}) {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [errors, setErrors] = React.useState('');

  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const onChangeValue = prop => event =>{
    setValues({ ...values, [prop]: event.target.value });
  }
  
  const handleSubmit = (event) =>{
    event.preventDefault();

    const url ='http://localhost:8585/auth/login';
    const user ={email : values.email, password : values.password };

    Service.post(
      url,
      user,
      (response)=> {
        console.log(response);
        if(response){
          let userData = {
            token: response.token
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };              
           window.localStorage.setItem("appState", JSON.stringify(appState));

          setIsLoggedIn(appState.isLoggedIn);
          setUser(appState.user);
          console.log(appState);
          navigation.navigate('Home')
          }
          else setErrors('Login Failed!');     
      })
      };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div  className={classes.paper}>
        <Avatar  className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form  className={classes.form} onSubmit={handleSubmit}>
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
            value={values.email} 
            onChange={onChangeValue('email')}
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
            value={values.password} 
            onChange={onChangeValue('password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
             className={classes.submit}
          >
            Sign In
          </Button>
          {errors ? <p style={{color:"red",fontSize:"16px"}}> {errors}</p>  : ''}
          <Grid container>
            <Grid item xs>
              <a
              onClick={() => navigation.navigate('Forget')}
                > Forget Password ? </a>
            </Grid>
            <Grid item>
              <a
              onClick={() => navigation.navigate('Register')}
                > Don't have an Account ? </a>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </View>
    );
  }
const useStyles = makeStyles(theme => ({
  paper : {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar : {
    margin: theme.spacing(3),
     //marginLeft: theme.spacing(22),
    backgroundColor: theme.palette.secondary.main,
  },

 form : {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit : {
    margin: theme.spacing(3, 0, 2),
  },
}))