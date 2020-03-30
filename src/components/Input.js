import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export default function Input(props) {
	const { label, value, inputHandler } = props;
	const [carrentValue, setCurrentValue] = useState(value);

	const handleChange = event => {
		setCurrentValue(event.target.value);
		inputHandler(event.target.value)
	};

	return (
		<TextField id="standard-basic" label={label} value={carrentValue} onChange={handleChange} />
	)
}

Input.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	inputHandler: PropTypes.func
}