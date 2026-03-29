import type { Task } from "#domain/task.js";
import type { TaskRepository } from "#usecase/task-repository.js";

export class ListTasksUseCase {
    #repository: TaskRepository;
    
    constructor(repository: TaskRepository) {
        this.#repository = repository;
    }

    execute(): Task[] {
        return this.#repository.findAll();
    }
}