import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Matching from "./Matching";

export default () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [mentors, setMentors] = useState([]);
  const [positionMentorOne, setPositionMentorOne] = useState(0);
  const [positionMentorTwo, setPositionMentorTwo] = useState(1);
  const [selectedMentor, setSelectedMentor] = useState({});
  const [finish, setFinish] = useState(false);
  const userId = currentUser._id;
  const mentorOne = mentors[positionMentorOne];
  const mentorTwo = mentors[positionMentorTwo];

  const handleClickMentorOne = (e) => {
    e.preventDefault();
    setSelectedMentor(mentorOne);
    if (selectedMentor === mentorOne) {
      axios
        .patch(`/api/users/${userId}/addMentor`, mentorOne)
        .then((data) => console.log(data.data));
      setFinish(true);
    }
    setPositionMentorTwo(positionMentorTwo + 2);
  };
  const handleClickMentorTwo = (e) => {
    e.preventDefault();
    setSelectedMentor(mentorTwo);

    if (selectedMentor === mentorTwo) {
      axios
        .patch(`/api/users/${userId}/addMentor`, mentorTwo)
        .then((data) => console.log("HOLA VITTORIO", data.data));
      setFinish(true);
    }
    setPositionMentorOne(positionMentorOne + 2);
  };

  useEffect(() => {
    axios
      .get(`/api/users/${userId}/matchMentors?page=0&limit=10`)
      .then(({ data }) => setMentors(data))
      .catch(console.error(Error));
  }, [userId]);
  return (
    <Matching
      mentorOne={mentorOne}
      mentorTwo={mentorTwo}
      handleClickMentorOne={handleClickMentorOne}
      handleClickMentorTwo={handleClickMentorTwo}
      finish={finish}
    />
  );
};
