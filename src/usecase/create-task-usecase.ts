import type { Result } from "#domain/result.js";
import { createTask, type Task } from "#domain/task.js";
import type { CreateTaskInput } from "#input/create-task-input.js";
import type { TaskRepository } from "#usecase/task-repository.js";
import type { CreateTaskUseCaseError } from "#usecase/usecase-errors.js";

export class CreateTaskUseCase {
    #repository: TaskRepository;

    constructor(repository: TaskRepository) {
        this.#repository = repository;
    }

    execute({ title }: CreateTaskInput): Result<Task, CreateTaskUseCaseError> {
        const result = createTask(title);
        if (result.kind === "error") {
            return result;
        }

        const newTask = result.value;
        const saveResult = this.#repository.save(newTask);
        if (saveResult.kind === "error") {
            return saveResult;
        }

        return saveResult;
    }
}