import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL, Colors} from '../../constants';
import axios from 'axios';
import {
  addFavorite,
  removeFavorite,
  setUser,
} from '../../redux/reducers/UserReducer';
import Header from '../../components/common/Header';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

let page = 1;
const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const {users, favorites} = useSelector(state => state.users);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}page=${page}&results=10`);
      if (response.data) {
        const data = refreshing
          ? response.data.results
          : [...users, ...response.data.results];
        dispatch(setUser(data));
        setLoading(false);
        setRefreshing(false);
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
    page = 1;
    setRefreshing(true);
    wait(2000).then(() => {
      fetchUsers();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ifExists = user => {
    if (favorites.filter(item => item.id.value === user.id.value).length > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreData = () => {
    page = page + 1;
    fetchUsers();
  };

  const renderItem = ({item}) => {
    const exists = ifExists(item);
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
                color={Colors.secondary}
                name="mail-outline"
                size={14}
              />
              <Text style={styles.emailText} numberOfLines={1}>
                {item.email}
              </Text>
            </View>
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons
                color={Colors.red}
                name="location-pin"
                size={14}
              />
              <Text style={styles.locationText} numberOfLines={1}>
                {item?.location?.city}, {item?.location?.country}
              </Text>
            </View>
          </View>
          <View style={styles.favoriteContainer}>
            <TouchableOpacity
              onPress={() =>
                ifExists(item)
                  ? handleRemoveFavorite(item)
                  : handleAddFavorite(item)
              }
              activeOpacity={0.7}
              style={[styles.favoriteButton]}>
              <MaterialCommunityIcons
                color={Colors.red}
                size={26}
                name={exists ? 'star' : 'star-outline'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor={Colors.white} />
      <View style={styles.container}>
        <Header />
        <View style={styles.itemContainer}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={users}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl
                  colors={Colors.secondary}
                  tintColor={Colors.secondary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
    marginHorizontal: 8,
  },
  itemView: {
    borderRadius: 10,
    margin: 5,
    marginLeft: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  itemDataContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  detailContainer: {
    flex: 1,
    margin: 12,
  },
  profileImageContainer: {
    justifyContent: 'center',
    marginLeft: -15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  profileName: {
    fontSize: 16,
    paddingRight: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 14,
    marginLeft: 2,
    color: Colors.secondary,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 14,
    color: Colors.red,
    marginLeft: 2,
    fontWeight: '500',
  },
  favoriteContainer: {
    padding: 5,
  },
  favoriteButton: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
  },

  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
