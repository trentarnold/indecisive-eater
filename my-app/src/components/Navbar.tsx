import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
         <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/home">Home</Link> |{" "}
        <Link to="/localRestaurants">Local Restaurants</Link>
      </nav>
    </div>
  )
}

export default Navbar
