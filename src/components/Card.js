import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { cardStyles } from '../material.styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

export default function MeadiaCard(props) {
    const { name, image, country, _links, city, date } = props;
    const classes = cardStyles();
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
                <a href={_links}>Detail</a>
            </CardActions>
        </Card>
    );
}

MeadiaCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.array,
    country: PropTypes.string,
    _links: PropTypes.string,
    city: PropTypes.string,
    date: PropTypes.string
}