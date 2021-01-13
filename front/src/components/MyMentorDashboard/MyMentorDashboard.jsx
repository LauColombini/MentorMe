import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckboxList from "../checkbox/CheckboxList"
import Progresscheck from "../checkbox/Progresscheck"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  Accordion: {
    "& .MuiAccordionDetails-root": {
      padding: "8px 16px 0",
    }
  }
}));

const MyMentorDashbord = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const mentors = [{
    _id: 1,
    email: "1@1.com",
    firstName: "Dr.",
    lastName: "Kreshel",
    country: "Argentina",
    phoneNumber: "5410101010",
    languages: ["spanish"],
    skills: [{ _id: "1", name: "React" }],
    avatar: "aca va el avatar",
    objectives: [{ name: "Ver video de React", _id: "1", isCompleted: true }, { name: "practicar Props", _id: "2", isCompleted: true }, { name: "setear estado local", _id: "3", isCompleted: false }]
  }, {
    _id: 2,
    email: "2@2.com",
    firstName: "El",
    lastName: "Bricio",
    country: "China",
    phoneNumber: "5410101010",
    languages: ["chino"],
    skills: [{ _id: "3", name: "Vue" }],
    avatar: "aca va el avatar",
    objectives: [{ name: "Ver video de Vue", _id: "1", isCompleted: true }, { name: "practicar Vue", _id: "2", isCompleted: true }, { name: "otra task", _id: "3", isCompleted: false }]
  }
  ]

  return (
    <div className="dashProfile2Container">

      {mentors.map((mentor) => {
        return mentor.skills.map((e) => {
          return (<Accordion expanded={expanded === `${e._id}`} className={classes.Accordion} onChange={handleChange(`${e._id}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header">
              <Typography className={classes.heading}>{e.name}</Typography>
              <Typography className={classes.secondaryHeading}>Mentor: {mentor.firstName + " " + mentor.lastName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="checkBoxListContainer">
                <CheckboxList objectiveList={mentor.objectives} />
                <Progresscheck className="progressCheck" objectiveList={mentor.objectives} />
              </div>
            </AccordionDetails>
          </Accordion>)

        })
      })
      }
    </div >
  )
}

export default MyMentorDashbord
