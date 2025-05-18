import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),
  path: text("path").notNull(), // Full path to the file/folder
  size: integer("size").notNull(), // Size in bytes (0 for folders)
  type: text("type").notNull(), // MIME type for files, "folder" for folders

  fileUrl: text("file_url").notNull(), // URL to access the file
  thumbnailUrl: text("thumbnail_url"), // Optional thumbnail for images/documents

  userId: text("user_id").notNull(), // Owner of the file/folder
  parentId: uuid("parent_id"), // Parent folder ID (null for root items)

  isFolder: boolean("is_folder").default(false).notNull(), // Whether this is a folder
  isStarred: boolean("is_starred").default(false).notNull(), // Starred/favorite items
  isTrash: boolean("is_trash").default(false).notNull(), // Items in trash

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const filesRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId], // The foreign key in this table
    references: [files.id], // The primary key in the parent table
  }),

  children: many(files),
}));

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;