import React, { useState, useEffect } from 'react'
import axios from './axios'
import requests from './requests'
import('./Banner.css')

const Banner = () => {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetNetflixOriginals)
            setMovie(request.data.results[Math.floor(Math.random() * (request.data.results.length - 1))])
            console.log(movie)
            return request
        }
        fetchData()
    }, [])

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str
    }

    return (
        <header
            className='banner'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
                backgroundPosition: 'center center'
            }}
        >
            <div className='banner_contents'>
                <h1 className='banner_title'>{movie?.name || movie?.original_name}</h1>

                <div className='banner_buttons'>
                    <button className='button'>Play</button>
                    <button className='button'>My List</button>
                </div>

                <h1 className='benner_description'>
                    {truncate(movie?.overview, 300)}
                </h1>
            </div>

            <div className='banner_fadeBottom' />
        </header>
    )
}

export default Banner