import React from 'react';
import {SafeAreaView, View, Image, Alert} from 'react-native';
import {Formik} from 'formik';
//import * as Yup from 'yup';
import styles from './Login.style';
import Input from '../../components/Input/Input';
import Button from '../../components/Button';

import Config from 'react-native-config';
import usePost from '../../hooks/usePost/usePost';

const Login = () => {
  const {data, post, loading, error} = usePost();

  function handleLogin(values) {
    post(Config.API_AUTH_URL + '/login', values);
  }

  if (error) {
    Alert.alert('ShopChop', 'Problem found!');
    console.log(error + 'test');
  }

  if (data) {
    if (data.status === 'Error') {
      Alert.alert('ShopChop', 'User not found!');
    }
    console.log(data);
  }

  /*
  if (!loading) {
    if (data) {
      if (data.token !== undefined) {
        console.log('success...');
      }
    } else {
      Alert.alert('ShopChop', 'Something went wrong..');
    }
  }
  */

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
