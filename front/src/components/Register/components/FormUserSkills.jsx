import React, { useRef } from "react"
import { useTheme } from "@material-ui/core/styles"
import MobileStepper from "@material-ui/core/MobileStepper"
import Button from "@material-ui/core/Button"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import { formUserSkillsStyles } from "./materialStyles"

function FormUserSkills({ steps, user, skillsList, handleChange, selectedStep, nextStep, prevStep }) {
  const ref = useRef()
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />
  const classes = formUserSkillsStyles()

  const theme = useTheme()

  let name
  let title

  if (selectedStep === 3) {
    name = "skills"
    title = "Ingresa tus Skills"
  }
  // else if (selectedStep === 4) { name = "skillsToLearn"; title = "Elige skills que quieras aprender" }
  // else if (selectedStep === 6) { name = "skillsToTeach"; title = "Elige skills que quieras enseñar" }

  return (
    <div className="content-register">
      <h3>{title}</h3>

      <Autocomplete
        value={user.skills}
        ref={ref}
        multiple
        id="checkboxes-tags-demo"
        options={skillsList}
        onChange={(event, value) => {
          name = ref.current.getAttribute("name")
          handleChange(event, value, name)
        }}
        name={name}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(option, { selected }) => (
          <>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            {option.name}
          </>
        )}
        style={{ width: "43vh" }}
        renderInput={(params) => {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <TextField {...params} variant="outlined" label="Skills" />
        }}
      />
      <div className="container-stepper">
        <MobileStepper
          variant="dots"
          steps={steps}
          position="static"
          activeStep={selectedStep - 2}
          className={classes.root}
          nextButton={
            <Button size="small" onClick={nextStep} disabled={selectedStep === steps + 1}>
              <p className="btn-steppers">Next</p>
              {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={prevStep} disabled={selectedStep === 0}>
              {theme.direction === "rtl" ? <KeyboardArrowRight className={classes.root} /> : <KeyboardArrowLeft className={classes.root} />}
              <p className="btn-steppers">Back</p>
            </Button>
          }
        />
      </div>
    </div>
  )
}

export default FormUserSkills
