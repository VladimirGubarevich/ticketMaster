import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { selectStyles } from '../material.styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { get } from 'lodash';

export default function Select(props) {
    const { onchange, items, value, label } = props;
    const [open, setOpen] = useState(false);
    const [selectValue, setSelectValue] = useState(null);
    const classes = selectStyles();

    const resetValue = (event, value, reason) => {
        if (reason === 'clear') {
            setSelectValue(null);
            onchange('')
        }
    }

    const handleChange = (event, value) => {
        if (value) {
            setSelectValue(value);
            return;
        }

        const inputValue = items.find(item => item.name.toLowerCase() === get(event, 'target.value', ""));
        if (inputValue) {
            setSelectValue(inputValue);
            return;
        }
    };

    useEffect(() => {
        let item = items.find(item => item.value === value);
        if (value) {
            setSelectValue(item);
        }
    }, [value, items]);

    useEffect(() => {
        if (selectValue) {
            onchange(selectValue.value)
        }
    }, [selectValue, onchange]);

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Autocomplete
                    id="Autocomplete"
                    style={{ width: 250 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onInputChange={resetValue}
                    value={selectValue}
                    onChange={handleChange}
                    getOptionSelected={(option, value) => option.name === value.name}
                    getOptionLabel={option => option.name}
                    options={items}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label={label}
                            InputProps={{
                                ...params.InputProps,
                            }}
                            onChange={handleChange}
                        />
                    )}
                />
            </FormControl>
        </div>
    );
}

Select.propTypes = {
    onchange: PropTypes.func,
    items: PropTypes.array,
    value: PropTypes.string,
    label: PropTypes.string
}