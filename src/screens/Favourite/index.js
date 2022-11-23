import React from 'react';
import {
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

const FavouriteScreen = () => {
  const {favorites} = useSelector(state => state.users);
  const dispatch = useDispatch();

  const removeFromFavoriteList = user => dispatch(removeFavorite(user));

  const handleRemoveFavorite = user => {
    removeFromFavoriteList(user);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemView}>
        <View style={styles.itemDataContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{uri: item.picture.large}}
              resizeMode="cover"
              style={styles.profileImage}
            />
          </View>
          <View style={styles.detailContainer}>
            <View>
              <Text style={styles.profileName} numberOfLines={1}>
                {`${item.name.title} ${item.name.first} ${item.name.last}`}
              </Text>
            </View>
            <View style={styles.emailContainer}>
              <MaterialCommunityIcons
                color={`${Colors.white}80`}
                name="email"
                size={20}
              />
              <Text style={styles.emailText} numberOfLines={1}>
                {item.email}
              </Text>
            </View>
            <View style={styles.profileAge}>
              <Text style={styles.ageText}>Age: {item.dob.age}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleRemoveFavorite(item)}
            activeOpacity={0.7}
            style={[styles.favoriteContainer, {backgroundColor: Colors.white}]}>
            <MaterialCommunityIcons
              color={Colors.lightRed}
              size={18}
              name={'heart-remove'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite</Text>
      {favorites.length === 0 ? (
        <View style={styles.noItemView}>
          <MaterialCommunityIcons
            color={Colors.red}
            size={36}
            name="playlist-remove"
          />
          <Text style={styles.emptyText}>Add a user to favorites list.</Text>
        </View>
      ) : (
        <View style={styles.itemContainer}>
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
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    padding: 16,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  itemView: {
    borderRadius: 8,
    margin: 10,
    backgroundColor: Colors.red,
  },
  itemDataContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
  },
  detailContainer: {
    flex: 1,
    margin: 12,
  },
  profileImageContainer: {
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: '100%',
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  profileName: {
    fontSize: 18,
    paddingRight: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
  emailContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  emailText: {
    fontSize: 14,
    paddingLeft: 5,
    color: Colors.white,
    fontWeight: '500',
  },
  favoriteContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    flexDirection: 'row',
    padding: 2,
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
  },
  profileAge: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  ageText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '500',
  },
  noItemView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  emptyText: {
    color: Colors.red,
    fontSize: 18,
  },
});
