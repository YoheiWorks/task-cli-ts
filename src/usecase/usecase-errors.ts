import { InvalidTaskTitleError, TaskAlreadyCompletedError, TaskAlreadyOpenError } from "#domain/task-errors.js";
import { SavingTaskError, TaskNotFoundError } from "#usecase/repository-errors.js";

export type CreateTaskUseCaseError = InvalidTaskTitleError | SavingTaskError;
export type CompleteTaskUseCaseError = TaskAlreadyCompletedError | SavingTaskError | TaskNotFoundError;
export type ReopenTaskUseCaseError = TaskAlreadyOpenError | SavingTaskError | TaskNotFoundError;
