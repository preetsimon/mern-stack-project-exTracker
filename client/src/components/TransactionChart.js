import { scaleBand } from "@devexpress/dx-chart-core";
import {
  Animation,
  ArgumentScale,
  EventTracker,
} from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Tooltip,
  ValueAxis,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import * as React from "react";

export default function TransactionChart({ data }) {
  const chartData = data.map((item) => {
    // console.log(item)
    item.month = dayjs()
      .month(item._id - 1)
      .format("MMMM");
    return item;
  });
  
  return (
    <Paper sx={{ marginTop: 5 }}>
      <Chart data={chartData}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <Title
            text="Your Monthly Expenses"
            // textComponent={TitleText}
          />
        <BarSeries valueField="totalExpenses" argumentField="month" color="#8f0694"/>
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
}
