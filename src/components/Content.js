import React, { useEffect, useState } from 'react';
import PostList from './PostList';

export default function Content(props) {
	const { isLoading, posts } = props;
	const [postsArray, setPostsArray] = useState([]);

	useEffect(() => {
		setPostsArray(posts);
	}, [posts]);
	
	return (
		<>
			{isLoading ? <h4 className='message'>Loading...</h4>
				: <div className="content-events">
					<PostList posts={postsArray} />
				</div>
			}
		</>
	)
}