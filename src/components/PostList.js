import React from 'react';
import Card from './Card';

const PostList = props => {
    const { posts } = props;
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
                : <h4 className="message">Not found</h4>}
        </>
    );
}

export default PostList;