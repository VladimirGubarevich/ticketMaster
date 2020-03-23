import React, { useEffect } from 'react';
import Header from '../components/Header';
import { getPosts } from '../redux/actions/posts.action';
import { connect } from 'react-redux';
import Content from '../components/Content';
import BasicPagination from '../components/BasicPagination';
import { setCurrentPage } from '../redux/actions/search.action';


function Main(props) {
    const { getPosts, posts, isLoading, totalPages, setCurrentPage } = props;

    useEffect(() => {
        getPosts();
    }, [getPosts]);
    return (
        <>
            <Header />
            <main>
                <Content
                    isLoading={isLoading}
                    posts={posts}
                />
            </main>
            <div className='pagination'>
                <BasicPagination
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
}

function mapStateToProps(store) {
    return {
        posts: store.posts.posts,
        isLoading: store.posts.isLoading,
        totalPages: store.posts.totalPages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: searh => dispatch(getPosts(searh)),
        setCurrentPage: page => dispatch(setCurrentPage(page))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);