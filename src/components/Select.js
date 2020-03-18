import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        // display: 'block',
        margin: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 320,
    },
}));

export default function ControlledOpenSelect(props) {
    const { onclick } = props;
    const classes = useStyles();
    const [country, setCountry] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = event => {
        setCountry(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const clickHundler = () => {
        onclick(country);
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Выберите страну</InputLabel>
                <Select m={2}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={country}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'RU'}>Russia</MenuItem>
                    <MenuItem value={'US'}>Usa</MenuItem>
                    <MenuItem value={'PL'}>Poland</MenuItem>
                </Select>
            </FormControl>
            <Button className={classes.button} variant="contained" onClick={clickHundler} color="primary">
                Show
      </Button>
        </div>
    );
}