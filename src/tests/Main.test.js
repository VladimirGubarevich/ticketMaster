import React from 'react';
import { render } from '@testing-library/react';
import { Main } from '../pages/Main';

describe('Main component', () => {
	let renderResult;
	const location = { country: '', city: '' };
	const setLocation = jest.fn();
	const getAllPosts = jest.fn();
	const setCurrentPage = jest.fn();
	const pagination = {
		currentPage: 1,
		totalPages: 10
	}
	const defaultProps = {
		getAllPosts: getAllPosts,
		posts: [],
		isLoading: false,
		storeLocation: location,
		setLocation: setLocation,
		isFetchError: false,
		pagination: pagination,
		setCurrentPage: setCurrentPage
	}

	beforeEach(() => {
        renderResult = render(<Main {...defaultProps} />)
    });

	test('It should be call on first render', () => {
		expect(getAllPosts).toHaveBeenCalledTimes(1);
		expect(setCurrentPage).toHaveBeenCalledTimes(1);
	});

	test('It should be call getAllPosts on change carrentPage', () => {
		expect(setCurrentPage).toHaveBeenCalled();
		expect(getAllPosts).toHaveBeenCalled();
		pagination.currentPage = 2;
		expect(getAllPosts).toHaveBeenCalled();
	});

	test('It should display searchBar and content', () => {
		const { getByTestId} = renderResult;
		expect(getByTestId('content')).toBeDefined();
		expect(getByTestId('search-bar')).toBeDefined();
	});
})