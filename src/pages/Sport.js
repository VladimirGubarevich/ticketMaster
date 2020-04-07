import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Content from '../components/Content';
import SearchBar from '../components/SearchBar';
import { sportCategory } from '../enum/sportCategory.enums';
import { getSportPosts, setCurrentPage } from '../redux/actions/posts.action';
import { searchInCategorySports, setLocation } from '../redux/actions/search.action';
import { locationSelector, sportsFilterSelector } from '../redux/selectors/searchSelectors';
import { getPostsSelector, isLoadingSelector, paginationSelector, isErrorSelector } from '../redux/selectors/postsSelectors';

export function Sport(props) {
    const {
        posts,
        isLoading,
        pagination,
        storeFilter,
        setLocation,
        isFetchError,
        getSportPosts,
        storeLocation,
        setCurrentPage,
        searchInCategorySports
    } = props;

    const [page, setPage] = useState(0);

    function currentPageHandler(value) {
        setPage(value);
        setCurrentPage(value - 1); //pagination starts from 1, and request from 0
    }

    function buttonHandler(location, filter) {
        searchInCategorySports(filter);
        setLocation(location);
        setCurrentPage(0);
        getSportPosts();
    }

    useEffect(() => {
        setCurrentPage(0);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getSportPosts();
        // eslint-disable-next-line
    }, [page]);

    return (
        <>
            <Header />
            <SearchBar
                countryInput={{ value: storeLocation.country }}
                cityInput={{ value: storeLocation.city }}
                keywordInput={{ value: storeFilter.keyword }}
                categoryInput={{
                    label: 'Вид спорта',
                    items: sportCategory,
                    value: storeFilter.classification
                }}
                button={{ handler: buttonHandler }}
            />
            <Content
                page={pagination.currentPage}
                posts={posts}
                isLoading={isLoading}
                isError={isFetchError}
                totalPages={pagination.totalPages}
                setCurrentPage={currentPageHandler}
            />
        </>
    );
}

function mapStateToProps(store) {
    return {
        posts: getPostsSelector(store),
        isLoading: isLoadingSelector(store),
        isFetchError: isErrorSelector(store),
        pagination: paginationSelector(store),
        storeLocation: locationSelector(store),
        storeFilter: sportsFilterSelector(store),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLocation: locale => dispatch(setLocation(locale)),
        setCurrentPage: page => dispatch(setCurrentPage(page)),
        getSportPosts: numberPage => dispatch(getSportPosts(numberPage)),
        searchInCategorySports: filter => dispatch(searchInCategorySports(filter))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sport);

Sport.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    totalPages: PropTypes.number,
    storeFilter: PropTypes.object,
    setLocation: PropTypes.func,
    isFetchError: PropTypes.bool,
    getSportPosts: PropTypes.func,
    storeLocation: PropTypes.object,
    searchInCategorySports: PropTypes.func
}