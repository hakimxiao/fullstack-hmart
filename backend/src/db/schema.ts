import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  // updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  // updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// 🚩Relation define how tables connect each other. This enables Drizzle's query API
// 🚩to automatically join related data when using 'with: { relationName: true }'

// 🚩Users Relations: A user can have many products and many comments
// 🚩'many()' means one user can have multiple related records

export const userRelations = relations(users, ({ many }) => ({
  products: many(products),
  comments: many(comments),
}));

// Products relations: a product belogs one user and can have many comments
// 'one()' means a single related record, 'many()' means multiple related records

export const productRelations = relations(products, ({ many, one }) => ({
  comments: many(comments),
  // 'fields' = the foreign key column in THIS table (products.userId)
  // 'references' = the Primary key column in the RELATED table (users.id)
  user: one(users, { fields: [products.userId], references: [users.id] }), // one product -> one user
}));

// Comments Relations: A comment belongs to one user and one product
export const commentRelations = relations(comments, ({ one }) => ({
  user: one(users, { fields: [comments.userId], references: [users.id] }), // One comment -> one user
  products: one(products, {
    fields: [comments.productId],
    references: [products.id],
  }), // one comment one product
}));

// Type Interface
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
