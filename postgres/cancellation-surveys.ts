import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const cancellationSurveys = pgTable(
  "cancellation_surveys",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
    userId: text("user_id").notNull(),
    reasonId: uuid("reason_id")
      .references(() => cancellationReasons.id)
      .notNull(),
    reasonOther: text("reason_other"),
    isTrial: boolean("is_trial").notNull(),
  },
  (table) => {
    return {
      userIdIndex: index("user_id_index").on(table.userId),
    };
  },
);

export const cancellationReasons = pgTable("cancellation_reasons", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
});
