import * as z from "zod";

export const CreateTaskInputSchema = z.object({
  title: z.string(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;