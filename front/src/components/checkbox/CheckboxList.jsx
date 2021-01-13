import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


export default function CheckboxesGroup({ objectiveList }) {
  const defaultNames = [];
  const { control, handleSubmit } = useForm({
    defaultValues: { names: defaultNames }
  });

  const [checkedValues, setCheckedValues] = useState(defaultNames);

  //hacer la funcion del click con el dispatch (que el iscompleted pase a true )

  function handleSelect(objective) {

    /*  const newNames = checkedValues.includes(checkedName)
       ? checkedValues.filter(name => name !== checkedName)
       : [...checkedValues, checkedName];
     setCheckedValues(newNames); */

    /*  return newNames; */
  }

  return (
    <>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <ul>
          {objectiveList.map((objective, key) => (
            <li key={key}>
              <FormControlLabel
                control={
                  <Controller
                    name="names"
                    render={({ onChange: onCheckChange }) => {
                      return (
                        <Checkbox
                          color="primary"
                          checked={objective.isCompleted}
                          onChange={() => onCheckChange(handleSelect(objective))}
                        />
                      );
                    }}
                    control={control}
                  />
                }
                key={objective.name}
                label={objective.name} />
            </li>
          ))}
        </ul>

      </form>


    </>

  );
}