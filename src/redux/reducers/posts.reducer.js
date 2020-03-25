import { FETCH_POSTS_SUCCESS, ERROR_FETCH_DATA, LOADING, SET_CURRENT_PAGE, GET_TOTAL_PAGES } from '../types';

const initialState = {
    posts: [],
    isError: false,
    isLoading: false,
    currentPage: 1,
    totalPages: null
};

export default function posts(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            }
        case ERROR_FETCH_DATA:
            return {
                ...state,
                isError: action.payload
            }
        case LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case GET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload
            }
        default:
            return state;
    }
}