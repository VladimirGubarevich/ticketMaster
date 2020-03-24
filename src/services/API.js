import axios from 'axios';

const API_KEY = 'TQuGIrramu8nnZHmFSpSqT3f85Rts4wq';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export function getPostsByLocal(country, city, page) {
    return axios.get(`${BASE_URL}events.json?countryCode=${country}&city=${city}&apikey=${API_KEY}&page=${page}`)
        .then(res => res.data)
}

export function getSportPosts(keyword, clf, country, city, page ) {
    return axios.get(`${BASE_URL}events.json?keyword=${keyword}&apikey=${API_KEY}&classificationName=sports&classificationId=${clf}&countryCode=${country}&city=${city}&page=${page}`)
        .then(res => res.data)
}
