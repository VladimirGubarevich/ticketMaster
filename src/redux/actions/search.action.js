import { SET_LOCATION, SEARCH_IN_SPOTRS, SEARCH_IN_FAMILY } from '../types';

export function setLocation(val) {
	return {
		type: SET_LOCATION,
		payload: val
	}
}

export function searchInCategorySports(val) {
	return {
		type: SEARCH_IN_SPOTRS,
		payload: val
	}
}

export function searchInCategoryFamily(val) {
	return {
		type: SEARCH_IN_FAMILY,
		payload: val
	}
}