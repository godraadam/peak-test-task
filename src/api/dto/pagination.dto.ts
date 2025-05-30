import z from "zod";

export const paginationValidator = z.object({
  limit: z.coerce.number().optional().default(20),
  offset: z.coerce.number().optional().default(0),
  search: z.string().optional(),
});

export type PaginationPayload = z.infer<typeof paginationValidator>;
