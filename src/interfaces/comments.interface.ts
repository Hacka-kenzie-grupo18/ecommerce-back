import { z } from "zod";
import { commentsRequestSchema, commentsSchema } from "../schemas/comments";

export type comments = z.infer<typeof commentsSchema>

export type commentsRequest = {
    comment : string,
    rating: number | null
}