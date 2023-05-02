import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import ArtistInfo from './ArtistInfo.js';

const ArtistSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artistId, setArtistId] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const options = {
        method: 'GET',
        url: 'https://spotify-scraper.p.rapidapi.com/v1/artist/search',
        params: {name: searchQuery},
        headers: {
          'X-RapidAPI-Key': '21a33bf06fmsh9a6218cf7701227p185221jsn4944c5045ef0',
          'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
        },
      };
    
    axios.request(options)
      .then(response => {
        setArtistId(response.data.id);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='search'>
      <h2>Search for an Artist</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control className='searchbar' type="text" placeholder="Enter artist name" value={searchQuery} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="dark" type="submit">
          Search
        </Button>
      </Form>
      {artistId != '' ? <ArtistInfo artistId={artistId} /> : '' }
    </div>
  );
}

export default ArtistSearch;
