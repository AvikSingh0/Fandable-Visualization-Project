import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import TableP from "./pages/TableP";
import ChartP from "./pages/ChartP";


export default function App(){

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="chart" element={<ChartP />} />
          <Route path="table" element={<TableP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



