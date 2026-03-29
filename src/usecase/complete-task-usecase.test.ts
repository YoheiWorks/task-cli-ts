import { type Task } from "#domain/task.js";
import { describe, expect, it, vi } from "vitest";
import type { TaskRepository } from "./task-repository.js";
import { CompleteTaskUseCase } from "./complete-task-usecase.js";
import { SavingTaskError, TaskNotFoundError } from "./repository-errors.js";
import { TaskAlreadyCompletedError } from "../domain/task-errors.js";

describe ("Taskを完了にするユースケースのテスト", () => {
    it ("`open`であるタスクを完了にできる", () => {
        const targetTask: Task = {
            id: "task-1",
            title: "完了済みタスク",
            status: "open"
        } as const;
    
        const findById = vi.fn((_taskId) => ({
            kind: "ok" as const,
            value: targetTask
        }));
    
        const save = vi.fn((task) => ({
            kind: "ok" as const,
            value: task,
        }));
    
        const repository: TaskRepository = {
            save,
            findById,
            findAll: vi.fn(() => []),
        };
    
        const usecase = new CompleteTaskUseCase(repository);
    
        const result = usecase.execute(targetTask.id);
    
        expect(result.kind).toBe("ok");
        if (result.kind === "ok") {
            const completedTask = result.value;
            expect(completedTask.id).toBe(targetTask.id);
            expect(completedTask.title).toBe(targetTask.title);
            expect(completedTask.status).toBe("completed");
        }
    
        expect(findById).toHaveBeenCalledOnce();
        expect(findById).toHaveBeenCalledWith(targetTask.id);
    
        expect(save).toHaveBeenCalledOnce();
        expect(save).toHaveBeenCalledWith(
            {
                ...targetTask,
                status: "completed"
            }
        );
    });

    it ("対象のタスクが存在しない場合、そのエラーを返す", () => {
        const findById = vi.fn((taskId) => ({
            kind: "error" as const,
            error: new TaskNotFoundError(taskId)
        }));

        const repository: TaskRepository = {
            save: vi.fn(),
            findAll: vi.fn(() => []),
            findById
        }

        const usecase = new CompleteTaskUseCase(repository);

        const result = usecase.execute("test-id");

        expect(result.kind).toBe("error");
        if (result.kind === "error") {

            expect(result.error).toBeInstanceOf(TaskNotFoundError);
        }

        expect(repository.save).not.toHaveBeenCalled()
    });

    it ("対象のタスクがすでに`completed`場合、そのエラーを返す", () => {
        const targetTask = {
            id: "task-1",
            title: "new task",
            status: "completed",
        } as const;

        const findById = vi.fn((_taskId) => ({
            kind: "ok" as const,
            value: targetTask,
        }));

        const repository: TaskRepository = {
            save: vi.fn(),
            findAll: vi.fn(() => []),
            findById
        }

        const usecase = new CompleteTaskUseCase(repository);

        const result = usecase.execute(targetTask.id);

        expect(result.kind).toBe("error");
        if (result.kind === "error") {

            expect(result.error).toBeInstanceOf(TaskAlreadyCompletedError);
        }

        expect(repository.save).not.toHaveBeenCalled()
    });

    it ("`completed`のタスク保存に失敗した場合、そのエラーを返す", () => {
        const targetTask = {
            id: "task-1",
            title: "new task",
            status: "open",
        } as const;

        const completedTask: Task = {
            ...targetTask,
            status: "completed",
        } as const;

        const findById = vi.fn((_taskId) => ({
            kind: "ok" as const,
            value: targetTask,
        }));

        const save = vi.fn((_task) => ({
            kind: "error" as const,
            error: new SavingTaskError(completedTask),
        }));

        const repository: TaskRepository = {
            save,
            findAll: vi.fn(() => []),
            findById
        }

        const usecase = new CompleteTaskUseCase(repository);

        const result = usecase.execute(targetTask.id);

        expect(result.kind).toBe("error");
        if (result.kind === "error") {

            expect(result.error).toBeInstanceOf(SavingTaskError);
        }

        expect(save).toHaveBeenCalledOnce()
    });
});