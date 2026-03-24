type Task = {
    id: Id;
    title: Title;
    status: Status;
}

type Id = string;

type Title = string;

type Status = "open" | "completed";