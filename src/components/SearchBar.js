import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import Select from '../components/Select';
import { formStyles } from '../material.styles';
import { countries } from '../enum/country.enums';

export default function SearchBar(props) {
	const { countryInput, cityInput, keywordInput, categoryInput, button } = props;
	const classes = formStyles();

	const [country, setCountry] = useState('');
	const [city, setCity] = useState('');
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState('');

	const location = {
		country: country,
		city: city
	}

	const filter = {
		keyword: keyword,
		classification: category
	}

	function buttonHandler() {
		button.handler(location, filter);
	}

	useEffect(() => {
		countryInput && setCountry(countryInput.value);
		cityInput && setCity(cityInput.value);
		keywordInput && setKeyword(keywordInput.value);
		categoryInput && setCategory(categoryInput.value);
		 // eslint-disable-next-line
	}, [])

	return (
		<form className="search-bar">
			{countryInput && <Select
				items={countries}
				onchange={setCountry}
				value={countryInput.value || country}
				label={countryInput.label || 'Страна'}
				inputProps={{ 'data-testid': "countries" }}
			/>}
			{cityInput &&
				<FormControl className={classes.formControl}>
					<TextField
						value={city}
						label={cityInput.label || 'Город'}
						onChange={e => setCity(e.target.value)}
						inputProps={{ 'data-testid': "cityInput" }}
					/>
				</FormControl>
			}
			{keywordInput &&
				<FormControl className={classes.formControl}>
					<TextField
						value={keyword}
						onChange={e => setKeyword(e.target.value)}
						inputProps={{ 'data-testid': "keywordInput" }}
						label={keywordInput.label || 'Ключевое слово'}
					/>
				</FormControl>}
			{categoryInput &&
				<Select
					onchange={setCategory}
					items={categoryInput.items}
					value={categoryInput.value || category}
					label={categoryInput.label || 'Категория'}
					inputProps={{ 'data-testid': "category" }}
				/>}
			{button && <Button className={classes.button} variant="contained" onClick={buttonHandler} color="primary">
				{button.name || 'Поиск'}
			</Button>}
		</form>
	)
} 