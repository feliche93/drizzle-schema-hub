import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core"

export const onboardingRoles = pgTable(
    'onboarding_roles',
    {
        id: uuid('id').defaultRandom().primaryKey().notNull(),
        name: text('name').notNull(),
    },
    (table) => {
        return {
            idKey: uniqueIndex('onboarding_roles_id_key').on(table.id),
        }
    },
)

export const onboardingProblems = pgTable(
    'onboarding_problems',
    {
        id: uuid('id').defaultRandom().primaryKey().notNull(),
        name: text('name').notNull(),
    },
    (table) => {
        return {
            idKey: uniqueIndex('onboarding_problems_id_key').on(table.id),
        }
    },
)

export const onboardingOrganizations = pgTable(
    'onboarding_organizations',
    {
        id: uuid('id').defaultRandom().primaryKey().notNull(),
        name: text('name').notNull(),
    },
    (table) => {
        return {
            idKey: uniqueIndex('onboarding_organization_id_key').on(table.id),
        }
    },
)

export const onboardingSurveys = pgTable(
    'onboarding_surveys',
    {
        id: uuid('id').defaultRandom().primaryKey().notNull(),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
        userId: text('user_id').notNull(),
        roleID: uuid('role_id')
            .references(() => onboardingRoles.id)
            .notNull(),
        userRoleOther: text('user_role_other'),
        problemID: uuid('problem_id')
            .references(() => onboardingProblems.id)
            .notNull(),
        problemToSolveOther: text('problem_to_solve_other'),
        organizationID: uuid('organization_id')
            .references(() => onboardingOrganizations.id)
            .notNull(),
        organizationOther: text('organization_other'),
    },
    (table) => {
        return {
            idKey: uniqueIndex('onboarding_surveys_id_key').on(table.id),
        }
    },
)