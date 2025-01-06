import CSS from './excel-view.css';
import React, { useState, useEffect } from 'react';

const ExcelDataDisplay = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);//  for filtered data
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState('');//  for the filter input

    useEffect(() => {
        // to fetch data from the API
        const fetchDataFromAPI = async () => {
            const apiURL = 'https://script.google.com/macros/s/AKfycbzFCdLqnRGd_k9A0x9zRsNOLjoz86EbL6k3imQDX5AB-M_76fq41PUjGbg0p4u2CWjd/exec';
            try {
                const response = await fetch(apiURL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.dataata);  // Set full dataset
                setFilteredData(result.data);  // Initially, show all data
            } catch (error) {
                console.error('Error fetching data from API:', error);
            } finally {
                setLoading(false);  // Stop the loading spinner when data is fetched
            }
        };

        fetchDataFromAPI();  // Fetch the data when the data component is mounted
    }, []);

    // for filter input changes, handles
    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterValue(value);

        // Filter the data based on the Name or Category only
        const filtered = data.filter((item) =>
            item.Date.toLowerCase().includes(value.toLowerCase()) ||
            item.In_Out.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div className='justify-content-center align-items-center text-dark main-div'>
            <div className='container'>
                <h1 className='text-center'>Upload Excel file from Google Drive</h1>
                <h1 className='text-center mb-4'>Data from Excel API</h1>

                {/* Filter input */}
                <div className="text-center mb-4">
                    <input
                        type="text"
                        placeholder="Filter by Date or Name --"
                        value={filterValue}
                        onChange={handleFilterChange}
                        className="form-control"
                    />
                </div>

                {loading ? (
                    <p>Loading data...</p>
                ) : (
                    <table cellPadding="20" cellSpacing="10" className='container justify-content-center align-items-center text-align-center borderr'>
                        <thead className='text-center'>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>In_Out</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Date}</td>
                                    <td>
                                        {item.Name}
                                    </td>
                                    <td>{item.In_Out}</td>
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
