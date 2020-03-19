import React from 'react';
import Header from '../components/Header';
import Select from '../components/Select';
import { getPosts } from '../redux/actions/posts.action';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import BasicPagination from '../components/BasicPagination';


function Main(props) {
    const { getPosts, posts, isLoading, totalPages } = props;
    return (
        <>
            <Header />
            <main>
                <Select onclick={getPosts} />
                {isLoading ? <h4>Loading...</h4>
                    : <div className="content-events"><PostList posts={posts} /></div>}

            </main>
            <div className='pagination'>
                <BasicPagination
                    totalPages={totalPages}
                />
            </div>

        </>
    );
}

function mapStateToProps(store) {
    console.log(store.posts.posts)
    return {
        posts: store.posts.posts,
        isLoading: store.posts.isLoading,
        totalPages: store.posts.totalPages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: searh => dispatch(getPosts(searh))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);