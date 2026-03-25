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

class TaskError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class InvalidTaskTitleError extends TaskError {
    constructor() {
        super("タイトルが空文字・空白のみでは、タスクを作成できません。");
    }
}

class TaskAlreadyCompletedError extends TaskError {
    constructor() {
        super("タスクはすでに完了しています。");
    }
}

class TaskAlreadyOpenError extends TaskError {
    constructor() {
        super("タスクはすでにオープン状態です。");
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

function reopenTask(task: Task): Result<Task, TaskAlreadyOpenError> {
    if (task.status === "open") {
        return {
            kind: "error",
            error: new TaskAlreadyOpenError()
        };
    }

    return {
        kind: "ok",
        value: {
            ...task,
            status: "open"
        }
    }
}

export { 
    type Task, 
    type TaskId, 
    type TaskTitle, 
    type TaskStatus, 
    type Result, 
    TaskError, 
    InvalidTaskTitleError, 
    TaskAlreadyCompletedError, 
    TaskAlreadyOpenError, 
    createTask, 
    completeTask, 
    reopenTask 
};