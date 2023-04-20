import React, { useEffect, useState } from "react";
import { fire_auth } from "../firebase";
import { getTasks } from "../operations/user_operations.jsx";
import { Box } from "@mui/material";
import TaskSection from "../components/dashboard/tasks_section";

function Dashboard(props) {
    const [tasks, setTasks] = useState(null);

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
        setTasks(await getTasks());
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
            <TaskSection tasks={tasks} getData={getData} />

            <Box style={{ width: "80%" }}></Box>
        </Box>
    );
}

export default Dashboard;
