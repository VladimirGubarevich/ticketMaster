import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import Preloader from './Preloader';
import Alert from '@material-ui/lab/Alert';
import { alertStyles } from '../material.styles';
import BasicPagination from '../components/BasicPagination'

export default function Content(props) {
	const { isLoading, posts, isError, page, totalPages, setCurrentPage } = props;
	const [postsArray, setPostsArray] = useState([]);
	const classes = alertStyles();

	useEffect(() => {
		setPostsArray(posts);
	}, [posts]);

	if (isError) {
		return (
			<div className={classes.root}>
				<Alert severity="error" className={classes.message}>Network Error</Alert>
			</div>
		)
	}

	return (
		<>
			{isLoading ? <Preloader />
				:
				<>
					<div className="content-events">
						<PostList posts={postsArray} />
					</div>
					<div className='pagination'>
						<BasicPagination
							page={page}
							totalPages={totalPages}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				</>
			}
		</>
	)
}