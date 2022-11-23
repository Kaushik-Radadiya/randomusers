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
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL, Colors} from '../../constants';
import axios from 'axios';
import {
  addFavorite,
  removeFavorite,
  setUser,
} from '../../redux/reducers/UserReducer';

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
            onPress={() =>
              ifExists(item)
                ? handleRemoveFavorite(item)
                : handleAddFavorite(item)
            }
            activeOpacity={0.7}
            style={[
              styles.favoriteContainer,
              {backgroundColor: exists ? Colors.white : Colors.secondary},
            ]}>
            <MaterialCommunityIcons
              color={exists ? Colors.lightRed : Colors.white}
              size={18}
              name={exists ? 'heart' : 'heart-outline'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={'white'} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Users</Text>
      <View style={styles.itemContainer}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            // onRefresh={() => onRefresh()}
            // refreshing={refreshing}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                colors={Colors.white}
                tintColor={Colors.white}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

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
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
