import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../constants';

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
    isError,
  } = props;
  const [focus, setFocus] = useState(false);
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  return (
    <View
      style={[
        styles.textInputContainer,
        {
          borderBottomColor: isError || focus ? Colors.red : Colors.secondary,
        },
      ]}>
      <View style={styles.textInputSubContainer}>
        {inputIcon && (
          <TouchableOpacity onPress={onIconPress}>
            <Icon
              name={inputIcon}
              size={24}
              color={isError || focus ? Colors.red : Colors.secondary}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderTextColor={`${Colors.secondary}80`}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? isPassword : false}
          value={value}
        />
        {iconName && (
          <TouchableOpacity onPress={onIconPress}>
            <Icon name={iconName} size={24} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextField;

const styles = StyleSheet.create({
  textInputContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.secondary,
  },
  textInputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  textInput: {
    color: Colors.black,
    paddingVertical: Platform.OS === 'android' ? 8 : 14,
    paddingHorizontal: 5,
    fontSize: 16,
    flex: 1,
  },
});
