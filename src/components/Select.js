import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));

export default function ControlledOpenSelect(props) {
    const { items, lable, onchange } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = event => {
        setValue(event.target.value);
        onchange(event.target.value)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

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
                    value={value}
                    onChange={handleChange}
                >
                    {items.map((item, index) => <MenuItem value={item.value} key={index}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}