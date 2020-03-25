import { SET_LOCATION, SEARCH_IN_SPOTRS, SEARCH_IN_FAMILY } from '../types';

const initialState = {
	location: {
		country: '',
		city: ''
	},
	searchInCategorySports: {
		keyword: '',
		classification: ''
	},
	searchInCategoryFamily: {
		keyword: '',
		classification: ''
	},
	page: 0
}

export default function searchReduser(state = initialState, action) {
	switch (action.type) {
		case SET_LOCATION:
			return {
				...state,
				location: action.payload
			}
		case SEARCH_IN_SPOTRS:
			return {
				...state,
				searchInCategorySports: action.payload
			}
		case SEARCH_IN_FAMILY:
			return {
				...state,
				searchInCategoryFamily: action.payload
			}
		default:
			return state
	}
}