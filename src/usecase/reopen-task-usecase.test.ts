import { type Task } from "#domain/task.js";
import { describe, expect, it, vi } from "vitest";
import type { TaskRepository } from "./task-repository.js";
import { SavingTaskError, TaskNotFoundError } from "./repository-errors.js";
import { TaskAlreadyOpenError } from "../domain/task-errors.js";
import { ReopenTaskUseCase } from "./reopen-task-usecase.js";

describe ("完了済みTaskを再度`open`にするユースケースのテスト", () => {
    it ("`completed`であるタスクを`open`にできる", () => {
        const targetTask: Task = {
            id: "task-1",
            title: "完了済みタスク",
            status: "completed"
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
    
        const usecase = new ReopenTaskUseCase(repository);
    
        const result = usecase.execute(targetTask.id);
    
        expect(result.kind).toBe("ok");
        if (result.kind === "ok") {
            const reopenTask = result.value;
            expect(reopenTask.id).toBe(targetTask.id);
            expect(reopenTask.title).toBe(targetTask.title);
            expect(reopenTask.status).toBe("open");
        }
    
        expect(findById).toHaveBeenCalledOnce();
        expect(findById).toHaveBeenCalledWith(targetTask.id);
    
        expect(save).toHaveBeenCalledOnce();
        expect(save).toHaveBeenCalledWith(
            {
                ...targetTask,
                status: "open"
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

        const usecase = new ReopenTaskUseCase(repository);

        const result = usecase.execute("test-id");

        expect(result.kind).toBe("error");
        if (result.kind === "error") {

            expect(result.error).toBeInstanceOf(TaskNotFoundError);
        }

        expect(repository.save).not.toHaveBeenCalled()
    });

    it ("対象のタスクがすでに`open`場合、そのエラーを返す", () => {
        const targetTask = {
            id: "task-1",
            title: "new task",
            status: "open",
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

        const usecase = new ReopenTaskUseCase(repository);

        const result = usecase.execute(targetTask.id);

        expect(result.kind).toBe("error");
        if (result.kind === "error") {

            expect(result.error).toBeInstanceOf(TaskAlreadyOpenError);
        }

        expect(repository.save).not.toHaveBeenCalled()
    });

    it ("`open`のタスク保存に失敗した場合、そのエラーを返す", () => {
        const targetTask = {
            id: "task-1",
            title: "new task",
            status: "completed",
        } as const;

        const reopenedTask: Task = {
            ...targetTask,
            status: "open",
        } as const;

        const findById = vi.fn((_taskId) => ({
            kind: "ok" as const,
            value: targetTask,
        }));

        const save = vi.fn((_task) => ({
            kind: "error" as const,
            error: new SavingTaskError(reopenedTask),
        }));

        const repository: TaskRepository = {
            save,
            findAll: vi.fn(() => []),
            findById
        }

        const usecase = new ReopenTaskUseCase(repository);

        const result = usecase.execute(targetTask.id);

        expect(result.kind).toBe("error");
        if (result.kind === "error") {

            expect(result.error).toBeInstanceOf(SavingTaskError);
        }

        expect(save).toHaveBeenCalledOnce()
    });
});