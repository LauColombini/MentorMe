import React from "react"
import { useTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import { formUserSuccessStyles } from "./materialStyles"

function FormUserSuccess() {
  const classes = formUserSuccessStyles()
  const theme = useTheme()

  return (
    <div className="content-register">
      <h3>Usuario creado correctamente</h3>
      <Link to="/login">
        <Button
          style={{
            color: "rgba(18,41,68,1)",
            border: "2px solid rgba(18,41,68,1)",
            marginTop: 25,
            textDecoration: "none",
          }}
          className="buttoncreateacc"
          variant="outlined"
          color="primary"
        >
          {" "}
          login{" "}
        </Button>
      </Link>
    </div>
  )
}
export default FormUserSuccess
