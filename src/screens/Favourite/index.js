import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants';
import {removeFavorite} from '../../redux/reducers/UserReducer';
import Header from '../../components/common/Header';

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
          </View>
          <View style={styles.favoriteContainer}>
            <TouchableOpacity
              onPress={() => handleRemoveFavorite(item)}
              activeOpacity={0.7}
              style={[styles.favoriteButton]}>
              <MaterialCommunityIcons
                color={Colors.red}
                size={26}
                name="star"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor={Colors.white} />
      <View style={styles.container}>
        <Header />
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
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
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
    // marginHorizontal: 8,
  },
  itemView: {
    marginVertical: 1,
    backgroundColor: Colors.white,
  },
  itemDataContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileImageContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  profileName: {
    fontSize: 16,
    paddingRight: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },
  favoriteContainer: {
    padding: 5,
  },
  favoriteButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
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
