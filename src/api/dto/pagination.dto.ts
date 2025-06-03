import z from "zod";

export const paginationValidator = z.object({
  limit: z.coerce
    .number()
    .optional()
    .default(20)
    .openapi({ description: "Maximum number of items to return per page", example: 20, default: 20 }),
  offset: z.coerce.number().optional().default(0).openapi({
    description: "Number of items to skip before starting to collect the result set",
    example: 0,
    default: 0,
  }),
  search: z.string().optional().openapi({
    description: "Search term to filter results",
    example: "example",
    default: "",
  }),
});

export type PaginationPayload = z.infer<typeof paginationValidator>;
