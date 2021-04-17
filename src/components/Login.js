


const LogIn = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [magicData, setMagicData] = useState(null)
    
    /*
    const submitForm = () => {
      fetch("http://my-api.com/login", {
        method: "POST",
        body: {
          username: username,
          password: password
        }
      })
      .then((response) => {
        // login successful
        setMagicData(response)
      })
      .catch((error) => {
        // something went wrong
        showErrorModal(error)
      })
    }*/
    
    return (
      <div class="sign-in-container">
        <div class="sign-in-form-container">
          <form class="sign-in-form">
            <input name="username" onChange={setUsername}/>
            <input name="password" onChange={setPassword}/>
          </form>
          <button onClick={submitForm}/>
          <ul>
          </ul>
        </div>
      </div>
    );
  };


  export default SignIn