import axios from 'axios';

const API_KEY = 'TQuGIrramu8nnZHmFSpSqT3f85Rts4wq';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export function getPostsByLocal(local) {
    return axios.get(`${BASE_URL}events.json?locale=${local}&apikey=${API_KEY}`)
        .then(res => res.data)
}
