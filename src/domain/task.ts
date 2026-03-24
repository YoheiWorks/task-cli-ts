type Task = {
    id: string;
    title: string;
    status: Status;
}

type Status = "open" | "completed";