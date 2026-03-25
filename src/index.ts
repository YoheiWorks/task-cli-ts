import { createTask } from "./domain/task.js";

const task = createTask(" f ");
switch (task.kind) {
    case "ok":
        console.log("タスクが作成されました。");
        console.log(`タスク: ${task.value.title} (ID: ${task.value.id}, Status: ${task.value.status})`);
        break;
    case "error":
        console.error(`タスクの作成に失敗しました: \n ${task.error.name}:${task.error.message}`);
        break;
}
