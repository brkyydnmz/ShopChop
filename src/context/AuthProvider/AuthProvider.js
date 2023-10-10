import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
//import {createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import reducers from './reducer';

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('@USER').then(userSession => {
      userSession && setUser(JSON.parse(userSession));
      setAuthLoading(false);
    });
  }, []);
  const store = configureStore({
    reducer: reducers, // Specify your reducers here
    preloadedState: {user, isAuthLoading}, // Specify your initial state here
  });
  return <Provider store={store}>{children}</Provider>;
};

export default AuthProvider;
