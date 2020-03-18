import React from 'react';
import Card from './Card';

const PostList = props => {
    const { posts } = props;
    return (
        <>
            {posts.map(post => <Card
                name={post.name}
                image={post.images}
                locale={post.locale}
                _links={post.url}
                key={post.id}
            />)}
        </>
    );
}

export default PostList;