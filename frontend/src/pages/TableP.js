import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function TableP() {

  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState([]);

  const handleFetchClick = async () => {
    try {

      const response = await fetch(`${REACT_APP_API_URL}/posts`);
      const json = await response.json();
      setData(json);
      setChartData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    handleFetchClick();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array stops useEffect from running infinitely

  return (
    <div>
      {Array.isArray(chartData.tasks) && chartData.tasks.length > 0 && (
        <Table role="table" striped bordered hover aria-label="Table of Reddit and YouTube Posts Posts" aria-describedby="posts">
          <thead>
            <tr>
              <th role="columnheader">Title</th>
              <th role="columnheader">Source</th>
            </tr>
          </thead>
          <tbody id="posts">
            {chartData.tasks.map((post) => (
              <tr key={post.text} role="row" tabindex="0">
                <td>{post.text}</td>
                <td>{post.source}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {data && console.log(JSON.stringify(data))}
    </div>
  );
}