  import React from 'react'

const PersonForm = ({
  onSubmit,
  valueName,
  onChangeName,
  valueNum,
  onChangeNum
  }) => {
  return(
    <form onSubmit = {onSubmit}>
      <div>
        name: <input value = {valueName}onChange ={onChangeName} />
      </div>
      <div>
        number: <input value = {valueNum} onChange ={onChangeNum} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

export default PersonForm