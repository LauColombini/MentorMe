import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt, faTasks } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

//Components
import Tab from './utils/Tab' 
import MyInfo from "./utils/MyInfo"
import MyProgress from '../MyMentorDashboard/MyMentorDashboard'
import PublicIcon from "@material-ui/icons/Public"
import MailIcon from "@material-ui/icons/Mail"
function myProfile({ user }) {

    const myInfo = <MyInfo/>
  
  return (
    <div className='myProfileContainer2'>
        <div className='myProfileTop'>
            <div className="myProfileBackground">
                <div className="bg1"> </div>
                <div className="bg2"> </div>
            </div>
           <div className="viewProfile">
                <div className="avatarAndName">
                    <div>
                      <img src="https://www.bryanhealth.com/app/files/public/Kreshel,-Charles.jpg" alt="" srcset=""/>
                    </div>
                    <div className='infoName'>
                        <h3>Dr. Kreshel</h3> 
                        <div className='infoo'>
                        <span><MailIcon style={{marginRight: "2px", color: 'rgba(0,0,0,0.54)'}} />vito@vito.com</span>
                        <span><PublicIcon style={{marginRight: "2px", color: 'rgba(0,0,0,0.54)'}}/>Noruega</span>
                        </div>
                    </div>
                   
                </div>
                
           </div>
           
        </div>



        <div className='myProfileBottom'>
            <div className='tab'>
               <Tab/>                 
            </div>
            {/* <MyProgress/> */}
             <MyInfo
            user={user}/> 
        </div>
    </div>
  )
}
export default myProfile

// https://instagram.faep8-1.fna.fbcdn.net/v/t51.2885-15/e35/66641973_394347101250857_3361261859679580024_n.jpg?_nc_ht=instagram.faep8-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=4Nq48nCycGUAX_g33Gs&tp=1&oh=80775c823e1e50b25af4f595c0d14402&oe=5FDF80E3
