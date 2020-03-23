import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function Input(props) {
	const { label, value, callback, autoComplete } = props;
	const [carrentValue, setCurrentValue] = useState(value);

	const handleChange = event => {
		setCurrentValue(event.target.value);
		callback(event.target.value)
	};

	return (
		<TextField id="standard-basic" label={label} value={carrentValue} onChange={handleChange} autoComplete={autoComplete || 'off'} />
	)
}