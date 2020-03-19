const initialState = {
    posts: [],
    isError: false,
    isLoading: false,
    searchBy: '',
    currentPage: 1,
    totalPages: null
};

export default function posts(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS':
            return {
                ...state,
                posts: action.payload
            }
        case 'GET_POSTS':
            return {
                ...state,
                searchBy: action.payload
            }
        case 'ERROR_FETCH_DATA':
            return {
                ...state,
                isError: action.payload
            }
        case 'LOADING':
            return {
                ...state,
                isError: action.payload
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            }
        case 'GET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.payload
            }
        default:
            return state;
    }
}