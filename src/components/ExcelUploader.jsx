import CSS from './excel-view.css';
import React, { useState, useEffect } from 'react';

const ExcelDataDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchDataFromAPI = async () => {
            const apiURL = 'https://script.google.com/macros/s/AKfycbxUVuAQHncuJNGJVFj3UwzmaTOmryr4Aj6Qxv_UPXLHvptMpKKU5nHR2nSA3R8ON34g/exec'; // Replace with your actual API endpoint
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
        <div className='justify-content-center align-items-center text-dark main-div'>
            <div className='container'>
                <h1 className='text-center'>Upload Excel file form google drive </h1>
                <h1 className='text-center mb-4'>Data from Excel API</h1>
                {loading ? (
                    <p>Loading data...</p>
                ) : (
                    <table cellPadding="20" cellSpacing="10" className='container justify-content-center align-items-center text-align-center borderr'>
                        <thead className='text-center'>
                            <tr>
                                <th>Name</th>
                                <th>Links</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Name}</td>
                                    <td>
                                        <a href={`http://${item.Links}`} target="_blank" rel="noopener noreferrer">
                                            {item.Links}
                                        </a>
                                    </td>
                                    <td>{item.Catagory}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ExcelDataDisplay;
