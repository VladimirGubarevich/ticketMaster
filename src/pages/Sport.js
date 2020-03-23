import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from '../components/Header';
import Content from '../components/Content';
import BasicPagination from '../components/BasicPagination';
import Select from '../components/Select';
import { sportCategory } from '../enum/sportCategory.enums';
import { country } from '../enum/country.enums';

import { setCountry, setKeyword, setClassification, setCurrentPage } from '../redux/actions/search.action';

import { getSportPosts } from '../redux/actions/posts.action';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 320,
    },
}));

export function Sport(props) {
    const { getSportPosts, posts, isLoading, setCountry, setKeyword, setCurrentPage, setClassification, totalPages } = props;

    const classes = useStyles();

    function buttonHandler() {
        setCurrentPage(0);
        getSportPosts();
    }

    useEffect(() => {
        getSportPosts();
        setCurrentPage(0);
    }, []);

    return (
        <>
            <Header />
            <div className="search-bar">
                <Select
                    lable={'Вид спорта'}
                    items={sportCategory}
                    onchange={setClassification}
                />
                <Select
                    lable={'Выберите страну'}
                    items={country}
                    onchange={setCountry}
                />

                <Button className={classes.button} variant="contained" onClick={buttonHandler} color="primary">
                    Show
      </Button>
            </div>
            <Content
                isLoading={isLoading}
                posts={posts}
            />
            <div className='pagination'>
                <BasicPagination
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
        </>
    );
}

function mapStateToProps(store) {
    return {
        posts: store.posts.posts,
        isLoading: store.posts.isLoading,
        totalPages: store.posts.totalPages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSportPosts: searh => dispatch(getSportPosts(searh)),
        setCountry: country => dispatch(setCountry(country)),
        setKeyword: keyWord => dispatch(setKeyword(keyWord)),
        setClassification: clf => dispatch(setClassification(clf)),
        setCurrentPage: page => dispatch(setCurrentPage(page))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sport);