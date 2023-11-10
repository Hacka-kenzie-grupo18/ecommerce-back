import { z } from "zod";
import { userSchema, userSchemaRequest, userSchemaResponse, userSchemaUpdate } from "../schemas/user.schema";

export type user         = z.infer<typeof userSchema>

export type userRequest  = z.infer<typeof userSchemaRequest>   

export type userResponse = z.infer<typeof userSchemaResponse> 

export type userUpdate   = z.infer<typeof userSchemaUpdate>    