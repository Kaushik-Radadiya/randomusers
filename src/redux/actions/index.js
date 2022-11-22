import {BASE_URL} from '../../constants/env';
import axios from 'axios';

export const LOGIN_USER = () => {
  return {
    type: 'LOGIN_USER',
  };
};
export const LOGOUT_USER = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export const GET_USERS = 'GET_USERS';
export const ADD_TO_FAVORITE_LIST = 'ADD_TO_FAVORITE_LIST';
export const REMOVE_FROM_FAVORITE_LIST = 'REMOVE_FROM_FAVORITE_LIST';

export const getUsers = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);
      if (response.data) {
        // console.log(response.data);
        dispatch({
          type: GET_USERS,
          payload: response.data,
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

export const addFavorite = data => dispatch => {
  dispatch({
    type: ADD_TO_FAVORITE_LIST,
    payload: data,
  });
};

export const removeFavorite = data => dispatch => {
  dispatch({
    type: REMOVE_FROM_FAVORITE_LIST,
    payload: data,
  });
};
