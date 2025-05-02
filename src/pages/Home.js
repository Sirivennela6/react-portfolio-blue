import React from 'react';
import diy from '../assets/diy.jpg';
import library from '../assets/library.jpeg';
import painting from '../assets/painting.jpeg';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to My Portfolio</h1>
      <p>This is the homepage of Bala Siri Vennela's Portfolio. Explore more!</p>

      <div className="image-gallery">
        <img src={diy} alt="DIY Project" className="gallery-img" />
        <img src={library} alt="Library Project" className="gallery-img" />
        <img src={painting} alt="Painting Project" className="gallery-img" />
      </div>
    </div>
  );
};

export default Home;
