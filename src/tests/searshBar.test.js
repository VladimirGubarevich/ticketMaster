import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar component', () => {
    let renderResult;
    let defaultProps;
    const buttonHandler = {
        handler: jest.fn()
    }
    beforeEach(() => {
        defaultProps = {
            countryInput: { value: 'PL' },
            cityInput: true,
            keywordInput: true,
            categoryInput: { value: 'one', items: [{ 'value': 1, 'name': 'one' }, { 'value': 2, 'name': 'two' }] },
            button: buttonHandler
        }
        renderResult = render(<SearchBar {...defaultProps} />)
    });
    afterEach(() => {
        cleanup();
    });

    test('Should call with correct params', () => {
        const { getByTestId } = renderResult;
        const cityInput = getByTestId('cityInput');
        fireEvent.change(cityInput, {
            target: { value: 'test-city' }
        });
        const locationResult = {
            country: 'PL',
            city: cityInput.value
        }
        const keywordInput = getByTestId('keywordInput');
        fireEvent.change(keywordInput, {
            target: { value: 'test-keyword' }
        });
        const categoryResult = {
            keyword: keywordInput.value,
            classification: 'one'
        }
        fireEvent.click(renderResult.getByText('Поиск'));
        expect(buttonHandler.handler).toHaveBeenCalledTimes(1);
        expect(buttonHandler.handler).toHaveBeenCalledWith(locationResult, categoryResult);
    });
})  