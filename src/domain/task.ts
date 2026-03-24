type Task = {
    id: Id;
    title: Title;
    status: Status;
}

type Id = string;

type Title = string;

type Status = "open" | "completed";

function createTask(title: Title): Task {
    return {
        id: crypto.randomUUID(),
        title,
        status: "open",
    }
}

export { type Task, createTask};