import React from "react"
// Iconos
import { Button, Badge, makeStyles } from "@material-ui/core"
import GroupIcon from "@material-ui/icons/Group"
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone"
import EventIcon from "@material-ui/icons/Event"
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import SchoolIcon from "@material-ui/icons/School"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  badge: {
    "& .MuiBadge-colorPrimary": {
      backgroundColor: "#a6d431",
    },
  },
}))

function Menu() {
  const classes = useStyles()
  return (
    <div id="footer" className="container-menu">
      <div className="div-button">
        <Button>
          <Link to="/myprofile">
            <AccountCircleIcon fontSize="large" className="footer-icons" />
          </Link>
        </Button>
      </div>
      <Button>
        <div className="div-button">
          <Link to="/mymentors">
            <SchoolIcon fontSize="large" className="footer-icons" />
          </Link>
        </div>
      </Button>
      <div className="div-button">
        <Button>
          <Link to="/meetings">
            <EventIcon fontSize="large" className="footer-icons" />
          </Link>
        </Button>
      </div>
      <div className="div-button">
        <Button>
          <Badge
            className={classes.badge}
            color="primary"
            variant="dot"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <NotificationsNoneIcon fontSize="large" className="footer-icons" />
          </Badge>
        </Button>
      </div>
    </div>
  )
}

export default Menu
