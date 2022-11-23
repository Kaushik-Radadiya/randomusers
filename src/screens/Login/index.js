import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../redux/reducers/AuthReducer';
import CustomTextField from '../../components/common/CustomTextField';
import {validateEmail, validatePass} from '../../utils';

const LoginScreen = () => {
  const [userEmail, setUserEmail] = useState('reactnative@jetdevs.com');
  const [userPassword, setUserPassword] = useState('jetdevs@123');
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
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name={'login'} size={190} color={Colors.darkRed} />
      </View>
      <View style={styles.inputContainer}>
        <View>
          <CustomTextField
            placeholder="Enter Email..."
            onChangeText={e => setUserEmail(e)}
            value={userEmail}
            inputIcon="email"
            inputIconColor={Colors.white}
            placeholderTextColor={`${Colors.white}80`}
            bWidth={emailError ? 1 : 0}
            bColor={emailError ? Colors.error : Colors.transparent}
          />
          {emailError && (
            <Text style={{color: Colors.error}}>Enter valid email address</Text>
          )}
        </View>
        <View>
          <CustomTextField
            placeholder="Enter Password..."
            onChangeText={e => setUserPassword(e)}
            value={userPassword}
            isPassword={showPassword}
            iconName={
              userPassword.length > 0 && (showPassword ? 'eye-off' : 'eye')
            }
            iconColor={`${Colors.white}50`}
            onIconPress={() => setShowPassword(!showPassword)}
            inputIcon="lock"
            inputIconColor={Colors.white}
            placeholderTextColor={`${Colors.white}80`}
            bWidth={passwordError ? 1 : 0}
            bColor={passwordError ? Colors.error : Colors.transparent}
          />
          {passwordError && (
            <Text style={{color: Colors.error}}>Enter valid password</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.submitContainer}
        onPress={() => {
          if (checkStrings()) {
            validateUser();
          }
        }}>
        <Text style={styles.submitText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
  },
  titleText: {
    fontSize: 54,
    color: Colors.lightRed,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginHorizontal: 24,
  },
  submitContainer: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.darkRed,
    borderWidth: 2,
    margin: 24,
    borderRadius: 50,
  },
  submitText: {
    color: Colors.white,
    fontSize: 20,
    paddingVertical: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
