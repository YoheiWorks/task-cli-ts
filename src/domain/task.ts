type Task = {
    id: TaskId;
    title: TaskTitle;
    status: TaskStatus;
}

type TaskId = string;

type TaskTitle = string;

type TaskStatus = "open" | "completed";

type Result<T, E extends Error> = 
    { readonly kind: "ok"; readonly value: T}
    | { readonly kind: "error"; readonly error: E };

class InvalidTaskTitleError extends Error {
    constructor() {
        super("タイトルが空文字・空白のみでは、タスクを作成できません。");
        this.name = "InvalidTaskTitleError";

        Object.setPrototypeOf(this, InvalidTaskTitleError.prototype);
    }
}

class TaskAlreadyCompletedError extends Error {
    constructor() {
        super("タスクはすでに完了しています。");
        this.name = "TaskAlreadyCompletedError";

        Object.setPrototypeOf(this, TaskAlreadyCompletedError.prototype);
    }
}

function createTask(title: TaskTitle): Result<Task, InvalidTaskTitleError> {

    if (!validateTaskTitle(title)) {
        return {
            kind: "error",
            error: new InvalidTaskTitleError()
        };
    }

    return {
        kind: "ok",
        value: {
            id: crypto.randomUUID(),
            title,
            status: "open"
        }
    };
}

function validateTaskTitle(title: TaskTitle): boolean {
    return title.trim().length > 0;
}

function completeTask(task: Task): Result<Task, TaskAlreadyCompletedError> {
    if (task.status === "completed") {
        return {
            kind: "error",
            error: new TaskAlreadyCompletedError()
        };
    }

    return {
        kind: "ok",
        value: {
            ...task,
            status: "completed"
        }
    };
}

export { type Task, type TaskId, type TaskTitle, type TaskStatus, type Result, type InvalidTaskTitleError, createTask, completeTask };