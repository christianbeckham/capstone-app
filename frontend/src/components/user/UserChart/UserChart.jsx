import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const chartOptions = {
	legend: "none",
	curveType: "function",
	hAxis: {
		title: "Date",
	},
	vAxis: {
		title: "Weight (lbs)",
		gridlines: { color: "#787878" },
	},
	pointSize: 10,
};

const chartRange = [4, 8, 12];

const UserChart = ({ userCheckIns }) => {
	const [originalData, setOriginalData] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [range, setRange] = useState(chartRange[0]);
	const [dropdownNumbers, setDropdownNumbers] = useState([]);

	const handleChartRange = (e) => {
		setRange(e.target.value);
	};

	const transformData = (checkInData) => {
		const data = ["Date", "Weight"];
		const reverseData = checkInData.reverse();
		return [
			data,
			...reverseData.map((c) => [
				new Date(c.created_date).toLocaleDateString("en-US", {
					year: "2-digit",
					month: "2-digit",
					day: "2-digit",
				}),
				Number(c.weight),
			]),
		];
	};

	useEffect(() => {
		setOriginalData(userCheckIns);
		const data = userCheckIns?.slice(0, chartRange[0]);
		setChartData(transformData(data));
		const findLessThanIndex = chartRange.findIndex((num) => num >= userCheckIns?.length);
		const tempDNumbers = chartRange.slice(0, findLessThanIndex + 1);
		setDropdownNumbers(tempDNumbers);
	}, [userCheckIns]);

	useEffect(() => {
		const newChartData = originalData.slice(0, range);
		const newData = transformData(newChartData);
		setChartData(newData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [range]);

	return (
		<Card sx={{ position: "relative" }}>
			<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
				<CardHeader title={"Check-In Trends"} />
				{userCheckIns?.length > chartRange[0] && (
					<FormControl>
						<Select size="small" name="chart_range" value={range} onChange={handleChartRange} variant="outlined">
							{dropdownNumbers?.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
			</Stack>
			<CardContent>
				{userCheckIns.length > 0 ? (
					<Chart chartType="LineChart" data={chartData} options={chartOptions} width="100%" height="325px" />
				) : (
					<p>No data available</p>
				)}
			</CardContent>
		</Card>
	);
};

export default UserChart;
