import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt, faTasks } from "@fortawesome/free-solid-svg-icons"

import { Link } from "react-router-dom"

import Tab from './utils/Tab'
 
import MyInfo from "./utils/MyInfo"

function myProfile({ user }) {
  const iconEditProfile = <FontAwesomeIcon icon={faPencilAlt} color="#3b3b3b" size="2x" />
  const iconComodin = <FontAwesomeIcon icon={faTasks} color="#3b3b3b" size="2x" />

  return (
    <div className="MyProfileFather">
      <section>
        <img alt="user-avatar" src="http://localhost:3000/images/drKreshel1605900136299.png" />

        <div className="iconsFather">
          <div>
            <Link to="/myprogress">{iconComodin}</Link>
          </div>

          <div>
            {" "}
            <Link to="/editprofile">{iconEditProfile}</Link>
          </div>
        </div>
      </section>

      <MyInfo user={user} />
    </div>
  )
}
export default myProfile

// https://instagram.faep8-1.fna.fbcdn.net/v/t51.2885-15/e35/66641973_394347101250857_3361261859679580024_n.jpg?_nc_ht=instagram.faep8-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=4Nq48nCycGUAX_g33Gs&tp=1&oh=80775c823e1e50b25af4f595c0d14402&oe=5FDF80E3
