import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import { matrixLog } from "../utils/logger"

import FindMentoree from "../components/FindMentoree/FindMentoree"

function FindMentoreeContainer() {
  matrixLog("FIND MENTOREE CONTAINER")
  const path = useLocation().pathname
  const history = useHistory()
  const skillsToTeachList = useSelector((state) => state.currentUser.skillsToTeach)
  const skillsToLearnList = useSelector((state) => state.currentUser.skillsToLearn)

  if (path === "/find/mentor") return <FindMentoree option="mentor" />
  if (path === "/find/mentees") return <FindMentoree option="mentee" />
}
export default FindMentoreeContainer
