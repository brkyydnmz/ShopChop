import React from 'react';
import {SafeAreaView, View, Image, Alert} from 'react-native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
//import * as Yup from 'yup';
import styles from './Login.style';
import Input from '../../components/Input/Input';
import Button from '../../components/Button';

import Config from 'react-native-config';
import usePost from '../../hooks/usePost/usePost';

const Login = ({navigation}) => {
  const {data, post, loading, error} = usePost();
  const dispatch = useDispatch();

  function handleLogin(values) {
    post(Config.API_AUTH_URL + '/login', values);
  }

  if (error) {
    if (error.response) {
      Alert.alert('ShopChop', error.response.data);
    }
  }

  if (data) {
    if (data.status === 'Error') {
      Alert.alert('ShopChop', 'User not found!');
    } else {
      if (data.token !== undefined) {
        console.log('Success login token: ' + data.token);
        dispatch({type: 'SET_USER', payload: {user}});

        navigation.navigate('ProductsPage');
      } else {
        Alert.alert('ShopChop', 'User not found!');
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Image
          style={styles.logo}
          source={require('../../assets/login-logo.png')}
        />
      </View>
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={handleLogin}
        //YUP FORMIK ile validation şeması yapabilirsin mesela mail için @ ve .com zorunluluğu gibi
        //validationSchema={}
      >
        {({handleSubmit, handleChange, values}) => (
          <View style={styles.body_container}>
            <Input
              placeholder="Enter username..."
              value={values.username}
              onType={handleChange('username')}
              iconName={'account'}
            />
            <Input
              placeholder="Enter password..."
              value={values.password}
              onType={handleChange('password')}
              iconName={'key'}
              isSecure
            />
            <Button text="Login" onPress={handleSubmit} loading={loading} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export default Login;

const user = {
  address: {
    geolocation: {
      lat: '-37.3159',
      long: '81.1496',
    },
    city: 'kilcoole',
    street: 'new road',
    number: 7682,
    zipcode: '12926-3874',
  },
  id: 1,
  email: 'john@gmail.com',
  username: 'johnd',
  password: 'm38rmF$',
  name: {
    firstname: 'john',
    lastname: 'doe',
  },
  phone: '1-570-236-7033',
  __v: 0,
};
