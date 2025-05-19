import './Categories.css';
import logo from "../images/app-logo.png";
import Logout from "../Login/Logout";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Categories({ category }) {
    const isAuthenticated = !!localStorage.getItem('token');
    const [news, setNews] = useState([]);
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get('http://localhost:3005/news/' + category.toLowerCase());
                setNews(response.data);
            } catch (error) {
                console.error('Error about news.', error);
            }
        }, 10);

        return () => clearInterval(interval);
    }, [category]);
    return (
        <div className={`categories ${category.toLowerCase()}`}>
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
                    <Logout className="categories-logout"/>
                )}
            </div>
            <a href="/" className="logo-link">
                <img src={logo} alt="Logo" className="App-logo" />
            </a>
            <h2> Latest {category} News </h2>
            <div className="news-list">
                {news.map((item, index) => (
                    item.image && (
                        <div key={index} className="news-item" style={{ display: "flex", alignItems: "flex-start", marginBottom: "20px" }}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <img src={item.image} alt={`News ${index + 1}`} className="news-image" style={{ marginRight: "16px" }} />
                            </a>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <p style={{ marginTop: 10, textAlign: "left", fontWeight: "bold", fontSize: "1.5rem" }}>{item.title}</p>
                                <p style={{ marginTop: 20, textAlign: "left", whiteSpace: "pre-line" }}>{item.description}</p>
                                <p style={{ marginTop: 20, textAlign: "left", fontSize: "0.8rem", color: "#888" }}>
                                    {new Date(item.publishedAt).toLocaleString()}{" "}
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "blue", marginLeft: "10px", fontSize: "0.9rem", textDecoration: "underline" }}>
                                          ReadMore->
                                    </a>
                                </p>
                            </div>
                        </div>
                    )
                ))}
            </div>
            <p style={{ position: "fixed", bottom: 0, width: "100%", textAlign: "center", background: "darkslategray", margin: 0, left: "30%", zIndex: 100 }}>
                © Developed by Mustafa Emir Tezcan.
            </p>
        </div>
    );
}
export default Categories;