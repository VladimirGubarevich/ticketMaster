import React from 'react';
import { render } from '@testing-library/react';

import Content from '../components/Content';

describe('Content component', () => {
	let renderResult;
	let testPosts = [{
		name: 'name_1',
		images: ['image_1'],
		_embedded: {
			venues: [
				{ country: { name: 'country_1' }, city: { name: 'city_1' } },
			]
		},
		dates: {
			start: { localDate: '01.02.1999' }
		},
		url: 'link_1',
		id: 1,
	},
	{
		name: 'name_2',
		images: ['image_2'],
		_embedded: {
			venues: [
				{ country: { name: 'country_2' }, city: { name: 'city_2' } },
			]
		},
		dates: {
			start: { localDate: '01.01.1999' }
		},
		url: 'link_2',
		id: 2,
	},];
	const setCurrentPage = jest.fn();
	let defaultProps = {
		isLoading: false,
		posts: testPosts,
		isError: false,
		page: 1,
		totalPages: 10,
		setCurrentPage: setCurrentPage
	};

	test('Should dispaly preloader', () => {
		renderResult = render(<Content {...defaultProps} isLoading={true} />);
		const { queryByTestId } = renderResult;
		expect(queryByTestId('preloader')).toBeDefined();

		expect(queryByTestId('post')).toBeNull();
		expect(queryByTestId('pagination')).toBeNull();
		expect(queryByTestId('error_message')).toBeNull();
		expect(queryByTestId('not_result_message')).toBeNull();
	});

	test('Should dispaly Network error', () => {
		renderResult = render(<Content {...defaultProps} isError={true} />);
		const { queryByTestId } = renderResult;
		expect(queryByTestId('error_message')).toBeDefined();

		expect(queryByTestId('post')).toBeNull();
		expect(queryByTestId('preloader')).toBeNull();
		expect(queryByTestId('pagination')).toBeNull();
		expect(queryByTestId('not_result_message')).toBeNull();

	});

	test('Should dispaly Not found message', () => {
		renderResult = render(<Content {...defaultProps} posts={[]} totalPages={0} />);
		const { queryByTestId } = renderResult;
		expect(queryByTestId('not_result_message')).toBeDefined();

		expect(queryByTestId('post')).toBeNull();
		expect(queryByTestId('preloader')).toBeNull();
		expect(queryByTestId('pagination')).toBeNull();
		expect(queryByTestId('error_message')).toBeNull();
	});

	test('Should dispaly posts', () => {
		renderResult = render(<Content {...defaultProps} />);
		const { queryByTestId, queryAllByTestId } = renderResult;
		const posts = queryAllByTestId('post');
		expect(posts).toBeDefined();
		expect(posts.length).toBe(testPosts.length);
		expect(queryByTestId('pagination')).toBeDefined();

		expect(queryByTestId('preloader')).toBeNull();
		expect(queryByTestId('error_message')).toBeNull();
		expect(queryByTestId('not_result_message')).toBeNull();


	});
});