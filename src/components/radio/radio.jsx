import React from "react";

const RadioButton = (props) => {
    return (
      <div className="form-check">
        <input className="form-check-input" type="radio" name={props.name} id={props.id}/>
        <label className="form-check-label" for={props.id}>{props.id}. {props.label}</label>
      </div>
    )
}

export {RadioButton}; 