import React from "react"
import { matrixLog } from "../../utils/logger"

matrixLog("FindMentoree")

function FindMentoree({ option }) {
  if (option === "mentor") {
    return <div>{option} ACA VAN LAS TARJETAS VS DE MENTORES</div>
  }
  if (option === "mentee") {
    return <div>{option} ACA VAN LAS TARJETAS VS DE MENTEES</div>
  }
  return null
}
export default FindMentoree
