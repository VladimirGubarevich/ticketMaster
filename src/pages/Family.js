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
import { familyCategory } from '../enum/familyCategory';
import { getFamilyPosts } from '../redux/actions/posts.action';
import { searchInCategoryFamily, setLocation } from '../redux/actions/search.action';
import { locationSelector, familyFilterSelector } from '../redux/selectors/searchSelectors';
import { getPostsSelector, isLoadingSelector, totalPagesSelector, isErrorSelector } from '../redux/selectors/postsSelectors';

export function Family(props) {
    const {
        posts,
        isLoading,
        totalPages,
        setLocation,
        storeFilter,
        isFetchError,
        storeLocation,
        getFamilyPosts,
        searchInCategoryFamily
    } = props;

    const classes = formStyles();
    const filter = { ...storeFilter };
    const location = { ...storeLocation };
    const [page, setPage] = useState(0);

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
    }

    function buttonHandler() {
        setPage(0)
        searchInCategoryFamily(filter);
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
                    label={'Страна'}
                    items={countries}
                    value={location.country}
                    onchange={countryHandler}
                />
                <FormControl className={classes.formControl} >
                    <Input
                        label={'Город'}
                        value={location.city}
                        inputHandler={cityHandler}
                    />
                </FormControl>
                <Select
                    label={'Категория'}
                    items={familyCategory}
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
                page={page}
                posts={posts}
                isLoading={isLoading}
                isError={isFetchError}
                totalPages={totalPages}
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
        totalPages: totalPagesSelector(store),
        storeLocation: locationSelector(store),
        storeFilter: familyFilterSelector(store),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLocation: locale => dispatch(setLocation(locale)),
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