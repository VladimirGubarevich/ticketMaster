const initialState = {
	location: {
		country: '',
		city: ''
	},
	searchSports: {
		keyword: '',
		classification: ''
	},
	searchFamily: {
		keyword: '',
		classification: ''
	},
	page: 0
}

export default function searchReduser(state = initialState, action) {
	switch (action.type) {
		case 'SET_LOCATION':
			return {
				...state,
				location: action.payload
			}
		case 'SEARCH_SPOTRS':
			return {
				...state,
				searchSports: action.payload
			}
		case 'SEARCH_FAMILY':
			return {
				...state,
				searchFamily: action.payload
			}
		default:
			return state
	}
}