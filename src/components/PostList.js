import React from 'react';
import Card from './Card';
import Alert from '@material-ui/lab/Alert';
import { alertStyles } from '../material.styles';

const PostList = props => {
    const { posts } = props;
    const classes = alertStyles();
    return (
        <>
            {posts.length
                ? posts.map(post => <Card
                    name={post.name}
                    image={post.images}
                    country={post._embedded.venues[0].country.name}
                    city={post._embedded.venues[0].city.name}
                    date={post.dates.start.localDate}
                    _links={post.url}
                    key={post.id}
                />)
                : <div className={classes.root}>
                    <Alert severity="info" className={classes.message}>Not found</Alert>
                </div>
            }
        </>
    );
}

export default PostList;