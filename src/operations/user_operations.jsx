import { doc, getDoc, setDoc } from "firebase/firestore";
import { fire_auth, fire_db } from "../firebase";

export const addTask = async (task) => {
    const email = fire_auth.currentUser.email;
    const docRef = await getDoc(doc(fire_db, "users", email));
    const data = docRef.data();
    if (data !== undefined) {
        const docs = doc(fire_db, "users", email);
        await setDoc(docs, {
            ...data,
            tasks: [...data["tasks"], task],
        });
    }
};

export const removeTask = async (task) => {
    const email = fire_auth.currentUser.email;
    const docRef = await getDoc(doc(fire_db, "users", email));
    const data = docRef.data();
    if (data !== undefined) {
        await setDoc(doc(fire_db, "users", email), {
            ...data,
            tasks: data["tasks"].filter((e) => e !== task),
        });
    }
};

export const editTask = async (oldTask, newTask) => {
    const email = fire_auth.currentUser.email;
    const docRef = await getDoc(doc(fire_db, "users", email));
    const data = docRef.data();
    if (data !== undefined) {
        await setDoc(doc(fire_db, "users", email), {
            ...data,
            tasks: data["tasks"].map((str) =>
                str === oldTask ? newTask : str
            ),
        });
    }
};

export const getTasks = async () => {
    const email = fire_auth.currentUser.email;
    const docRef = await getDoc(doc(fire_db, "users", email));
    const data = docRef.data();
    return data.tasks;
};

export const addUser = async (email) => {
    const docs = doc(fire_db, "users", email);
    await setDoc(docs, {
        lastAction: {
            isEnded: true,
            started: "",
            task: "",
        },
        tasks: [],
    });
    const records = doc(fire_db, "records", email);
    await setDoc(records, {
        data: [],
    });
};
