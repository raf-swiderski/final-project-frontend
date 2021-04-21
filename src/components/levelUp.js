import React, { useState, useEffect } from "react";

function addPoints() {

  const currentPoints = { localStorage.getItem("points")}
  const addPoints = { currentPoints += 50 }

  const data = {
        points: addPoints
        userId: localStorage.getItem("userId")
      };


  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("http://localhost:9000", options)
// turn api response into json
.then((res) => res.json())
.then((result) => {
  if (result.errors) {
    // do something about errors
    setErrors(result.errors);
    return;
  }
}



export default addPoints
