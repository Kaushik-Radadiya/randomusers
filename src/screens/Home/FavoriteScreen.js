import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants';
import {removeFavorite} from '../../redux/reducers/UserReducer';

const FavoriteScreen = () => {
  const {favorites} = useSelector(state => state.users);
  const dispatch = useDispatch();

  const removeFromFavoriteList = user => dispatch(removeFavorite(user));

  const handleRemoveFavorite = user => {
    removeFromFavoriteList(user);
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemView}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Image
            source={{uri: item.picture.large}}
            resizeMode="cover"
            style={{width: 100, height: '100%', borderRadius: 10}}
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
                onPress={() => handleRemoveFavorite(item)}
                activeOpacity={0.7}
                style={styles.favoriteContainer}>
                <MaterialCommunityIcons
                  color={'white'}
                  size={24}
                  name={'heart-remove'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <View style={{flex: 1, backgroundColor: Colors.white}}>
          <Text style={styles.title}>Favorite</Text>
          <View style={{flex: 1, marginTop: 8}}>
            {favorites.length === 0 ? (
              <View style={styles.noItemView}>
                <MaterialCommunityIcons
                  color={Colors.black}
                  size={36}
                  name="playlist-remove"
                />
                <Text style={{color: Colors.black, fontSize: 18}}>
                  Add a user to favorites list.
                </Text>
              </View>
            ) : (
              <View style={{flex: 1, marginHorizontal: 8}}>
                <FlatList
                  data={favorites}
                  keyExtractor={item =>
                    `${item.name.title} ${item.name.first} ${item.name.last}`
                  }
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FavoriteScreen;

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
    backgroundColor: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noItemView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
