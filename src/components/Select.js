import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
}));

export default function ControlledOpenSelect(props) {
    const { items, lable, onchange, value } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectValue, setSelectValue] = useState('');

    const handleChange = event => {
        setSelectValue(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        value && setSelectValue(value);
    }, [value]);

    useEffect(() => {
        onchange(selectValue)
    }, [selectValue, onchange]);

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">{lable}</InputLabel>
                <Select m={2}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    onChange={handleChange}
                    value={selectValue}
                >
                    {items.map((item, index) => <MenuItem value={item.value} key={index}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}