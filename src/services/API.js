import axios from 'axios';

const API_KEY = 'TQuGIrramu8nnZHmFSpSqT3f85Rts4wq';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export function getPostsByLocal(country) {
    return axios.get(`${BASE_URL}events.json?locale=${country}&apikey=${API_KEY}`)
        .then(res => res.data)
}

export function getSportPosts(keyword = 'sports', clf = '', locale = 'US', page) {
    return axios.get(`${BASE_URL}events.json?keyword=${keyword}&apikey=${API_KEY}&classificationId=${clf}&countryCode=${locale}&page=${page}`)
        .then(res => res.data)
}
