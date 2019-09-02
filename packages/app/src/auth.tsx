import AsyncStorage from '@react-native-community/async-storage';

const AUTH = 'AN_AUTH_TOKEN_VERY_STRONG'

const getToken = async () => {
  const token = await AsyncStorage.getItem(AUTH);
  return token;
};

const signin = async (newToken: string) => {
  await AsyncStorage.setItem(AUTH, newToken);
};

const signout = () => {
  AsyncStorage.removeItem(AUTH);
};

export {
  getToken,
  signin,
  signout,
};
