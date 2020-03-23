import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        margin: 15,
        maxWidth: 345,
        minWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MeadiaCard(props) {
    const { name, image, country, _links, city, date } = props;
    const classes = useStyles();
    return (
        <Card className={classes.root} p={1}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image[0].url}
                    title="image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {country}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {city}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {date}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <a href={_links}>Link</a>
            </CardActions>
        </Card>
    );
}