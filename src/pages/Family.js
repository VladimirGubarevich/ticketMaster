import React, { useEffect } from 'react';
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

    function buttonHandler(location, filter) {
        searchInCategoryFamily(filter);
        setLocation(location);
        setCurrentPage(1);
        getFamilyPosts();
    }
    useEffect(() => {
        setCurrentPage(1);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getFamilyPosts();
        // eslint-disable-next-line
    }, [pagination.currentPage]);

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
                setCurrentPage={setCurrentPage}

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
    setCurrentPage: PropTypes.func,
    storeLocation: PropTypes.object,
    getFamilyPosts: PropTypes.func,
    searchInCategoryFamily: PropTypes.func
}