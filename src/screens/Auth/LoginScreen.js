import React, {useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Strings} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {validateEmail, valdiatePass} from '../../utils/validation';
import {setLogin} from '../../redux/reducers/AuthReducer';
const CustomTextField = props => {
  const {
    placeholder,
    onChangeText,
    isPassword,
    iconName,
    iconColor,
    onIconPress,
    value,
    inputIcon,
    inputIconColor,
    bWidth,
    bColor,
  } = props;

  return (
    <View
      style={[
        styles.textInputContainer,
        {
          borderWidth: bWidth ? bWidth : 0,
          borderColor: bColor ? bColor : 'transparent',
        },
      ]}>
      <View style={styles.textInputSubContainer}>
        {inputIcon && (
          <TouchableOpacity onPress={onIconPress}>
            <Icon
              name={inputIcon}
              size={24}
              color={inputIconColor}
              style={{paddingRight: 16}}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? isPassword : false}
          value={value}
        />
      </View>
      {iconName && (
        <TouchableOpacity onPress={onIconPress}>
          <Icon
            name={iconName}
            size={24}
            color={iconColor}
            style={{paddingRight: 10}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

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
    const passValidate = valdiatePass(userPassword);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={{fontSize: 54, color: Colors.white, fontWeight: 'bold'}}>
          Login
        </Text>
      </View>
      <View style={{marginHorizontal: 24}}>
        <View>
          <CustomTextField
            placeholder="Enter Email..."
            onChangeText={e => setUserEmail(e)}
            value={userEmail}
            inputIcon="email"
            bWidth={emailError ? 1 : 0}
            bColor={emailError ? Colors.red : Colors.transparent}
          />
          {emailError && (
            <Text style={{textAlign: 'right', color: 'white'}}>
              Enter valid email address
            </Text>
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
            iconColor={`${Colors.black}50`}
            onIconPress={() => setShowPassword(!showPassword)}
            inputIcon="lock"
            bWidth={passwordError ? 1 : 0}
            bColor={passwordError ? Colors.red : Colors.transparent}
          />
          {passwordError && (
            <Text style={{textAlign: 'right', color: 'white'}}>
              Enter valid password
            </Text>
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
        <Text style={styles.submitText}>{Strings.SUBMIT}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    //justifyContent: 'center',
  },
  textInputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 36,
    //paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    paddingVertical: Platform.OS === 'android' ? 8 : 14,
    fontSize: 16,
    width: '70%',
  },
  submitContainer: {
    backgroundColor: 'green',
    margin: 24,
    borderRadius: 36,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  submitText: {
    color: Colors.white,
    fontSize: 16,
    paddingVertical: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
  },
  textInputSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
