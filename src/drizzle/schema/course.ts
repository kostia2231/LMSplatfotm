import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updetedAt } from "../schemaHelpers";

export const CourseTable = pgTable("courses", {
  id,
  name: text().notNull(),
  describtion: text().notNull(),
  createdAt,
  updetedAt,
});

export const CourseRelationships = relations(CourseTable, ({ one, many }) => ({
  test: one(),
}));
