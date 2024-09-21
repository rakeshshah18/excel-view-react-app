import React, { useState, useEffect } from 'react';

const ExcelDataDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchDataFromAPI = async () => {
            const apiURL = 'https://script.googleusercontent.com/macros/echo?user_content_key=hwZP5bKhqTybcBUiPM93womA1swm2IyauJP1WPhIDDGn832s1Tz5JivvGUAPMoBvOo9f3HE1_N4zKMckdCxSRlHiuzuzhBpnm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPw6a5xi5BrU4sMAO-NN35L_0cO6BAUJ9KbhG82rVwsHsQI3rxflJnGeJwpBhaGuFgeshIrtnjc0dAGDt_3fAgYGJS9lv9AGgQ&lib=MLTuqJQ6NeB5boqzk7sJ1GX33-3kBXtAK'; // Replace with your actual API endpoint
            try {
                const response = await fetch(apiURL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.data); // Assuming the API returns the same structure
            } catch (error) {
                console.error('Error fetching data from API:', error);
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchDataFromAPI(); // Fetch the data when the component mounts
    }, []);

    return (
        <div>
            <h1>Data from Excel API</h1>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Links</th>
                            <th>Category</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Name}</td>
                                <td>
                                    <a href={`http://${item.Links}`} target="_blank" rel="noopener noreferrer">
                                        {item.Links}
                                    </a>
                                </td>
                                <td>{item.Catagory}</td>
                                <td>{item.Options}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ExcelDataDisplay;
