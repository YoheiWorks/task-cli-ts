type Task = {
    id: TaskId;
    title: TaskTitle;
    status: TaskStatus;
}

type TaskId = string;

type TaskTitle = string;

type TaskStatus = "open" | "completed";

function createTask(title: TaskTitle): Task {
    return {
        id: crypto.randomUUID(),
        title,
        status: "open",
    }
}

export { type Task, createTask};