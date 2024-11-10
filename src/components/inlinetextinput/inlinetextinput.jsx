import React from "react";

const InlineTextInput = (props) => {
    return (<input
        type="text"
        name={props.name}
        className="mx-2 form-control mt-2"
        placeholder="1"
        style={{ display: "inline", width: "120px" }}
        {...props}
    />)
}

const InlineShortTextInput = (props) => {
    return (<input
        type="text"
        name={props.name}
        className="mx-2 form-control mt-2"
        placeholder="1"
        style={{ display: "inline", width: "50px" }}
        {...props}
    />)
}

export {InlineTextInput, InlineShortTextInput};