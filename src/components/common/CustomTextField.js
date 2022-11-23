import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
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
    inputIconColor,
    placeholderTextColor,
    bWidth,
    bColor,
  } = props;

  return (
    <View
      style={[
        styles.textInputContainer,
        {
          borderWidth: bWidth || 0,
          borderColor: bColor || 'transparent',
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
          placeholderTextColor={placeholderTextColor || `${Colors.black}80`}
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

export default CustomTextField;

const styles = StyleSheet.create({
  textInputSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    backgroundColor: Colors.darkRed,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    color: Colors.white,
    paddingVertical: Platform.OS === 'android' ? 8 : 14,
    fontSize: 16,
    width: '70%',
  },
});
