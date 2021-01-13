import React from "react"
import { useLocation } from "react-router-dom"
import { matrixLog } from "../../utils/logger"
import Burger from "./Components/Burger"

export default function Navbar() {
  matrixLog("NAVBAR")
  const path = useLocation().pathname
  return (
    <div id="navbar" className="container">
      {path === "/login" ? null : <Burger />}
      <div className="logo">
        mentor<span>me</span>
      </div>
    </div>
  )
}
