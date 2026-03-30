import * as z from "zod";

export const ListTasksInputSchema = z.object({});

export type ListTasksInput = z.infer<typeof ListTasksInputSchema>;