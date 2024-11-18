import React from "react";
import TopQuestions from "./top-questions";
import TopQuestionsLevel from "./top-questions-level";
import LevelsByPaper from "./levels-paper";

const TroubleZone = () => {
  return (
    <div>
      <div className="h5">TROUBLE ZONE</div>
      <div className="row">
        <TopQuestions />
        <TopQuestionsLevel />
        {/* <LevelsByPaper /> */}
      </div>
    </div>
  );
};

export default TroubleZone;
