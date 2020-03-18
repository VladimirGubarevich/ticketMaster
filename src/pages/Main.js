import React from 'react';
import Header from '../components/Header';
import Select from '../components/Select';
import { getPosts } from '../redux/actions/posts.action';
import { connect } from 'react-redux';
import PostList from '../components/PostList';

function Main(props) {
    const { getPosts, posts, isLoading } = props;
    return (
        <>
            <Header />
            <main>
                <Select onclick={getPosts} />
                {isLoading ? <h4>Loading...</h4> 
                : <div className="content-events"><PostList posts={posts} /></div>}

            </main>
        </>
    );
}

function mapStateToProps(store) {
    console.log(store.posts.posts)
    return {
        posts: store.posts.posts,
        isLoading: store.posts.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: searh => dispatch(getPosts(searh))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);