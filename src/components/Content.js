import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import Preloader from './Preloader';

export default function Content(props) {
	const { isLoading, posts } = props;
	const [postsArray, setPostsArray] = useState([]);

	useEffect(() => {
		setPostsArray(posts);
	}, [posts]);
	
	return (
		<>
			{isLoading ? <Preloader />
				: <div className="content-events">
					<PostList posts={postsArray} />
				</div>
			}
		</>
	)
}