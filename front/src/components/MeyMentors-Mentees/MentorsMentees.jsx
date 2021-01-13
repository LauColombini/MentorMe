import React from "react"
import { Button } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons"

import SchoolIcon from "@material-ui/icons/School"

export default function MentorsMentees() {
  const iconComodin = <FontAwesomeIcon icon={faChalkboardTeacher} color="white" size="2x" />
  return (
    <div>
      <Button
        style={{
          backgroundColor: "rgba(18,41,68,1)",
          borderRadius: "20px",
          width: "50%",
          margin: "35% auto",
        }}
      >
        {" "}
        <SchoolIcon style={{ color: "white" }} />
        <span style={{ color: "white" }}>Mis mentores</span>
      </Button>
      <Button
        style={{
          backgroundColor: "rgba(18,41,68,1)",
          borderRadius: "20px",
          width: "50%",
          margin: "35% auto",
        }}
      >
        {" "}
        {iconComodin}
        <span style={{ color: "white" }}> Mis mentees</span>
      </Button>
    </div>
  )
}
