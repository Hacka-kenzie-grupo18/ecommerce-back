import { z } from "zod";
import { commentsSchema } from "../schemas/comments";

export type comments = z.infer<typeof commentsSchema>

export type commentsRequest = {
    comment : string,
    rating: number | null
}

export type commentsRequestUpdate = {
    comment : string | null,
    rating: number | null
}