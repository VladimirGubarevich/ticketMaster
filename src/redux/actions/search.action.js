export function setKeyword(keyword) {
	return {
		type: 'SET_KEYWORD',
		payload: keyword
	}
}

export function setCountry(country) {
	return {
		type: 'SET_COUNTRY',
		payload: country
	}
}

export function setCity(city) {
	return {
		type: 'SET_CITY',
		payload: city
	}
}

export function setClassification(clf) {
	return {
		type: 'SET_CLASSIFICATION',
		payload: clf
	}
}

export function setCurrentPage(page) {
	return {
		type: 'SET_CURRENT_PAGE',
		payload: page
	}
}