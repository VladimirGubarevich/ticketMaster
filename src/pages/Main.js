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
import { getAllPosts } from '../redux/actions/posts.action';
import { setLocation } from '../redux/actions/search.action';
import { locationSelector } from '../redux/selectors/searchSelectors';
import { getPostsSelector, isLoadingSelector, totalPagesSelector, isErrorSelector } from '../redux/selectors/postsSelectors';

function Main(props) {
    const { getAllPosts, posts, isLoading, totalPages, storeLocation, setLocation, isFetchError } = props;
    const classes = formStyles();
    const location = { ...storeLocation };
    const [page, setPage] = useState(0);

    function countryHandler(country) {
        location.country = country;
    }

    function cityHundler(city) {
        location.city = city;
    }

    function setCurrentPage(page) {
        getAllPosts(page);
        setPage(page);
    }

    function buttonHandler() {
        setPage(0)
        setLocation(location);
        getAllPosts(0);
    }

    useEffect(() => {
        getAllPosts(0);
    }, [getAllPosts]);

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
                    page={page}
                    posts={posts}
                    isLoading={isLoading}
                    isError={isFetchError}
                    totalPages={totalPages}
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
        totalPages: totalPagesSelector(store),
        storeLocation: locationSelector(store)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLocation: locale => dispatch(setLocation(locale)),
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