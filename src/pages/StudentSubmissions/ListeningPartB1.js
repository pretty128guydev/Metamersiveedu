import React from 'react';
import { StudentSubmissionMain } from "../../components/file-upload/file-upload";
import { Card, CardBody } from "../../components/card/card.jsx";
import DocViewer, {DocViewerRenderers } from "@cyntler/react-doc-viewer";


const StudentSubmissionsListeningPartB1 = () => {
    return (<>
      {/* <h2>Listening Part B1 Student Submission</h2>
      <Card className={"mb-3"}>
        <CardBody className="bg-white bg-opacity-5">
          <h4>Data File</h4>
          <div class="container" style={{height:'800px'}}>
            <DocViewer pluginRenderers={DocViewerRenderers} documents={
              [
                {uri: require('../../assets/img/test_uploads/2022_Paper3_PartB1_Data_Files.pdf')}
              ]
            }
            />
          </div>
        </CardBody>
      </Card>
      <Card className={"mb-3"}>
        <CardBody className="bg-white bg-opacity-5">
          <h4>Questions</h4>
          <div class="container" style={{height:'800px'}}>
            <DocViewer pluginRenderers={DocViewerRenderers} documents={
              [
                {uri: require('../../assets/img/test_uploads/2022_Paper3_PartB1_Questions.pdf')}
              ]
            }
            />
          </div>
        </CardBody>
      </Card> */}

      <StudentSubmissionMain mock_paper_type="listening_part_b1"/>
      </>
      )
}

export default StudentSubmissionsListeningPartB1;