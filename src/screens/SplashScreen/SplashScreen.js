import React, {useEffect} from 'react'
import { 
    Text,
    View,
    StyleSheet,
 } from 'react-native';
import { Colors } from '../../constants';

 const SplashScreen = ({navigation}) => {

     useEffect(() => {
         setTimeout(() => {
            navigation.navigate("LoginScreen");
         }, 2000)
     }, [])

     return(
        <View style={styles.container}>
            <Text style={styles.text}>RN Test</Text>
        </View>
     )
 }

 export default SplashScreen;

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.white,   
    }
 })