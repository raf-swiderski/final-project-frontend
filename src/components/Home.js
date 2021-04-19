import React from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Home({ authorized }) {

    if (!authorized) {
       return <Redirect to="/login" />;
      }
    return (
        <div>
            <title>Home</title>  
            <h1> Welcome to Cooking Chaos </h1><br></br>
            <h2>Please pick your Kata.</h2>
            <Link to="/">Log Out</Link>
        </div>
    );
};
  
  
export default Home