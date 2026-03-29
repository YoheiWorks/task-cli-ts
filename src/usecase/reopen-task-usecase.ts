import type { Result } from "#domain/result.js";
import { reopenTask, type Task, type TaskId } from "#domain/task.js";
import type { TaskRepository } from "#usecase/task-repository.js";
import type { ReopenTaskUseCaseError } from "#usecase/usecase-errors.js";

export class ReopenTaskUseCase {
    #repository: TaskRepository;
    
    constructor(repository: TaskRepository) {
        this.#repository = repository;
    }

    execute(taskId: TaskId): Result<Task, ReopenTaskUseCaseError> {
        const findResult = this.#repository.findById(taskId);
        if (findResult.kind === "error") {
            return findResult;
        }

        const reopenResult = reopenTask(findResult.value);
        if (reopenResult.kind === "error") {
            return reopenResult;
        }

        const saveResult = this.#repository.save(reopenResult.value);
        if (saveResult.kind === "error") {
            return saveResult;
        }

        return saveResult;
    }
}