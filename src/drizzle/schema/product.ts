import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const productStatuses = ["public", "private"] as const;
export type ProductStatus = (typeof productStatuses)[number];
export const productStatusEnum = pgEnum("product_status", productStatuses);

export const ProductTable = pgTable("products", {
  id,
  name: text().notNull(),
  describtion: text().notNull(),
  imgUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});

export const ProductRelationships = relations(
  ProductTable,
  ({ one, many }) => ({
    test: one(),
  }),
);
