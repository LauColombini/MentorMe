import React, { useState } from "react"
import MenteePage from "../components/Mentees/MenteePage"

export default function MenteeIndividual() {
  const [meet, setMeet] = useState({
    meetCause: "",
    link: "",
    date: "",
  })

  const handleChange = (e) => {
    e.preventDefault()
    const { value } = e.target
    setMeet({ ...meet, [e.target.name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleSubmitMeet = (e) => {
    e.preventDefault()
    console.log(meet)
  }
  return (
    <MenteePage
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSubmitMeet={handleSubmitMeet}
      meet={meet}
    />
  )
}
