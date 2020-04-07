import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '../components/Input';
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
		country,
		city
	}

	const filter = {
		keyword, 
		classification: category
	}

	function buttonHandler() {
		button.handler(location, filter);
	}

	return (
		<form className="search-bar">
			{countryInput && <Select
				items={countries}
				label={countryInput.label || 'Страна'}
				value={countryInput.value || country}
				onchange={setCountry}
				id={'countrySelect'}
			/>}
			{cityInput &&
				<FormControl className={classes.formControl}>
					<Input
						label={cityInput.label || 'Город'}
						inputHandler={setCity}
						value={cityInput.value || city}
						id={'cityInput'}
					/>
				</FormControl>
			}
			{keywordInput &&
				<FormControl className={classes.formControl}>
					<Input
						value={keywordInput.value || keyword}
						inputHandler={setKeyword}
						label={keywordInput.label || 'Ключевое слово'}
					/>
				</FormControl>}
			{categoryInput &&
				<Select
					label={categoryInput.label || 'Категория'}
					items={categoryInput.items}
					onchange={setCategory}
					value={categoryInput.value || category}
				/>}
			{button && <Button className={classes.button} variant="contained" onClick={buttonHandler} color="primary">
				{button.name || 'Поиск'}
			</Button>}
		</form>
	)
} 