import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { makeStyles, TextField, Button } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import { login } from "../../redux/action-creators/currentUser"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formLogininput: {
    "& .MuiInputLabel-formControl": {
      left: "14px",
      lineHeight: "22px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "4%",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
    },
    "& .MuiInputBase-root": {
      margin: "10px",
    },
    "& .MuiInputBase-input": {
      width: "18rem",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#006400",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a6d431",
    },
  },
}))

function Login() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const [useEmail, setEmail] = useState("")
  const [usePassword, setPassword] = useState("")

  // useEffect(() => {
  //   document.getElementById("footer").style.display = "none"
  // })

  function onChange(e) {
    console.log(e.target.value)
    if (e.target.name === "email") setEmail(e.target.value)
    else setPassword(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()
    dispatch(login(useEmail, usePassword)).then(() => history.push("/myprofile"))
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="formContainerLogin">
        <p>Sign In</p>
        <TextField
          onChange={onChange}
          className={classes.formLogininput}
          id="outlined-search"
          label=" Email *"
          name="email"
          type="text"
          variant="outlined"
        />
        <TextField
          className={classes.formLogininput}
          onChange={onChange}
          id="outlined-password-input"
          label=" Password *"
          name="password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Link to="/algo" className="forgotpassword" href="http:/algo">
          Lost Your Password ?
        </Link>
        <div className="buttonLoginContainer">
          <Button
            style={{
              backgroundColor: "rgba(18,41,68,1)",
              borderRadius: "20px",
              width: "100%",
              margin: "20px auto",
            }}
            className={classes.buttonSignin}
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            {" "}
            Sign in{" "}
          </Button>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              style={{ color: "rgba(18,41,68,1)", border: "2px solid rgba(18,41,68,1)" }}
              className="buttoncreateacc"
              variant="outlined"
              color="primary"
            >
              {" "}
              Create Your Account{" "}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
