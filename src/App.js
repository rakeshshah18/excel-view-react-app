import './App.css';
import React from 'react';
import ExcelUploader from './components/ExcelUploader';

function App() {
  return (
    <div className="App app-view">
      <h1>Upload Excel file form google drive </h1>
      <ExcelUploader />
    </div>
  );
}

export default App;
