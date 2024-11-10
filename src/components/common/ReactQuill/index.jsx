import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { undoChange, redoChange, insertUnderline, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

export const Editor = props => {
  return (
    <div className="text-editor">
      <EditorToolbar seed={props.seed} />
      <ReactQuill
        theme="snow"
        value={props.value}
        onChange={props.onChange}
        modules={{
          toolbar: {
            container: "#toolbar" + props.seed,
            handlers: {
              undo: undoChange,
              redo: redoChange,
              insertUnderline: insertUnderline,
            }
          },
          history: {
            delay: 500,
            maxStack: 100,
            userOnly: true
          }
        }}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
