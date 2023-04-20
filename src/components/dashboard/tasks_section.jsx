import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
    IconButton,
    List,
    Stack,
    Typography,
} from "@mui/material";
import { DeleteOutline, EditOutlined, LibraryAdd } from "@mui/icons-material";

import PropTypes from "prop-types";
import { addTask, removeTask } from "../../operations/user_operations";
import AddTaskDialog from "../dialogs/add_task_dialog";
import EditTaskDialog from "../dialogs/edit_task_dialog";

function TaskSection(props) {
    const [openAdd, setOpen] = useState(false);
    const [editTask, setEditTask] = useState("");

    function checkIfExist(task) {
        return props.tasks.includes(task.toLowerCase());
    }

    return (
        <Stack
            style={{
                width: "20%",
                backgroundColor: "rgb(226,226,226)",
            }}
        >
            <div
                style={{
                    backgroundColor: "darkred",
                    height: "5vh",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    noWrap
                >
                    Tasks
                </Typography>
                <IconButton
                    aria-label="upload picture"
                    component="label"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <LibraryAdd style={{ color: "white" }} />
                </IconButton>
            </div>
            <List>
                {props.tasks != null &&
                    props.tasks.map((item) => {
                        return (
                            <ButtonGroup
                                style={{
                                    width: "90%",
                                    margin: "10px 0px 10px 0px",
                                }}
                                key={item}
                                variant="contained"
                                aria-label="Disabled elevation buttons"
                            >
                                <Button
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        backgroundColor: "white",
                                        color: "black",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item}
                                </Button>
                                <Button onClick={()=>{
                                    setEditTask(item);
                                }}>
                                    <EditOutlined />
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: "rgba(201,0,40,0.95)",
                                    }}
                                    onClick={async () => {
                                        await removeTask(item);
                                        await props.getData();
                                    }}
                                >
                                    <DeleteOutline />
                                </Button>
                            </ButtonGroup>
                        );
                    })}
            </List>

            <AddTaskDialog
                setOpen={setOpen}
                open={openAdd}
                addTask={addTask}
                getTasks={props.getData}
                checkIfExist={checkIfExist}
            />

            <EditTaskDialog
                setEditTask={setEditTask}
                task={editTask}
                getTasks={props.getData}
                checkIfExist={checkIfExist}
            />
        </Stack>
    );
}

TaskSection.propTypes = {
    getData: PropTypes.func,
    tasks: PropTypes.array,
};

export default TaskSection;
