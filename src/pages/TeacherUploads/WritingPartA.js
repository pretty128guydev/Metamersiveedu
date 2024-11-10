import React from 'react';
import { TeacherUpload } from "../../components/file-upload/file-upload";


export default function TeacherUploadsWritingPartA() {
    return (<div className="App">
      <h2>Writing Part A Teacher Uploads</h2>
      
      <TeacherUpload mock_paper_type="writing_part_a"/>
      </div>
      )
}

