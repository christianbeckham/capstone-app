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

const chartRange = [4, 8, 12, "all"];

const UserChart = ({ userCheckIns }) => {
	const [chartData, setChartData] = useState([]);
	const [range, setRange] = useState(chartRange[0]);

	const handleChartRange = (e) => setRange(e.target.value);

	const transformData = (checkInData) => {
		const data = ["Date", "Weight"];
		return [
			data,
			...checkInData.reverse().map((c) => [
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
		let dataRange = userCheckIns;

		if (userCheckIns.length > range) {
			dataRange = userCheckIns.slice(0, range);
		} else {
			dataRange = userCheckIns;
		}

		const transformedData = transformData(dataRange);
		setChartData(transformedData);
	}, [userCheckIns, range]);

	return (
		<Card sx={{ position: "relative" }}>
			<Stack
				direction={"row"}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<CardHeader title={"Check-In Trends"} />
				<FormControl>
					<Select
						size="small"
						name="chart_range"
						value={range}
						onChange={handleChartRange}
						variant="outlined"
					>
						{chartRange.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Stack>
			<CardContent>
				<Stack
					direction={"row"}
					justifyContent="flex-end"
					sx={{ mb: 1 }}
				></Stack>
				<Chart
					chartType="LineChart"
					data={chartData}
					options={chartOptions}
					width="100%"
					height="325px"
				/>
			</CardContent>
		</Card>
	);
};

export default UserChart;
