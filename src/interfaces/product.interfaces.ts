import { z } from "zod";
import {
  productSchema,
  productSchemaArray,
  productSchemaRequest,
  productSchemaRequestUpdate,
  productSchemaResponse,
} from "../schemas/product.schema";

export type products = z.infer<typeof productSchema>;
export type productsRequest = z.infer<typeof productSchemaRequest>;
export type productResponse = z.infer<typeof productSchemaResponse>;
export type productsRequestUpdate = z.infer<typeof productSchemaRequestUpdate>;
export type productsResponseArray = z.infer<typeof productSchemaArray>;

export type productResponseArrayPaginated = {
  nextUrl: string | null;
  previousUrl: string | null;
  Total: number;
  limit: any;
  offset: any;
  products: productsResponseArray;
};

