import * as z from "zod";

export const CompleteTaskInputSchema = z.object({
  taskId: z.string(),
});

export type CompleteTaskInput = z.infer<typeof CompleteTaskInputSchema>;