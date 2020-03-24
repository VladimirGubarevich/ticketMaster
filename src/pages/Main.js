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
import { search } from '../redux/actions/search.action';

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
    const { getPosts, posts, isLoading, totalPages, storeFilter, search } = props;
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const filter = { ...storeFilter };

    function countryHandler(country) {
        filter.country = country;
    }

    function cityHundler(city) {
        filter.city = city;
    }

    function setCurrentPage(page) {
        getPosts(page);
        setPage(page);
    }

    function buttonHandler() {
        setPage(0)
        search(filter);
        getPosts();
    }

    useEffect(() => {
        getPosts(0);
    }, []);
    return (
        <>
            <Header />
            <form className="search-bar">
                <Select
                    lable={'Выберите страну'}
                    items={country}
                    onchange={countryHandler}
                    value={filter.country}
                />
                <FormControl className={classes.formControl}>
                    <Input
                        label={'Город'}
                        value={filter.city}
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
            <div className='pagination'>
                <BasicPagination
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    page={page}
                />
            </div>
        </>
    );
}

function mapStateToProps(store) {
    return {
        posts: store.posts.posts,
        isLoading: store.posts.isLoading,
        totalPages: store.posts.totalPages,
        storeFilter: store.search.search
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: searh => dispatch(getPosts(searh)),
        search: val => dispatch(search(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);