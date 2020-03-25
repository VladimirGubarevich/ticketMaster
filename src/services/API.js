import axios from 'axios';

const API_KEY = 'TQuGIrramu8nnZHmFSpSqT3f85Rts4wq';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export function getPostsByLocal(country, city, page) {
    return axios.get(`${BASE_URL}`, {
        params: {
            countryCode: country,
            city,
            page,
            apikey: API_KEY,
        }
    })
        .then(res => res.data)
}

export function getSportPosts(keyword, clf, country, city, page) {
    return axios.get(`${BASE_URL}`, {
        params: {
            keyword,
            apikey: API_KEY,
            classificationName: 'sports',
            classificationId: clf,
            countryCode: country,
            city,
            page
        }
    })
        .then(res => res.data)
}

export function getFamilyPosts(keyword, clf, country, city, page) {
    return axios.get(`${BASE_URL}`, {
        params: {
            keyword,
            apikey: API_KEY,
            classificationName: 'family',
            classificationId: clf,
            countryCode: country,
            city,
            page
        }
    })
        .then(res => res.data)
}
