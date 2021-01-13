import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { matrixLog } from "../utils/logger"
import { getSkillsList } from "../redux/action-creators/skills"
import SelectSkills from "../components/SelectSkills/SelectSkills"
import { putSkillsToTeach, putSkillsToLearn } from "../redux/action-creators/currentUser"

function SelectSkillsContainer() {
  matrixLog("FILTER MENTOREE SEARCH CONTAINER")
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const skillsToLearn = useSelector((state) => state.currentUser.skillsToLearn)
  const skillsToTeach = useSelector((state) => state.currentUser.skillsToTeach)
  const skillsList = useSelector((state) => state.skills)

  const [selectedSkillsToLearn, setSelectedSkillsToLearn] = useState([])
  const [selectedSkillsToTeach, setSelectedSkillsToTeach] = useState([])

  useEffect(() => {
    if (location.state === "mentor" && skillsToLearn.length) {
      history.push({ pathname: "/find/mentor", search: "ACA VAN FUTUROS FILTROS" })
    }
    if (location.state === "mentee" && skillsToTeach.length) {
      history.push({ pathname: "/find/mentees", search: "ACA VAN FUTUROS FILTROS" })
    }
  }, [history, location.state, skillsToLearn.length, skillsToTeach.length])

  useEffect(() => {
    if (!skillsList.length) dispatch(getSkillsList())
  }, [dispatch, skillsList.length])

  const handleSubmit = () => {
    if (location.state === "mentor") {
      dispatch(putSkillsToLearn(selectedSkillsToLearn))
      history.push({ pathname: "/find/mentor", search: "ACA VAN FUTUROS FILTROS" })
    } else {
      dispatch(putSkillsToTeach(selectedSkillsToTeach))
      history.push({ pathname: "/find/mentees", search: "ACA VAN FUTUROS FILTROS" })
    }
  }

  const handleChange = (e, v, n) => {
    console.log(v)
    if (location.state === "mentor") {
      setSelectedSkillsToLearn({ ...selectedSkillsToLearn, [n]: v })
    }
    if (location.state === "mentee") {
      setSelectedSkillsToTeach({ ...selectedSkillsToTeach, [n]: v })
    }
  }

  return (
    <>
      <h1> {location.state === "mentor" ? "BUSCAR MENTOR" : "BUSCAR MENTEES"} </h1>
      <SelectSkills
        title={location.state === "mentor" ? "¿Qué quieres aprender?" : "¿Qué quieres enseñar?"}
        skillsList={skillsList.length ? skillsList : []}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {/* <SelectedSkillsList /> Aca podria ir la proficiencia (ULTRA OPCIONAL) */}
      {/* <SelectCountry /> */}
      {/* <SelectLanguage /> */}
    </>
  )
}
export default SelectSkillsContainer
