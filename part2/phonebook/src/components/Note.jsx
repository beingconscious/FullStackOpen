  import React from 'react'

const Note = (props) => {
  return(
    <li>
      {props.name} {props.number}
    </li>
  )
}

export default Note