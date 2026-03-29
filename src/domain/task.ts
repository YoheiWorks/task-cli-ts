import type { Result } from "#domain/result.js";
import { InvalidTaskTitleError, TaskAlreadyCompletedError, TaskAlreadyOpenError } from "#domain/task-errors.js";

type Task = {
    id: TaskId;
    title: TaskTitle;
    status: TaskStatus;
}

type TaskId = string;

type TaskTitle = string;

type TaskStatus = "open" | "completed";

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
    InvalidTaskTitleError,
    TaskAlreadyCompletedError,
    TaskAlreadyOpenError,
    createTask,
    completeTask,
    reopenTask
};