import { describe, expect, it } from "vitest";
import { createTask } from "./task.js";

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
});