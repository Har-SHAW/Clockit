import React, { useEffect, useState } from "react";
import { fire_auth } from "../firebase";
import { getAbsoluteDate, getTasks } from "../operations/user_operations.jsx";
import { Box } from "@mui/material";
import TaskSection from "../components/dashboard/tasks_section";
import { getRecords } from "../operations/records_operations";
import TaskLineChart from "../components/charts/line_chart";
import CustomDateRangePicker from "../components/charts/date_range_picker";
import DropDownOptions from "../components/charts/drop_down";

function Dashboard(props) {
    const [tasks, setTasks] = useState(null);
    const [lastAction, setLastAction] = useState(null);
    const [records, setRecords] = useState([]);
    const [filter, setFilter] = useState({
        ...getAbsoluteDate(7, true),
        ...getAbsoluteDate(0, false),
    });

    useEffect(() => {
        fire_auth.onAuthStateChanged(async (user) => {
            console.log(user);
            if (user == null) {
                window.location.replace("/login");
            } else {
                getData();
            }
        });
    }, []);

    const getData = async () => {
        const data = await getTasks();
        setTasks(data.tasks);
        setLastAction(data.lastAction);
        setRecords(await getRecords());
    };

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "row",
                height: "100vh",
                width: "100vw",
            }}
        >
            <TaskSection
                tasks={tasks}
                lastAction={lastAction}
                getData={getData}
            />

            <Box style={{ width: "80%" }}>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            height: "45%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <TaskLineChart
                            tasks={tasks}
                            data={records}
                            filter={filter}
                            src="io"
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            height: "50%",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                width: "50%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            PIE CHART COLUMN
                        </div>
                        <div
                            style={{
                                width: "55%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <DropDownOptions setFilter={setFilter} />
                            <CustomDateRangePicker
                                filter={filter}
                                setFilter={setFilter}
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default Dashboard;
