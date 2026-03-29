export class AppError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class InvalidTaskTitleError extends AppError {
    constructor() {
        super("タイトルが空文字・空白のみでは、タスクを作成できません。");
    }
}

export class TaskAlreadyCompletedError extends AppError {
    constructor() {
        super("タスクはすでに完了しています。");
    }
}

export class TaskAlreadyOpenError extends AppError {
    constructor() {
        super("タスクはすでにオープン状態です。");
    }
}