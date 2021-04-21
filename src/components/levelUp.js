
// function AddPoints() {

//   const [errors, setErrors] = useState(null);

//   const currentPoints = localStorage.getItem("points")
//   const addPoints = currentPoints += 50

//   const data = {
//         points: addPoints,
//         userId: localStorage.getItem("userId")
//       };


//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   fetch("http://localhost:9000", options)
//     // turn api response into json
//     .then((res) => res.json())
//     .then((result) => {
//       if (result.errors) {
//         // do something about errors
//         // setErrors(result.errors);
//         // return;
//         console.log(result.errors)
//       }
//         // store their user id
//         //localStorage.setItem("cookingLevel", result.data.cooking_level)
//         localStorage.setItem("points", result.data.points)

//         console.log(result)
//         // navigate to the home screen
//         // historyHook.push('/home')
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//      console.log(errors)
// }



// export default AddPoints;
