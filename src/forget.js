import React,{Component} from 'react';
import {Text, View } from 'react-native';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Service from './service';

import { useState, useEffect } from "react";

const useStyles = makeStyles(theme => ({

  root:{
    marginTop:'60px',
    width: '80%',
    marginLeft:"10%",
    minHeight:'800px',
  },
  button : {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer : {
    marginBottom: theme.spacing(2),
  },
  resetContainer : {
    padding: theme.spacing(3),
  }
}));

  function getSteps() {
  return ['Forget Password', 'Reset Password', 'Final step'];
  };

export default function Forget({navigation}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors, setErrors] = React.useState('');
  const [conf, setConf] = React.useState('');

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    token:'',
    confirmPassword:'',
  });

  const handleNext= () =>   {

   setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

   const handleBack = () => {
   setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

   const onChangeValue  = prop => event =>{
    setValues({ ...values, [prop]: event.target.value });
  }

   const handleSubmitEmail = (event) => {
    event.preventDefault();

    const url ='http://localhost:8585/auth/forget-password';
    const user ={email : values.email };

    Service.post(
      url,
      user,
      (response)=> {
        console.log(response.status);
         if (response.status===200) {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
          setErrors('');
        }
        else{
          setErrors(" Email not correct ! ");
      }
    })
   };

    const handleSubmitPassword = (event) => {
      event.preventDefault();

      const url ='http://localhost:8585/auth/reset-password';
      const user ={token : values.token, password : values.password, confirmPassword : values.confirmPassword};

      Service.post(
        url,
        user,
        (response)=> {
        //console.log(response);
        if (response.status===200) {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
          setErrors('');
        }
        else{
          this.setErrors(" Email not correct ! ");
        }
      }
      )
   };

  const getStepContent= (step) => {
  switch (step) {
    case 0:
       return (
        <View>
          <div>
            <form  onSubmit={handleSubmitEmail}>
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
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form >
          </div>
          </View>
          );
    case 1:
      return (
      <View><div>
            <form  onSubmit={handleSubmitPassword}>
              <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="token"
               label="Token"
               name="token"
               autoFocus
               value={values.token} 
               onChange={onChangeValue('token')}
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
              <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               name="confirmPassword"
               label="Confirm Password"
               type="password"
               id="confirmPassword"
               autoComplete="current-password"
               value={values.confirmPassword} 
               onChange={onChangeValue('confirmPassword')}
              />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form >
          </div>
          </View>
          );
    case 2:
      return (
      <View>
        <div>
        <p>Your Password was reset Successfully</p>
          <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleNext}
                  >
                    Finish
                  </Button>
                </div>
              </div>
          </div>
          </View>
          );
    default:
      return 'Unknown step';
    }
  }
   
  const steps = getSteps();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:'100px' }}>
    <div className={classes.root}>
    {errors ? <p style={{color:"red",fontSize:"20px"}}> {errors}</p>  : ''}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(activeStep)}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you have finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
    </View>
  );
 }