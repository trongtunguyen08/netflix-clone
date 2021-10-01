import React, { useState, useEffect } from 'react'
import axios from './axios'
import YouTube from "react-youtube"
import movieTrailer from 'movie-trailer'
import('./Row.css')


const base_url = 'https://image.tmdb.org/t/p/original'

const Row = (props) => {
    const { title, fetchUrl, isLargeRow } = props
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])

    const otps = {
        height: '450',
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (item) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(item?.name || item?.original_name)
                .then(url => {
                    //https://youtube.com/watch?v=XtmdAhfjde
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                })
                .catch(error => {
                    console.log(error.message)
                })
        }
    }

    return (
        <div className='row'>
            {/* title */}
            <h2>{title}</h2>

            {/* Container -> posters */}
            <div className='row_posters'>
                {
                    movies.map((item) => {
                        return (
                            <img
                                key={item.id}
                                onClick={() => handleClick(item)}
                                className={isLargeRow ? 'posterLarge' : 'poster'}
                                src={isLargeRow ? `${base_url}${item.poster_path}` : `${base_url}${item.backdrop_path}`}
                                alt={item.name}
                            />
                        )
                    })
                }
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={otps} />}
        </div>
    )
}

export default Row
