import "./Preferences.css";
import React, {  useState } from 'react';

function Preferences({ selectedCategories, setSelectedCategories }) {
    const categories = ["Sport", "Economy", "Technology", "Science", "Health","Entertainment"];
    const [isVisible, setIsVisible] = useState(false);
    const userId = localStorage.getItem('username');

    const savePreferences = async () => {
        try {
            const response = await fetch("http://localhost:3005/preferences", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    categories: selectedCategories
                }),
            });

            if (response.ok) {
                alert("Preferences saved!");
            } else {
                const errorMessage = await response.text();
                alert(`Failed to save preferences: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error saving preferences:", error);
            alert("An error occurred while saving preferences.");
        }
    };

    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <div>
            <button className="preferences-button" onClick={toggleVisibility}>
                {isVisible ? "Hide Preferences" : "Show Preferences"}
            </button>
            {isVisible && (
                <div className="preferences">
                    <h2>Categories</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => toggleCategory(category)}
                                    />
                                    {category}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <p>Selected Categories: {selectedCategories.join(", ")}</p>
                    <button
                        className="preferences-button"
                        style={{ marginLeft: 70, marginTop: 10, marginBottom: 10 }}
                        onClick={async () => {
                            await savePreferences();
                            window.location.reload();
                        }}
                    >Save
                    </button>
                </div>
            )}
        </div>
    );
}

export default Preferences;