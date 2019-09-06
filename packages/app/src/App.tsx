import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { LoggedOutApp, LoggedInApp } from './Routes';
import { getToken } from './relay/helpers';

const App = () => {
  const [logged, setLogged] = useState<boolean>(false);

  async function loadToken() {
    try {
      const token = await getToken();
      if(token.substr(0, 3) === 'JWT')
      setLogged(true);
		} catch(err) {
      setLogged(false);
		}
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#271E85" barStyle="light-content" />
      {logged
        ? <LoggedInApp screenProps={{setLogged}} />
        : <LoggedOutApp screenProps={{setLogged}} />
      }
    </>
  )
};

export default App;
