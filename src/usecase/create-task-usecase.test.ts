import { describe, expect, it, vi } from "vitest";
import { CreateTaskUseCase } from "./create-task-usecase.js";
import type { TaskRepository } from "./task-repository.js";
import { InvalidTaskTitleError } from "../domain/task-errors.js";
import { SavingTaskError } from "./repository-errors.js";

describe ("Taskを作成するユースケースのテスト", () => {
    it ("正常なタイトルならタスクを作成して保存できる", () => {
        const save = vi.fn((task) => ({
            kind: "ok" as const,
            value: task,
        }));

        const repository: TaskRepository = {
            save,
            findAll: vi.fn(() => []),
            findById: vi.fn(),
        };

        const usecase = new CreateTaskUseCase(repository);

        const result = usecase.execute("new task");

        expect(result.kind).toBe("ok");
        if (result.kind === "ok") {
            expect(result.value.title).toBe("new task");
            expect(result.value.status).toBe("open");
            expect(result.value.id.length).toBeGreaterThan(0);
        }

        expect(save).toHaveBeenCalledTimes(1);
        expect(save).toHaveBeenCalledWith(
            expect.objectContaining({
                title: "new task",
                status: "open",
            }),
        );
    });

    it ("不正なタイトルなら失敗し、そのエラーを返す", () => {
        const save = vi.fn((task) => ({
            kind: "ok" as const,
            value: task,
        }));

        const repository: TaskRepository = {
            save,
            findAll: vi.fn(() => []),
            findById: vi.fn(),
        };

        const usecase = new CreateTaskUseCase(repository);

        const result = usecase.execute("　 ");
        expect(result.kind).toBe("error");
        if (result.kind === "error") {
            expect(result.error).toBeInstanceOf(InvalidTaskTitleError)
        }

        expect(save).not.toHaveBeenCalled();
    });

    it("保存に失敗したら、そのエラーを返す", () => {
        const save = vi.fn((task) => ({
            kind: "error" as const,
            error: new SavingTaskError(task),
        }));

        const repository: TaskRepository = {
            save,
            findAll: vi.fn(() => []),
            findById: vi.fn()
        };

        const usecase = new CreateTaskUseCase(repository);

        const result = usecase.execute("new task");
        expect(result.kind).toBe("error");
        if (result.kind === "error") {
            expect(result.error).toBeInstanceOf(SavingTaskError);
        }

        expect(save).toHaveBeenCalledTimes(1);
    });
})