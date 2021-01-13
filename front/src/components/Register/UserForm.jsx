import React, { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import FormUserNew from "./components/FormUserNew"
import FormUserData from "./components/FormUserData"
import FormUserSkills from "./components/FormUserSkills"
import FormUserSave from "./components/FormUserSave"
import FormUserSuccess from "./components/FormUserSuccess"
import { getSkillsList } from "../../redux/action-creators/skills"
import { register } from "../../redux/action-creators/currentUser"

function UserForm() {
  const dispatch = useDispatch()
  const skillsList = useSelector((state) => state.skills)
  const steps = 3
  const [step, setStep] = useState(1)
  const [skills, setSkills] = useState([])
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    languages: [],
    avatar: "",
    skills: [],
    skillsToLearn: [],
    skillsToTeach: [],
    mentors: [],
    mentees: [],
    isAdmin: false,
  })



  const handleChange = (e, v, n) => {
    console.log(v)

    if (Array.isArray(v)) {
      setUser({ ...user, [n]: v })
    } else {
      const { value } = e.target
      console.log(value)
      console.log(e.target.name)
      setUser({ ...user, [e.target.name]: value })
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const submitMySkills = (skillsArray) => setSkills(skillsArray)

  const handleSubmit = () => register(user).then(nextStep())

  useEffect(() => dispatch(getSkillsList()), [dispatch])
  useEffect(() => console.log(skills), [skills])
  switch (step) {
    case 1:
      return <FormUserNew nextStep={nextStep} handleChange={handleChange} steps={steps} />
    case 2:
      return (
        <FormUserData
          selectedStep={step}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          user={user}
          steps={steps}
        />
      )
    case 3:
      return (
        <FormUserSkills
          submitMySkills={submitMySkills}
          selectedStep={step}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          skillsList={skillsList}
          user={user}
          steps={steps}
        />
      )
    case 4:
      return (
        <FormUserSave
          handleSubmit={handleSubmit}
          submitMySkills={submitMySkills}
          selectedStep={step}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          skillsList={skillsList}
          user={user}
          steps={steps}
        />
      )

    case 5:
      return (
        <FormUserSuccess
          submitMySkills={submitMySkills}
          selectedStep={step}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          skillsList={skillsList}
          user={user}
          steps={steps}
        />
      )
    default:
  }
}

export default UserForm
