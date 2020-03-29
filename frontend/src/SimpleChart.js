import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class Example extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.formatData(this.props.data)
    };
  }

  formatData = dataToFormat => {
    if (dataToFormat[0].data.substring(5, 10) === "") return dataToFormat;
    let data = dataToFormat.map(day => {
      let newDate = day.data.substring(5, 10);
      day.data = newDate;
      return day;
    });
    return data;
  };

  setTicks = () => {
    let max = Math.max(
      ...this.state.data.map(day => day.totale_attualmente_positivi)
    );
    let ticks = [],
      i = 0;
    while (5000 * i < max) {
      ticks.push(5000 * i);
      i++;
    }
    return ticks;
  };

  domain = () => {
    let max = Math.max(
      ...this.state.data.map(day => day.totale_attualmente_positivi)
    );
    return [0, max];
  };

  render() {
    return (
      <LineChart
        width={1900}
        height={900}
        data={this.state.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis ticks={this.setTicks()} domain={[0, 200]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="totale_attualmente_positivi"
          stroke="#0000ff"
          activeDot={{ r: 3 }}
        />
        <Line type="monotone" dataKey="deceduti" stroke="#00ff00" />
        <Line type="monotone" dataKey="dimessi_guariti" stroke="#ff0000" />
      </LineChart>
    );
  }
}
