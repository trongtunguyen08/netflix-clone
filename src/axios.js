import AXIOS from 'axios'

const instance = AXIOS.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default instance