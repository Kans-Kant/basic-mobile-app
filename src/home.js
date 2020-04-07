import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

import Container from '@material-ui/core/Container';

import { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});

   useEffect(() =>{
    let state = window.localStorage.getItem("appState");
    if (state) {
      let AppState = JSON.parse(state);
      console.log(AppState);
      setIsLoggedIn(AppState.isLoggedIn);
      setUser(AppState);
    }
   },
    []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth="xs" style={{minHeight:"600px"}}>
      <div style={{marginTop:"100px"}}> Login Successful !</div>      
    </Container>
    </View>
    );
  }