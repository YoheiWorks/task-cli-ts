import { completeTask, createTask } from "./domain/task.js";

const result = createTask("new task");
if (result.kind === "ok") {
    const task = result.value;
    console.log("タスクが作成されました:", task);
    console.log("タスクを完了します...");
    const completionResult = completeTask(task);
    if (completionResult.kind === "ok") {
        console.log("タスクが完了しました:", completionResult.value);
        console.log("タスクを再度完了しようとします...");
        const secondCompletionResult = completeTask(completionResult.value);
        if (secondCompletionResult.kind === "error") {
            console.error("タスクの完了に失敗しました:", secondCompletionResult.error.message);
        }
    }
}

