import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import RedditChart from "../components/RedditChart";
import { Container } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
// const REACT_APP_API_URL = "/api";

Chart.register(CategoryScale);
export default function ChartP() {

  const [data, setData] = useState(null);
  const [fieldValue, /*setFieldValue*/] = useState("");
  //const [isYouTubeChecked, setIsYouTubeChecked] = useState(false);
  //const [isRedditChecked, setIsRedditChecked] = useState(false);
  const [chartData, setChartData] = useState([]);


  const handleFetchClick = async () => {
    try {
      // TODO: Do not hardcode the URL
      const response = await fetch(`${REACT_APP_API_URL}/posts`);
      const json = await response.json();
      setData(json);
      setChartData(json);
    } catch (error) {
      console.error(error);
    }
  };

  /*
  const handlePostClick = async () => {
    console.log("fieldValue", fieldValue);
    try {
      // TODO: Do not hardcode the URL
      const response = await fetch(`${REACT_APP_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: fieldValue }),
      });
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  */
  /*
  const handlegetRedditClick = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/GetRedditData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({ field: fieldValue }),
      });
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  */
 /*
  const handlegetYoutubeClick = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/GetYoutubeData`);
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  */


  const handleDrop = async () => {
    try {
      // TODO: Do not hardcode the URL

      const response = await fetch(`${REACT_APP_API_URL}/DropDB`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetAllPostClick = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/getPostData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field: fieldValue, time: 'all' }),
      });
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  //NEW STUFF (SPRINT 4)

  /*
  const source = isYouTubeChecked ? 'youtube' : isRedditChecked ? 'reddit' : 'none';
  const color = source === 'youtube' ? 'red' : source === 'reddit' ? 'orange' : 'black';
  const style = { color };
  */

  /*
  const handleYouTubeChange = () => {
    setIsYouTubeChecked(!isYouTubeChecked);
  };

  const handleRedditChange = () => {
    setIsRedditChecked(!isRedditChecked);
  };
  */



  useEffect(() => {

    //handleGetAllPostClick();

    handleFetchClick();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array stops useEffect from running infinitely


  // Can be put back into the return if needed
  //{data && <p>Data: {JSON.stringify(data)}</p>}

  // Testing buttons
  /*
  <button onClick={handlegetRedditClick}>FetchRedditData</button>
      <br />
  <button onClick={handlegetYoutubeClick}>FetchYoutubeData</button>
    <br />

  */

    /*
         	<div>
        	<label>
          		<input
            		type="checkbox"
            		checked={isYouTubeChecked}
            		onChange={handleYouTubeChange}
          		/>
          			YouTube
        	</label>
        	<label>
          		<input
            		type="checkbox"
            		checked={isRedditChecked}
            		onChange={handleRedditChange}
          		/>
          			Reddit
        		</label>
      		</div> 
    	</div>
      */

    const tooltip = (
      <Tooltip id="tooltip">
        TIP: Click Reddit/Youtube in the legend to filter the graph by social media!
      </Tooltip>
    )

    /*
    <button onClick={handleGetAllPostClick}>Pull Data from YouTube and Reddit</button>
      		<br />
      		<button onClick={handleFetchClick}>Display DB Data and Update Graph</button>
     	 	<br />
      		<button onClick={handleDrop}>Drop DB</button>
      		<br />
    */

	return (

		<div id="chart">
			
      <button onClick={handleGetAllPostClick} aria-label="Get All Posts from YouTube and Reddit">Pull Data from YouTube and Reddit</button>
      <br/>
      <button onClick={handleFetchClick} aria-label="Display the database data and update graph" >Display DB Data and Update Graph</button>
      <br/>
      <button onClick={handleDrop} aria-label="Drop Database">Drop DB</button>
      <br/>
      
      	<OverlayTrigger placement="top" overlay={tooltip}>
        	<Container>
          		<RedditChart role="img" aria-label="This is a stacked bar graph comparing topics related to Affordable childcare and the number of times they show up in the post data." chartData={chartData} />
        	</Container>
      	</OverlayTrigger>

      	{data && console.log(JSON.stringify(data))}
      </div>

	);
};
