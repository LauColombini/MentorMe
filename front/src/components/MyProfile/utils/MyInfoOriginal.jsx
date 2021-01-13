import React from "react"
import {useSelector} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles"
// import ListSubheader from "@material-ui/core/ListSubheader"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
// import InboxIcon from "@material-ui/icons/MoveToInbox"
// import DraftsIcon from "@material-ui/icons/Drafts"
// import SendIcon from "@material-ui/icons/Send"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import StarBorder from "@material-ui/icons/StarBorder"
// import { noAuto } from "@fortawesome/fontawesome-svg-core"
import MailIcon from "@material-ui/icons/Mail"
import PublicIcon from "@material-ui/icons/Public"
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck"
import PersonIcon from "@material-ui/icons/Person"
import ClassIcon from "@material-ui/icons/Class"

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

export default function NestedList({ user }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)  
 
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="dashProfile2Container">
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={`${ user && user.firstName} ${user && user.lastName}`} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary={user && user.country} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary="ACA VAN LOS IDIOMAS" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={`${user && user.email}`} />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary="Skills" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {document.cookie &&
            user &&
            user.skills.map((skill) => {
             
              return (
                <List key={skill._id} component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    {skill.name}
                  </ListItem>
                </List>
              )
            })}
        </Collapse>
      </List>
    </div>
  )
}

// className={classes.nested}
// `${skill.name} `

// export default function MyInfo({ user }) {
//   return (
//     <div className="prueba">
//       <h3>Nombre</h3>
//       <div>
//         {user.firstName} {user.lastName}
//       </div>
//       <h3>Pais </h3>
//       <div>{user.country}</div>
//       {/* <h3>Idiomas</h3>
//       <div>{user.languages}</div> */}
//       <h3>Skills</h3>
//       <div>
//         {document.cookie &&
//           user &&
//           user.skills.map((skill) => {
//             return `${skill.name} `
//           })}
//       </div>
//       <h3>Mail</h3>
//       <div>{user.email}</div>
//     </div>
//   )
// }
