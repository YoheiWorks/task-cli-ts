import type { Result } from "#domain/result.js";
import { completeTask, type Task, type TaskId } from "#domain/task.js";
import type { TaskRepository } from "#usecase/task-repository.js";
import type { CompleteTaskUseCaseError } from "#usecase/usecase-errors.js";

export class CompleteTaskUseCase {
    #repository: TaskRepository;
    
    constructor(repository: TaskRepository) {
        this.#repository = repository;
    }

    execute(taskId: TaskId): Result<Task, CompleteTaskUseCaseError> {
        const findResult = this.#repository.findById(taskId);
        if (findResult.kind === "error") {
            return findResult;
        }

        const completeResult = completeTask(findResult.value);
        if (completeResult.kind === "error") {
            return completeResult;
        }

        const saveResult = this.#repository.save(completeResult.value);
        if (saveResult.kind === "error") {
            return saveResult;
        }

        return saveResult;
    }
}