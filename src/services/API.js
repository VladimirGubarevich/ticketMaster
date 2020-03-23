import axios from 'axios';

const API_KEY = 'TQuGIrramu8nnZHmFSpSqT3f85Rts4wq';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

// export function getPostsByLocal(country) {
//     return axios.get(`${BASE_URL}events.json?locale=${country}&apikey=${API_KEY}`)
//         .then(res => res.data)
// }

export function getPostsByLocal(country) {
    return axios.get(`${BASE_URL}events.json?countryCode=US&city=denver&apikey=${API_KEY}`)
        .then(res => res.data)
}

export function getSportPosts(keyword, clf, country, page, city) {
    return axios.get(`${BASE_URL}events.json?keyword=${keyword}&apikey=${API_KEY}&classificationName=sports&classificationId=${clf}&countryCode=${country}&city=${city}&page=${page}`)
        .then(res => res.data)
}
