import * as api from '../../api/hashtag'
import { FETCH_ALL_HASHTAGS } from '../actionTypes';

export const fetchHashtags = () => async (dispatch) => {
  try {
    const { data } = await api.fetchHashtags();
    dispatch({ type: FETCH_ALL_HASHTAGS, payload: data });
  } catch (error) {
    console.error(error);
  }
};