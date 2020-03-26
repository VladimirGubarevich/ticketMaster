import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { preloaderStyles } from '../material.styles';

export default function Preloader() {
    const classes = preloaderStyles();

    return (
        <div className={classes.root}>
            <CircularProgress size={120} />
        </div>
    );
}