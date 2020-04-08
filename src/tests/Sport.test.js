import React from 'react';
import { render } from '@testing-library/react';
import { Sport } from '../pages/Sport';

describe('Sport component', () => {
	let renderResult;
	const location = { country: '', city: '' };
	const setLocation = jest.fn();
	const getSportPosts = jest.fn();
	const setCurrentPage = jest.fn();
	const pagination = {
		currentPage: 1,
		totalPages: 10
	}
	const searchInCategorySport = jest.fn();
	const defaultProps = {
		getSportPosts: getSportPosts,
		storeFilter: {
			keyword: '',
			classification: ''
		},
		posts: [],
		isLoading: false,
		storeLocation: location,
		setLocation: setLocation,
		isFetchError: false,
		pagination: pagination,
		setCurrentPage: setCurrentPage,
		searchInCategorySport: searchInCategorySport
	}

	beforeEach(() => {
		renderResult = render(<Sport {...defaultProps} />)
	});

	test('It should be call on first render', () => {
		expect(getSportPosts).toHaveBeenCalledTimes(1);
		expect(setCurrentPage).toHaveBeenCalledTimes(1);
	});

	test('It should be call getSportPosts on change carrentPage', () => {
		expect(setCurrentPage).toHaveBeenCalled();
		expect(getSportPosts).toHaveBeenCalled();
		pagination.currentPage = 2;
		expect(getSportPosts).toHaveBeenCalled();
	});

	test('It should display searchBar and content', () => {
		const { getByTestId } = renderResult;
		expect(getByTestId('content')).toBeDefined();
		expect(getByTestId('search-bar')).toBeDefined();
	});
})