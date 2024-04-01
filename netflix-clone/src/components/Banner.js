import React, { useEffect, useState } from 'react'
import axios from "../api/axios";
import requests from '../api/requests';
import './Banner.css';
export default function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async () => {

        // 현재 상영중인 영화 정보 가져 옴( 여러 영화 )
        const request = await axios.get(requests.fetchNowPlaying);
        // 여러 영화 리스트 중 하나를 랜덤으로 보여주기.
        const movieId  =
            request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ].id;
        // 특정 영화의 비디오 정보를 포함한 상세 정보 가져오기
        const { data : movieDetail} = await axios.get(`movie/${movieId}`,{
            params: {append_to_resonse:"video"},
        });
        setMovie(movieDetail);
    };
    const truncate =(str,n) => {
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }

  return (
    <header className='banner'
    style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize:"cover"
    }}>
        <div className='banner__contents'>
        <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}
        </h1>
        <div className='banner__buttons'>
            <button className='banner__button play'>Play</button>
            <button className='banner__button info'>More Information</button>
        </div>
        <h1 className='banner__description'>{truncate(movie?.overview,100)}</h1>
        </div>
        <div className='banner--fageBottom'></div>
    </header>
  )
}
