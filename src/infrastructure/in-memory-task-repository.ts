import type {Task, TaskId } from "#domain/task.js";
import type { Result } from "#domain/result.js";
import { TaskNotFoundError, SavingTaskError } from "#usecase/repository-errors.js";
import type { TaskRepository } from "#usecase/task-repository.js";

export class InMemoryTaskRepository implements TaskRepository {
    #map: Map<TaskId, Task>;

    constructor() {
        this.#map = new Map();
    }

    save(task: Task): Result<Task, SavingTaskError> {
        this.#map.set(task.id, task);
        return {
            kind: "ok",
            value: task,
        };
    }

    findAll(): Task[] {
        return Array.from(this.#map.values());
    }

    findById(taskId: TaskId): Result<Task, TaskNotFoundError> {
        const targetTask = this.#map.get(taskId);
        if (targetTask === undefined) {
            return {
                kind: "error",
                error: new TaskNotFoundError(taskId)
            };
        }

        return {
            kind: "ok",
            value: targetTask
        }
    }
}

