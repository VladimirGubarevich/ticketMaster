import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import Input from '../components/Input';
import Select from '../components/Select';
import Header from '../components/Header';
import Content from '../components/Content';
import { formStyles } from '../material.styles';
import { countries } from '../enum/country.enums';
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

    const classes = formStyles();
    const filter = { ...storeFilter };
    const location = { ...storeLocation };
    const [page, setPage] = useState(0);

    function currentPageHandler(value) {
        setPage(value);
        setCurrentPage(value - 1); //pagination starts from 1, and request from 0
    }

    function classificationHandler(clf) {
        filter.classification = clf;
    }

    function keywordHandler(word) {
        filter.keyword = word;
    }

    function cityHandler(city) {
        location.city = city;
    }

    function countryHandler(country) {
        location.country = country;
    }

    function buttonHandler() {
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
            <form className="search-bar">
                <Select
                    label={'Страна'}
                    items={countries}
                    onchange={countryHandler}
                    value={location.country}
                />
                <FormControl className={classes.formControl} >
                    <Input
                        label={'Город'}
                        value={location.city}
                        inputHandler={cityHandler}
                    />
                </FormControl>
                <Select
                    label={'Вид спорта'}
                    items={sportCategory}
                    onchange={classificationHandler}
                    value={filter.classification}
                />
                <FormControl className={classes.formControl}>
                    <Input
                        value={filter.keyword}
                        label={'Ключевое слово'}
                        inputHandler={keywordHandler}
                    />
                </FormControl>
                <Button className={classes.button} variant="contained" onClick={buttonHandler} color="primary">
                    Show
                </Button>
            </form>
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