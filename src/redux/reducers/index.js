import { combineReducers } from 'redux';
import posts from './posts.reducer';
import search from './search.reducer';

export default combineReducers({
  postsReducer: posts,
  searchReducer: search
})