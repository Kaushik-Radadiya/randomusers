import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../redux/reducers/AuthReducer';
import CustomTextField from '../../components/common/CustomTextField';
import {validateEmail, validatePass} from '../../utils';

const LoginScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const validateUser = () => {
    let email = 'reactnative@jetdevs.com';
    let password = 'jetdevs@123';

    if (userEmail === email && userPassword === password) {
      console.log('User is legit');
      dispatch(setLogin(true));
    } else {
      Alert.alert('Invalid credentials!');
      setUserEmail('');
      setUserPassword('');
    }
  };

  const checkStrings = () => {
    let isValid = true;
    const mailValidate = validateEmail(userEmail);
    const passValidate = validatePass(userPassword);
    if (mailValidate && userEmail !== '') {
      setEmailError(false);
    } else {
      setEmailError(true);
      isValid = false;
    }
    if (passValidate && userPassword !== '') {
      setPasswordError(false);
    } else {
      setPasswordError(true);
      isValid = false;
    }
    return isValid;
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar translucent backgroundColor={Colors.primary} />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoImage}>
            <Image
              style={styles.logo}
              source={require('../../assets/Logo.jpeg')}
            />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <CustomTextField
              placeholder="Email"
              onChangeText={e => setUserEmail(e)}
              value={userEmail}
              inputIcon="email-outline"
              isError={emailError}
            />
            {emailError && (
              <Text style={styles.errorText}>Enter valid email address</Text>
            )}
          </View>
          <View>
            <CustomTextField
              placeholder="Password"
              onChangeText={e => setUserPassword(e)}
              value={userPassword}
              isPassword={showPassword}
              iconName={
                userPassword.length > 0 && (showPassword ? 'eye-off' : 'eye')
              }
              iconColor={`${Colors.secondary}50`}
              onIconPress={() => setShowPassword(!showPassword)}
              inputIcon="lock-outline"
              isError={passwordError}
            />
            {passwordError && (
              <Text style={styles.errorText}>Enter valid password</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={
            !userEmail || !userPassword
              ? styles.disabledSubmitContainer
              : styles.submitContainer
          }
          disabled={!userEmail || !userPassword}
          onPress={() => {
            if (checkStrings()) {
              validateUser();
            }
          }}>
          <Text style={styles.submitText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 25,
    borderRadius: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: -20,
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  logoImage: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    padding: 5,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
  },
  titleText: {
    fontSize: 32,
    textTransform: 'uppercase',
    color: Colors.black,
    fontWeight: 'bold',
  },
  errorText: {
    marginLeft: 5,
    color: Colors.error,
  },
  disabledSubmitContainer: {
    backgroundColor: Colors.secondary,
    marginVertical: 24,
    borderRadius: 5,
  },
  submitContainer: {
    backgroundColor: Colors.red,
    marginVertical: 24,
    borderRadius: 5,
  },
  submitText: {
    color: Colors.white,
    fontSize: 20,
    textTransform: 'uppercase',
    paddingVertical: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
