import React from "react";
import { Card, CardBody } from "../../../components/card/card";
import Chart1 from "./chart1";
import Chart2 from "./chart2";
import YTD_Growth from "../trouble/ytd-growth";

const progress = () => {
  return (
    <div>
      <div className="h5">PROGRESS & GROWTH</div>
      <YTD_Growth />
      <div className="row gap-2 mt-4">
        <Card className="col">
          <CardBody>
            <Chart1 title="Class 1" />
          </CardBody>
        </Card>
        <Card className="col">
          <CardBody>
            <Chart1 title="Class 2" />
          </CardBody>
        </Card>
      </div>
      <div className="row gap-2 mt-4">
        <Card className="col">
          <CardBody>
            <Chart2 type="time" />
          </CardBody>
        </Card>
        <Card className="col">
          <CardBody>
            <Chart2 type="score" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default progress;
