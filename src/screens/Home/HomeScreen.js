import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants';
import axios from 'axios';
import {BASE_URL} from '../../constants/env';
import {
  addFavorite,
  removeFavorite,
  setUser,
} from '../../redux/reducers/UserReducer';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const {users, favorites} = useSelector(state => state.users);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      if (response.data) {
        dispatch(setUser(response.data));
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    } catch (error) {
      // Add custom logic to handle errors
      console.log(error);
    }
  };

  const addToFavoriteList = user => dispatch(addFavorite(user));
  const removeFromFavoriteList = user => dispatch(removeFavorite(user));

  const handleAddFavorite = user => {
    addToFavoriteList(user);
  };

  const handleRemoveFavorite = user => {
    removeFromFavoriteList(user);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      fetchUsers();
      setRefreshing(false);
    });
  }, []);

  const ifExists = user => {
    if (
      favorites.filter(item => item.picture.large === user.picture.large)
        .length > 0
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //   console.log('Item', JSON.stringify(users.results));
  const renderItem = ({item}) => {
    // console.log('ItemData ----------> ', JSON.stringify(item));
    return (
      <View style={styles.itemView}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Image
            source={{uri: item.picture.large}}
            resizeMode="cover"
            style={styles.profileImage}
          />
          <View style={{flex: 1, margin: 12}}>
            <View>
              <Text style={styles.profileName}>
                {`${item.name.title} ${item.name.first} ${item.name.last}`}
              </Text>
            </View>
            <View style={styles.emailContainer}>
              <MaterialCommunityIcons
                color={Colors.black}
                name="email"
                size={20}
              />
              <Text style={styles.emailText}>{item.email}</Text>
            </View>
            <View style={styles.profileAge}>
              <Text style={{color: Colors.black}}>Age:</Text>
              <Text style={styles.ageText}>{item.dob.age}</Text>
            </View>
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() =>
                  ifExists(item)
                    ? handleRemoveFavorite(item)
                    : handleAddFavorite(item)
                }
                activeOpacity={0.7}
                style={styles.favoriteContainer}>
                <MaterialCommunityIcons
                  color={ifExists(item) ? 'red' : 'white'}
                  size={24}
                  name={ifExists(item) ? 'heart' : 'heart-outline'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <StatusBar translucent backgroundColor={Colors.primary} />
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text style={styles.title}>My Users</Text>
          <View style={{flex: 1, marginHorizontal: 8}}>
            <FlatList
              data={users.results}
              keyExtractor={item =>
                `${item.name.title} ${item.name.first} ${item.name.last}`
              }
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              onRefresh={() => onRefresh()}
              refreshing={refreshing}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  itemView: {
    borderRadius: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    backgroundColor: Colors.white,
  },
  profileImage: {width: 100, height: '100%', borderRadius: 10},
  profileName: {fontSize: 22, paddingRight: 16, color: Colors.black},
  emailContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  emailText: {fontSize: 14, paddingLeft: 10, color: Colors.black},
  favoriteContainer: {
    flexDirection: 'row',
    padding: 2,
    backgroundColor: '#2D3038',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  profileAge: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  ageText: {fontSize: 14, paddingLeft: 10, color: Colors.black},
  title: {
    color: Colors.white,
    fontSize: 22,
    padding: 16,
    marginBottom: 8,
    backgroundColor: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
