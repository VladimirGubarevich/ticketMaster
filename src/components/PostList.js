import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Alert from '@material-ui/lab/Alert';
import { alertStyles } from '../material.styles';
import { isEmpty } from 'lodash';

const PostList = props => {
    const { posts } = props;
    const classes = alertStyles();
    return (
        <>
            {isEmpty(posts)
                ? <div className={classes.root} data-testid="not_result_message">
                    <Alert severity="info" className={classes.message}>Not found</Alert>
                </div>
                : posts.map(post => <Card
                    name={post.name}
                    image={post.images}
                    country={post._embedded.venues[0].country.name}
                    city={post._embedded.venues[0].city.name}
                    date={post.dates.start.localDate}
                    _links={post.url}
                    key={post.id}
                />)

            }
        </>
    );
}

export default PostList;

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object)
}