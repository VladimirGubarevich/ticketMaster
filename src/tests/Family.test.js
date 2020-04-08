import React from 'react';
import { render } from '@testing-library/react';
import { Family } from '../pages/Family';

describe('Family component', () => {
	let renderResult;
	const location = { country: '', city: '' };
	const setLocation = jest.fn();
	const getFamilyPosts = jest.fn();
	const setCurrentPage = jest.fn();
	const pagination = {
		currentPage: 1,
		totalPages: 10
	}
	const searchInCategoryFamily = jest.fn();
	const defaultProps = {
		getFamilyPosts: getFamilyPosts,
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
		searchInCategoryFamily: searchInCategoryFamily
	}

	beforeEach(() => {
		renderResult = render(<Family {...defaultProps} />)
	});

	test('It should be call on first render', () => {
		expect(getFamilyPosts).toHaveBeenCalledTimes(1);
		expect(setCurrentPage).toHaveBeenCalledTimes(1);
	});

	test('It should be call getFamilyPosts on change carrentPage', () => {
		expect(setCurrentPage).toHaveBeenCalled();
		expect(getFamilyPosts).toHaveBeenCalled();
		pagination.currentPage = 2;
		expect(getFamilyPosts).toHaveBeenCalled();
	});

	test('It should display searchBar and content', () => {
		const { getByTestId } = renderResult;
		expect(getByTestId('content')).toBeDefined();
		expect(getByTestId('search-bar')).toBeDefined();
	});
})