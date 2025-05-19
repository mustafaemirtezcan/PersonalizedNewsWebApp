import logo from "../images/app-logo.png";
import Logout from "../Login/Logout";
import './Portal.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Preferences from "../Preferences/Preferences";

function Portal(){
    const isAuthenticated = !!localStorage.getItem('token');
    const [news, setNews] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const userId = localStorage.getItem('username');

    useEffect(() => {
        fetch(`http://localhost:3005/preferences/${userId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Server Error: ${res.status}`);
                }
                return res.json();
            })
            .then((preferences) => {
                setSelectedCategories(preferences);
            })
            .catch((error) => {
                console.error("Error fetching preferences: ", error);
            });
    }, [userId]);

    useEffect(() => {
        const fetchNewsByCategories = async () => {
            try {
                const allNews = [];
                for (const category of selectedCategories) {
                    const response = await axios.get(`http://localhost:3005/news/${category.toLowerCase()}`);
                    allNews.push(...response.data);
                }
                setNews(allNews);
            } catch (error) {
                console.error("Error fetching news: ", error);
            }
        };

        if (selectedCategories.length > 0) {
            fetchNewsByCategories();
        }
    }, [selectedCategories]);

    return(
        <div className="portal">
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
                        <a href="/register" className="button log">Register</a>
                        <a href="/login" className="button log">Login</a>
                    </>
                )}
                {isAuthenticated && (
                    <Logout className="categories-logout"/>
                )}
            </div>
            <a href="/" className="logo-link">
                <img src={logo} alt="Logo" className="App-logo" />
            </a>
            <Preferences selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
            />
            <div className="news-section" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {news.length === 0 ? (
                    <p style={{ textAlign: "center", width: "100%", marginTop: "40px", fontSize: "1.2em" }}>
                        Your preferences are empty. Select categories to start your personalized portal.
                    </p>
                ) : (
                    news
                        .sort(() => Math.random() - 0.5)
                        .filter((item) => item.image)
                        .map((item, index) => (
                            <div key={index} className="news-item" style={{ width: "45%", margin: "0.5% 1.5%" }}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <h3>{item.title}</h3>
                                    <img src={item.image} alt={item.title} />
                                    <p style={{ fontSize: "0.9em", color: "#888", textAlign: "center" }}>{item.publishedAt && new Date(item.publishedAt).toLocaleString()}</p>
                                </a>
                            </div>
                        ))
                )}
            </div>
            <p style={{ position: "fixed", bottom: 0, width: "100%", textAlign: "center", background: "darkslategray", margin: 0, left: "30%", zIndex: 100 }}>
                © Developed by Mustafa Emir Tezcan.
            </p>
        </div>
    );
}
export default Portal