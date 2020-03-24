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
import { familyCategory } from '../enum/familyCategory';
import { getFamilyPosts } from '../redux/actions/posts.action';
import { searchFamily, setLocation } from '../redux/actions/search.action';

import { getPostsSelector, isLoadingSelector, totalPagesSelector, locationSelector, familyFilterSelector } from '../redux/selectors';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
}));

export function Family(props) {
    console.log('Family render')
    const { getFamilyPosts
        , posts
        , isLoading
        , totalPages
        , storeFilter
        , searchFamily
        , storeLocation
        , setLocation
    } = props;

    const [page, setPage] = useState(0);
    const classes = useStyles();
    const filter = { ...storeFilter };
    const location = { ...storeLocation };

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

    function setCurrentPage(page) {
        getFamilyPosts(page);
        setPage(page);
        filter.page = page;
    }

    function buttonHandler() {
        setPage(0)
        searchFamily(filter);
        setLocation(location);
        getFamilyPosts(0);
    }

    useEffect(() => {
        getFamilyPosts(0);
    }, [getFamilyPosts]);

    return (
        <>
            <Header />
            <form className="search-bar">
                <Select
                    lable={'Страна'}
                    items={country}
                    onchange={countryHandler}
                    value={location.country}
                />
                <FormControl className={classes.formControl} >
                    <Input
                        label={'Город'}
                        value={location.city}
                        callback={cityHandler}
                    />
                </FormControl>
                <Select
                    lable={'Категория'}
                    items={familyCategory}
                    onchange={classificationHandler}
                    value={filter.classification}
                />
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
    console.log('mapStateToProps render')
    return {
        posts: getPostsSelector(store),
        isLoading: isLoadingSelector(store),
        totalPages: totalPagesSelector(store),
        storeFilter: familyFilterSelector(store),
        storeLocation: locationSelector(store)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFamilyPosts: searh => dispatch(getFamilyPosts(searh)),
        searchFamily: val => dispatch(searchFamily(val)),
        setLocation: val => dispatch(setLocation(val))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Family);