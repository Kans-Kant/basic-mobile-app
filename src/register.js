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

import Login from './login';
import Service from './service';

export default function Register({navigation}) {
  const classes = useStyles();
  const [errors, setErrors] = React.useState('');

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    lastName:'',
    firstName:'',
  });

  const onChangeValue = prop => event =>{
    setValues({ ...values, [prop]: event.target.value });
  }
  
  const handleSubmit = (event) =>{
    event.preventDefault();

    const url ='http://localhost:8585/auth/register';
    const user ={email : values.email, password : values.password, firstName : values.firstName, lastName : values.lastName};

    Service.post(
      url,
      user,
      (response)=> {
      //console.log(response);
      if (response.user!=undefined) {
        console.log(response);
        //props.history.push('/');
      }
      else{
        setErrors(" Retry once again ! ");
      }
    }
    )
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Container component="main" maxWidth="xs">
      <CssBaseline className={classes.paper}/>
      <div >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form noValidate className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={values.firstName} 
                onChange={onChangeValue('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={values.lastName} 
                onChange={onChangeValue('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email} 
                onChange={onChangeValue('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive jobs opportunities,and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {errors ? <p style={{color:"red",fontSize:"16px"}}> {errors}</p>  : ''}
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                
              </Link>
              <a
              onClick={() => navigation.navigate('Login')}
                > Already have an account? </a>
            </Grid>
          </Grid>
        </form>
      </div>
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
    marginLeft: theme.spacing(22),
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