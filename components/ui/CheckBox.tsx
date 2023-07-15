import { useState } from "react"

interface CheckBoxProps {
  isChecked:  boolean, 
  checkHandler: (event: any) => void,
  id: string
}
const Checkbox = ({isChecked , checkHandler, id}: CheckBoxProps) => {
 

  return (
    <div>
      <input
        type="checkbox"
        id= {id}
        checked={isChecked}
        onChange={checkHandler}
      />
    </div>
  )
}

export default Checkbox;