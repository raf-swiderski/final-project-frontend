import React from "react";
import { Redirect } from "react-router-dom";

function Home({ authorized }) {

    if (!authorized) {
       return <Redirect to="/login" />;
      }
    return (
        <div>This is the home page</div>
    );
};
  
  
export default Home