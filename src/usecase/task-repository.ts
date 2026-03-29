import type { Result } from "#domain/result.js";
import type { Task, TaskId } from "#domain/task.js";
import type { SavingTaskError, TaskNotFoundError } from "#usecase/repository-errors.js";

export interface TaskRepository {
    save(task: Task): Result<Task, SavingTaskError>;
    findAll(): Task[];
    findById(taskId: TaskId): Result<Task, TaskNotFoundError>;
}