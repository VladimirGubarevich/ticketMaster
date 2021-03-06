import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '@material-ui/core'; // for some reason, styles for the button do not work without this line
import Header from '../components/Header';
import Content from '../components/Content';
import { getAllPosts, setCurrentPage } from '../redux/actions/posts.action';
import { setLocation } from '../redux/actions/search.action';
import { locationSelector } from '../redux/selectors/searchSelectors';
import {
    isErrorSelector,
    getPostsSelector,
    isLoadingSelector,
    paginationSelector,
} from '../redux/selectors/postsSelectors';

import SearchBar from '../components/SearchBar';

export function Main(props) {
    const {
        posts,
        isLoading,
        pagination,
        setLocation,
        getAllPosts,
        isFetchError,
        storeLocation,
        setCurrentPage,
    } = props;

    function buttonHandler(location) {
        setLocation(location);
        setCurrentPage(1);
        getAllPosts();
    }

    useEffect(() => {
        setCurrentPage(1);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line
    }, [pagination.currentPage]);

    return (
        <>
            <Header />
            <SearchBar
                countryInput={{ value: storeLocation.country }}
                cityInput={{ value: storeLocation.city }}
                button={{ handler: buttonHandler }}
            />
            <main>
                <Content
                    page={pagination.currentPage}
                    posts={posts}
                    isLoading={isLoading}
                    isError={isFetchError}
                    totalPages={pagination.totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </main>
        </>
    );
}

function mapStateToProps(store) {
    return {
        posts: getPostsSelector(store),
        isLoading: isLoadingSelector(store),
        isFetchError: isErrorSelector(store),
        pagination: paginationSelector(store),
        storeLocation: locationSelector(store)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLocation: locale => dispatch(setLocation(locale)),
        setCurrentPage: page => dispatch(setCurrentPage(page)),
        getAllPosts: numberPage => dispatch(getAllPosts(numberPage))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

Main.propTypes = {
    getAllPosts: PropTypes.func,
    posts: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    totalPages: PropTypes.number,
    storeLocation: PropTypes.object,
    setLocation: PropTypes.func,
    isFetchError: PropTypes.bool
}