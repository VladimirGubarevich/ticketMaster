import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Select from '../components/Select';
import Header from '../components/Header';
import Content from '../components/Content';
import Button from '@material-ui/core/Button';
import { country } from '../enum/country.enums';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { getPosts } from '../redux/actions/posts.action';
import BasicPagination from '../components/BasicPagination';
import { setLocation } from '../redux/actions/search.action';

import { getPostsSelector, isLoadingSelector, totalPagesSelector, locationSelector } from '../redux/selectors';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
}));

function Main(props) {
    const { getPosts, posts, isLoading, totalPages, storeLocation, setLocation } = props;
    const classes = useStyles();
    const [page, setPage] = useState(0);

    const location = { ...storeLocation };

    function countryHandler(country) {
        location.country = country;
    }

    function cityHundler(city) {
        location.city = city;
    }

    function setCurrentPage(page) {
        getPosts(page);
        setPage(page);
    }

    function buttonHandler() {
        setPage(0)
        setLocation(location);
        getPosts(0);
    }

    useEffect(() => {
        getPosts(0);
    }, [getPosts]);
    return (
        <>
            <Header />
            <form className="search-bar">
                <Select
                    lable={'Выберите страну'}
                    items={country}
                    onchange={countryHandler}
                    value={location.country}
                />
                <FormControl className={classes.formControl}>
                    <Input
                        label={'Город'}
                        value={location.city}
                        callback={cityHundler}
                    />
                </FormControl>
                <Button className={classes.button} variant="contained" onClick={buttonHandler} color="primary">
                    Show
                </Button>
            </form>
            <main>
                <Content
                    isLoading={isLoading}
                    posts={posts}
                />
            </main>
            {posts.length
                ? <div className='pagination'>
                    <BasicPagination
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        page={page}
                    />
                </div>
                : null
            }

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
        getPosts: searh => dispatch(getPosts(searh)),
        setLocation: val => dispatch(setLocation(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);