import './Homepage.css';
import logo from "../images/app-logo.png";
import Logout from "../Login/Logout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Homepage() {
    const isAuthenticated = !!localStorage.getItem('token');
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const [news, setNews] = useState([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get('http://localhost:3005/news/general');
                setNews(response.data);
            } catch (error) {
                console.error('Error about news.', error);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="homepage">
            <div className="buttons">
                {isAuthenticated && (
                <a href="/portal" className="button portal" aria-label="Go to Portal" ></a>
                )}
                <a href="/sport" className="button sport">Sport</a>
                <a href="/economy" className="button economy">Economy</a>
                <a href="/technology" className="button technology">Technology</a>
                <a href="/science" className="button science">Science</a>
                <a href="/health" className="button health">Health</a>
                {!isAuthenticated && (
                    <>
                        <a href="/login" className="button log">Login</a>
                        <a href="/register" className="button log">Register</a>
                    </>
                )}
                {isAuthenticated && (
                    <Logout className="homepage-logout" />
                )}
            </div>
            <a href="/" className="logo-link">
                <img src={logo} alt="Logo" className="App-logo" />
            </a>
            <h2> Latest Current News </h2>
             <div className="customSlider">
                  <Slider {...settings}>
                      {news.filter(item => item.image).slice(0, 5).map((item, index) => (
                          <div key={index}>
                              <div className="imageCombination">
                                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                                      <img src={item.image} alt={`News ${index + 1}`} className="slide-image" />
                                  </a>
                              <div className="overlay">{item.title}</div>
                              </div>
                          </div>
                      ))}
            </Slider>
            </div>
            <p style={{ position: "fixed", bottom: 0, width: "100%", textAlign: "center", background: "darkslategray", margin: 0, left: "30%", zIndex: 100 }}>
                © Developed by Mustafa Emir Tezcan
            </p>
        </div>
    );
}

export default Homepage;