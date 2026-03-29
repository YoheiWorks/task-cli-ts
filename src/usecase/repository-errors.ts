import { AppError } from "#domain/task-errors.js";
import type { Task, TaskId } from "#domain/task.js";

export class SavingTaskError extends AppError {
    constructor(task: Task) {
        super(`タスクの保存に失敗しました。タスク: ${task}`);
    }
}

export class TaskNotFoundError extends AppError {
    constructor(taskId: TaskId) {
        super(`指定したIDのタスク取得に失敗しました。ID: ${taskId}`);
    }
}