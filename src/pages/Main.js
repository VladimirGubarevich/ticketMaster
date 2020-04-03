import React, { useState, useEffect } from 'react';
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
import { getAllPosts, setCurrentPage } from '../redux/actions/posts.action';
import { setLocation } from '../redux/actions/search.action';
import { locationSelector } from '../redux/selectors/searchSelectors';
import {
    isErrorSelector,
    getPostsSelector,
    isLoadingSelector,
    paginationSelector,
} from '../redux/selectors/postsSelectors';

function Main(props) {
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
    const classes = formStyles();
    const location = { ...storeLocation };
    const [page, setPage] = useState(0);

    function currentPageHandler(value) {
        setPage(value);
        setCurrentPage(value - 1); //pagination starts from 1, and request from 0
    }

    function countryHandler(country) {
        location.country = country;
    }

    function cityHundler(city) {
        location.city = city;
    }

    function buttonHandler() {
        setLocation(location);
        setCurrentPage(0);
        getAllPosts();
    }

    useEffect(() => {
        setCurrentPage(0);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line
    }, [page]);

    return (
        <>
            <Header />
            <form className="search-bar">
                <Select
                    items={countries}
                    value={location.country}
                    label={'Выберите страну'}
                    onchange={countryHandler}
                />
                <FormControl className={classes.formControl}>
                    <Input
                        label={'Город'}
                        value={location.city}
                        inputHandler={cityHundler}
                    />
                </FormControl>
                <Button className={classes.button} variant="contained" onClick={buttonHandler} color="primary">
                    Show
                </Button>
            </form>
            <main>
                <Content
                    page={pagination.currentPage}
                    posts={posts}
                    isLoading={isLoading}
                    isError={isFetchError}
                    totalPages={pagination.totalPages}
                    setCurrentPage={currentPageHandler}
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