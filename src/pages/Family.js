import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Content from '../components/Content';
import { familyCategory } from '../enum/familyCategory';
import { getFamilyPosts, setCurrentPage } from '../redux/actions/posts.action';
import { searchInCategoryFamily, setLocation } from '../redux/actions/search.action';
import { locationSelector, familyFilterSelector } from '../redux/selectors/searchSelectors';
import { isErrorSelector, getPostsSelector, isLoadingSelector, paginationSelector } from '../redux/selectors/postsSelectors';

import SearchBar from '../components/SearchBar';

export function Family(props) {
    const {
        posts,
        isLoading,
        pagination,
        setLocation,
        storeFilter,
        isFetchError,
        storeLocation,
        getFamilyPosts,
        setCurrentPage,
        searchInCategoryFamily
    } = props;

    const [page, setPage] = useState(0);

    function currentPageHandler(value) {
        setPage(value);
        setCurrentPage(value - 1); //pagination starts from 1, and request from 0
    }

    function buttonHandler(location, filter) {
        searchInCategoryFamily(filter);
        setLocation(location);
        setCurrentPage(0);
        getFamilyPosts();
    }
    useEffect(() => {
        setCurrentPage(0);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getFamilyPosts();
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
                    label: 'Категория',
                    items: familyCategory,
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
        storeFilter: familyFilterSelector(store),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLocation: locale => dispatch(setLocation(locale)),
        setCurrentPage: page => dispatch(setCurrentPage(page)),
        getFamilyPosts: numberPage => dispatch(getFamilyPosts(numberPage)),
        searchInCategoryFamily: filter => dispatch(searchInCategoryFamily(filter))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Family);

Family.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    totalPages: PropTypes.number,
    setLocation: PropTypes.func,
    storeFilter: PropTypes.object,
    isFetchError: PropTypes.bool,
    storeLocation: PropTypes.object,
    getFamilyPosts: PropTypes.func,
    searchInCategoryFamily: PropTypes.func
}