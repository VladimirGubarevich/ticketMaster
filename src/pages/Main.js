import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import Input from '../components/Input';
import Select from '../components/Select';
import Header from '../components/Header';
import Content from '../components/Content';
import { formStyles } from '../material.styles';
import { country } from '../enum/country.enums';
import { getAllPosts } from '../redux/actions/posts.action';
import BasicPagination from '../components/BasicPagination';
import { setLocation } from '../redux/actions/search.action';

import { getPostsSelector, isLoadingSelector, totalPagesSelector, locationSelector } from '../redux/selectors';

function Main(props) {
    const { getAllPosts, posts, isLoading, totalPages, storeLocation, setLocation } = props;
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
                    items={country}
                    value={location.country}
                    lable={'Выберите страну'}
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
                    posts={posts}
                    isLoading={isLoading}
                />
            </main>
            <div className='pagination'>
                <BasicPagination
                    page={page}
                    isLoading={isLoading}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
}

function mapStateToProps(store) {
    return {
        posts: getPostsSelector(store),
        isLoading: isLoadingSelector(store),
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