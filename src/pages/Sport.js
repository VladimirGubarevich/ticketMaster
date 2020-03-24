import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Select from '../components/Select';
import Header from '../components/Header';
import Content from '../components/Content';
import Button from '@material-ui/core/Button';
import { country } from '../enum/country.enums';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import BasicPagination from '../components/BasicPagination';
import { sportCategory } from '../enum/sportCategory.enums';
import { getSportPosts } from '../redux/actions/posts.action';
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

export function Sport(props) {
    const { getSportPosts
        , posts
        , isLoading
        , totalPages
        , storeFilter
        , search
    } = props;

    const [page, setPage] = useState(0);
    const classes = useStyles();
    const filter = { ...storeFilter };

    function classificationHandler(clf) {
        filter.classification = clf;
    }

    function keywordHandler(word) {
        filter.keyword = word;
    }

    function cityHandler(city) {
        filter.city = city;
    }

    function countryHandler(country) {
        filter.country = country;
    }

    function setCurrentPage(page) {
        getSportPosts(page);
        setPage(page);
    }

    function buttonHandler() {
        setPage(0)
        search(filter);
        getSportPosts(0);
    }

    useEffect(() => {
        getSportPosts(0);
    }, []);

    return (
        <>
            <Header />
            <form className="search-bar">
                <Select
                    lable={'Вид спорта'}
                    items={sportCategory}
                    onchange={classificationHandler}
                    value={filter.classification}
                />
                <Select
                    lable={'Выберите страну'}
                    items={country}
                    onchange={countryHandler}
                    value={filter.country}
                />
                <FormControl className={classes.formControl} >
                    <Input
                        label={'Город'}
                        value={filter.city}
                        callback={cityHandler}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Input
                        label={'Ключевое слово'}
                        value={filter.keyword}
                        callback={keywordHandler}
                    />
                </FormControl>
                <Button className={classes.button} variant="contained" onClick={buttonHandler} color="primary">
                    Show
                </Button>
            </form>
            <Content
                isLoading={isLoading}
                posts={posts}
            />
            <div className='pagination'>
                <BasicPagination
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
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
        getSportPosts: searh => dispatch(getSportPosts(searh)),
        search: val => dispatch(search(val))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sport);