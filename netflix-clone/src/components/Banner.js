import React, { useEffect, useState } from 'react'
import axios from "../api/axios";
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

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
            params: {append_to_response:"video"},
        });
        setMovie(movieDetail);
    };
    const truncate =(str,n) => {
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }
    console.log('movie',movie)
    if (!isClicked){
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
            {/* api에 비디오가 안나와서 비디오가 있을 때만 버튼 보이도록 함. */}
            {/* { movie.videos ? <button className='banner__button play' onClick={()=> setIsClicked(true)}>Play</button> : null } */} 
            <button className='banner__button play' onClick={()=> setIsClicked(true)}>Play</button>
            <button className='banner__button info'>More Information</button>
        </div>
        <h1 className='banner__description'>{truncate(movie?.overview,100)}</h1>
        </div>
        <div className='banner--fageBottom'></div>
    </header>
  );
} else {
    return(
        <div>
            <Cotainer>
                <HomeContainer>
                <Iframe
                 width="640"
                 height="360" 
                 src={`https://www.youtube.com/embed/${movie.videos?.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos?.results[0]?.key}`} 
                 title="YouTube video player" 
                 frameborder="0" 
                 allow="autoplay; fullscreen" 
                 allowfullscreen></Iframe>
                </HomeContainer>
            </Cotainer>
        </div>
    )
}
}

const Iframe = styled.iframe`
    width : 100%;
    height: 100%;
    z-index; -1;
    opacity: 0.65;
    border: none;

    $::after {
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const Cotainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width : 100%;
    height: 100vh;
`;
const HomeContainer = styled.div`
    width: 100 %;
    height: 100%;
`;
