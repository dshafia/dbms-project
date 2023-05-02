import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://spotify-scraper.p.rapidapi.com/v1/chart/artists/top',
      headers: {
        'X-RapidAPI-Key': '21a33bf06fmsh9a6218cf7701227p185221jsn4944c5045ef0',
        'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
      },
    };

    axios.request(options)
      .then(response => {
        setTopArtists(response.data.artists.slice(0, 10));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h2 style={{ color: '#f7f7ff', marginTop: '1rem', marginBottom: '2rem' }}>Top 10 Artists</h2>
      <div className='homelist'>
        {
          topArtists.map(item => (
            <div className='homecard'>
              <img width='200px' height='200px' style={{ objectFit: 'cover' }} src={item.visuals.avatar[0].url} />
              <p>{item.name}</p>
              <p>Current Rank: {item.chartData.currentRank}</p>
              <p>Peak Date: {new Date(item.chartData.peakDate).toLocaleDateString()}</p>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default HomePage;
