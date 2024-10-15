import { AppNav } from '../components/AppNav.js';

import { Outlet } from "react-router-dom";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function Layout() {

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
      //setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };




  const handleGroupClick = async (value) => {
    await handleDrop();
    try {

      const response = await fetch(`${REACT_APP_API_URL}/getPostData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time: value }),
      });
      const json = await response.json();
      //setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>

      <AppNav onGroupClick={handleGroupClick} />

      <Outlet />
    </div>


  );
}


