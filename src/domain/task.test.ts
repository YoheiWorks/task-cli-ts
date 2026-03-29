import { describe, expect, it } from "vitest";
import { completeTask, createTask, reopenTask } from "./task.js";
import { InvalidTaskTitleError, TaskAlreadyCompletedError, TaskAlreadyOpenError } from "#domain/task-errors.js";

describe("タスクの生成に関するテスト", () => {
    it ("複数文字数のタイトルでタスクを生成できる", () => {
        const title = "new Task";

        const result = createTask(title);
        
        expect(result.kind).toBe("ok");
        if (result.kind === "ok") {
            expect(result.value.id.length).toBeGreaterThan(0);
            expect(result.value.title).toBe(title);
            expect(result.value.status).toBe("open");
        }
    });

    it ("1文字のタイトルでタスクを生成できる", () => {
        const title = "n";
        const result = createTask(title);

        expect(result.kind).toBe("ok");
        if (result.kind === "ok") {
            expect(result.value.id.length).toBeGreaterThan(0);
            expect(result.value.title).toBe(title);
            expect(result.value.status).toBe("open");
        }
    });

    it ("空文字のタイトルでタスクを生成できない", () => {
        const title = "";
        const result = createTask(title);

        expect(result.kind).toBe("error");
        if (result.kind === "error") {
            expect(result.error).toBeInstanceOf(InvalidTaskTitleError);
        }
    });

    it ("半角スペースのみのタイトルでタスクを生成できない", () => {
        const title = " ";
        const result = createTask(title);

        expect(result.kind).toBe("error");
        if (result.kind === "error") {
            expect(result.error).toBeInstanceOf(InvalidTaskTitleError);
        }
    });

    it ("全角スペースのみのタイトルでタスクを生成できない", () => {
        const title = "　";
        const result = createTask(title);

        expect(result.kind).toBe("error");
        if (result.kind === "error") {
            expect(result.error).toBeInstanceOf(InvalidTaskTitleError);
        }
    });
});

describe("タスクの完了に関するテスト", () => {
    it ("オープン状態のタスクを完了できる", () => {
        const task = {
            id: "task1",
            title: "Test Task",
            status: "open" as const
        };

        const result = completeTask(task);

        expect(result.kind).toBe("ok");
        if (result.kind === "ok") {
            expect(result.value.id).toBe(task.id);
            expect(result.value.title).toBe(task.title);
            expect(result.value.status).toBe("completed");
        }
    });

    it ("すでに完了しているタスクを再度完了できない", () => {
        const task = {
            id: "task1",
            title: "Test Task",
            status: "completed" as const
        };

        const result = completeTask(task);

        expect(result.kind).toBe("error");
        if (result.kind === "error") {
            expect(result.error).toBeInstanceOf(TaskAlreadyCompletedError);
        }
    });
});

describe("タスクの再オープンに関するテスト", () => {
    it ("完了状態のタスクを再オープンできる", () => {
        const task = {
            id: "task1",
            title: "Test Task",
            status: "completed" as const
        };

        const result = reopenTask(task);

        expect(result.kind).toBe("ok");
        if (result.kind === "ok") {
            expect(result.value.id).toBe(task.id);
            expect(result.value.title).toBe(task.title);
            expect(result.value.status).toBe("open");
        }
    });

    it ("すでにオープン状態のタスクを再度オープンできない", () => {
        const task = {
            id: "task1",
            title: "Test Task",
            status: "open" as const
        };

        const result = reopenTask(task);

        expect(result.kind).toBe("error");
        if (result.kind === "error") {
            expect(result.error).toBeInstanceOf(TaskAlreadyOpenError);
        }
    });
});