import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { day: "Mon", value: 90 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 88 },
  { day: "Thu", value: 92 },
  { day: "Fri", value: 95 }
];

const AttendanceChart = () => (
  <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="day" />
    <YAxis />
    <Tooltip />
    <CartesianGrid />
    <Line type="monotone" dataKey="value" />
  </LineChart>
);

export default AttendanceChart;
