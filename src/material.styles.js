import { makeStyles } from '@material-ui/core/styles';

export const paginationStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2)
      },
    },
  }));

  export const formStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
}));

export const cardStyles = makeStyles({
    root: {
        margin: 15,
        maxWidth: 300,
        minWidth: 300,
    },
    media: {
        height: 140,
    },
});

export const headerStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    }
  }));

  export const selectStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
}));