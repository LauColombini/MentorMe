import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import MyProfile from "./MyProfile2"

export default () => {
  const currentUser = useSelector((state) => state.currentUser)

  const [name, setName] = React.useState("")
  const [editProfile, setEditProfile] = React.useState(false)
  const [meeting, setMeeting] = React.useState(false)
  const [skillsToLearnOrTeach, setSkillsToLearnOrTeach] = React.useState(false)
  const [menteesOrMentors, setMenteesOrMentors] = React.useState(false)
  const [matching, setMatching] = React.useState(false)

  const handleClick = (e) => {
    if (name === "editProfile") {
      if (editProfile) {
        setEditProfile(false)
      } else {
        setEditProfile(true)
        setMeeting(false)
        setSkillsToLearnOrTeach(false)
        setMenteesOrMentors(false)
        setMatching(false)
      }
    } else if (name === "meeting") {
      if (meeting) setMeeting(false)
      else {
        setEditProfile(false)
        setMeeting(true)
        setSkillsToLearnOrTeach(false)
        setMenteesOrMentors(false)
        setMatching(false)
      }
    } else if (name === "skillsToLearnOrTeach") {
      if (skillsToLearnOrTeach) setSkillsToLearnOrTeach(false)
      else {
        setSkillsToLearnOrTeach(true)
        setEditProfile(false)
        setMeeting(false)
        setMenteesOrMentors(false)
        setMatching(false)
      }
    } else if (name === "menteesOrMentors") {
      if (menteesOrMentors) setMenteesOrMentors(false)
      else {
        setMenteesOrMentors(true)
        setSkillsToLearnOrTeach(false)
        setEditProfile(false)
        setMeeting(false)
        setMatching(false)
      }
    } else if (name === "matching") {
      if (matching) setMatching(false)
      else {
        setMatching(true)
        setMenteesOrMentors(false)
        setSkillsToLearnOrTeach(false)
        setEditProfile(false)
        setMeeting(false)
      }
    }
  }

  return (
    <section>
      <MyProfile
        user={currentUser}
        handleClick={handleClick}
        editProfile={editProfile}
        meeting={meeting}
        skillsToLearnOrTeach={skillsToLearnOrTeach}
        menteesOrMentors={menteesOrMentors}
        matching={matching}
        setName={setName}
      />
    </section>
  )
}
