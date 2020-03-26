import FormControl from '@material-ui/core/FormControl';
import { selectStyles } from '../material.styles';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Asynchronous(props) {
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

    const handleChange = (event, val) => {
        if (val) {
            setSelectValue(val);
            return;
        }
        let t = items.find(o => o.name.toLowerCase() === event.target.value);
        if (t) {
            setSelectValue(t);
            return;
        }

    };

    useEffect(() => {
        let item = items.find(item => item.value === value);
        value && setSelectValue(item);
    }, [value, items]);

    useEffect(() => {
        selectValue && onchange(selectValue.value)
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