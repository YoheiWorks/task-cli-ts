import * as z from "zod";

export const ReopenTaskInputSchema = z.object({
  taskId: z.string(),
});

export type ReopenTaskInput = z.infer<typeof ReopenTaskInputSchema>;