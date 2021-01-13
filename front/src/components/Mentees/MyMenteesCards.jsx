import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import { menteesCard } from "./materialStyles"

export default function MyMenteesCards() {
  const classes = menteesCard()
  return (
    <div className="conteiner-card">
      <h3>MIS MENTEES</h3>
      <List className={classes.root}>
        <Link to="/menteepage" style={{ textDecoration: "none" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="http://localhost:3000/images/drKreshel1605900136299.png" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className={classes.inline} color="textPrimary">
                  NAME
                </Typography>
              }
              secondary={
                <>
                  <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                    Detalle del metnee
                  </Typography>
                  {" — Opcional para poner algo"}
                </>
              }
            />
          </ListItem>
        </Link>

        <Divider variant="inset" component="li" />
        <Link to="/mymentees/:id" style={{ textDecoration: "none" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="http://localhost:3000/images/drKreshel1605900136299.png" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className={classes.inline} color="textPrimary">
                  NAME
                </Typography>
              }
              secondary={
                <>
                  <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                    Detalle del metnee
                  </Typography>
                  {" — Opcional para poner algo"}
                </>
              }
            />
          </ListItem>
        </Link>

        <Divider variant="inset" component="li" />
        <Link to="/mymentees/:id" style={{ textDecoration: "none" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="http://localhost:3000/images/drKreshel1605900136299.png" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className={classes.inline} color="textPrimary">
                  NAME
                </Typography>
              }
              secondary={
                <>
                  <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                    Detalle del metnee
                  </Typography>
                  {" — Opcional para poner algo"}
                </>
              }
            />
          </ListItem>
        </Link>

        <Divider variant="inset" component="li" />
        <Link to="/mymentees/:id" style={{ textDecoration: "none" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="http://localhost:3000/images/drKreshel1605900136299.png" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className={classes.inline} color="textPrimary">
                  NOMBRE DEL MENTI
                </Typography>
              }
              secondary={
                <>
                  <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                    El tipo de algo
                  </Typography>
                  {" — Proyecto o algo"}
                </>
              }
            />
          </ListItem>
        </Link>
      </List>
    </div>
  )
}
