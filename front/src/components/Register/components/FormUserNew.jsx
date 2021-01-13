import React from "react"
import { Button } from "@material-ui/core"
import { formUserNewStyles } from "./materialStyles"

function FormUserNew({ nextStep }) {
  const classes = formUserNewStyles()
  return (
    <div className="content-register">
      <h3>Bienvenido, vemos que eres nuevo por aqui!</h3>
      <p>Comencemos por completar informacion sobre tu perfil para poder ayudarte a encontrar tu match perfecto</p>
      <Button
        style={{
          backgroundColor: "rgba(18,41,68,1)",
          borderRadius: "20px",
          width: "50%",
          margin: "35% auto",
        }}
        className={classes.buttonSignin}
        variant="contained"
        color="primary"
        onClick={nextStep}
      >
        comenzar
      </Button>
    </div>
  )
}
export default FormUserNew
