const initialState = {
	search: {
		keyword: '',
		country: '',
		city: '',
		classification: ''
	},
	page: 0
}

export default function searchReduser(state = initialState, action) {
	switch (action.type) {
		case 'SET_KEYWORD':
			return {
				...state,
				keyword: action.payload
			}
		case 'SET_COUNTRY':
			return {
				...state,
				country: action.payload
			}
		case 'SET_CITY':
			return {
				...state,
				city: action.payload
			}
		case 'SET_CLASSIFICATION':
			return {
				...state,
				classification: action.payload
			}
		case 'SET_CURRENT_PAGE':
			return {
				...state,
				page: action.payload
			}
		case 'SEARCH':
			return {
				...state,
				search: action.payload
			}
		default:
			return state
	}
}