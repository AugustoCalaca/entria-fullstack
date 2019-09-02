import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { LoggedOutApp, LoggedInApp } from './Routes';
import { getToken } from './auth';

const App = () => {
  const logged = getToken();
  console.log('logged');
  console.log(logged);

  return (
    <>
      <StatusBar backgroundColor="#271E85" barStyle="light-content"s />
      {logged ? <LoggedInApp /> : <LoggedOutApp />}
    </>
  )
};

export default App;
