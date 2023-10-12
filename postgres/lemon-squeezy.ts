import {
    boolean,
    index,
    integer,
    jsonb,
    numeric,
    pgEnum,
    pgTable, serial,
    text,
    timestamp, varchar
} from 'drizzle-orm/pg-core'

export const subscriptionStatusEnum = pgEnum('subscription_status', [
    'on_trial',
    'active',
    'paused',
    'past_due',
    'unpaid',
    'cancelled',
    'expired',
])

export const pauseModeEnum = pgEnum('pause_mode', ['void', 'free'])

// declaring enum in database for card brand
export const cardBrandEnum = pgEnum('card_brand', [
    'visa',
    'mastercard',
    'american_express',
    'discover',
    'jcb',
    'diners_club',
    'amex',
])

export const subscriptions = pgTable(
    'subscriptions',
    {
        id: serial('id').primaryKey(),
        userId: text('user_id').notNull(),
        storeId: integer('store_id'),
        customerId: integer('customer_id'),
        orderId: integer('order_id'),
        orderItemId: integer('order_item_id'),
        productId: integer('product_id'),
        variantId: integer('variant_id'),
        productName: text('product_name'),
        variantName: text('variant_name'),
        userName: text('user_name'),
        userEmail: text('user_email'),
        status: subscriptionStatusEnum('status'),
        statusFormatted: text('status_formatted'),
        cardBrand: cardBrandEnum('card_brand'),
        cardLastFour: varchar('card_last_four', { length: 4 }),
        pause: jsonb('pause'),
        cancelled: boolean('cancelled'),
        trialEndsAt: timestamp('trial_ends_at'),
        billingAnchor: integer('billing_anchor'),
        urls: jsonb('urls'),
        renewsAt: timestamp('renews_at'),
        endsAt: timestamp('ends_at'),
        createdAt: timestamp('created_at'),
        updatedAt: timestamp('updated_at'),
        testMode: boolean('test_mode'),
    },
    (table) => {
        return {
            userIdIndex: index('user_id_index').on(table.userId),
        }
    },
)

// declaring enum in database for billing reason
export const billingReasonEnum = pgEnum('billing_reason', ['initial', 'renewal', 'updated'])

// declaring enum in database for invoice status
export const invoiceStatusEnum = pgEnum('invoice_status', [
    'paid',
    'open',
    'void',
    'uncollectible',
    'draft',
])

export const subscriptionInvoices = pgTable('subscription_invoices', {
    id: serial('id').primaryKey(),
    storeId: integer('store_id'),
    subscriptionId: integer('subscription_id'),
    billingReason: billingReasonEnum('billing_reason'),
    cardBrand: cardBrandEnum('card_brand'),
    cardLastFour: varchar('card_last_four', { length: 4 }),
    currency: varchar('currency', { length: 3 }),
    currencyRate: numeric('currency_rate', { precision: 10, scale: 8 }),
    subtotal: integer('subtotal'),
    discountTotal: integer('discount_total'),
    tax: integer('tax'),
    total: integer('total'),
    subtotalUsd: integer('subtotal_usd'),
    discountTotalUsd: integer('discount_total_usd'),
    taxUsd: integer('tax_usd'),
    totalUsd: integer('total_usd'),
    status: invoiceStatusEnum('status'),
    statusFormatted: text('status_formatted'),
    refunded: boolean('refunded'),
    refundedAt: timestamp('refunded_at'),
    urls: jsonb('urls'),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
    testMode: boolean('test_mode'),
})

export const storePlanEnum = pgEnum('store_plan', ['fresh', 'sweet', 'free'])

export const stores = pgTable('stores', {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    domain: text('domain').notNull(),
    url: text('url').notNull(),
    avatarUrl: text('avatar_url').notNull(),
    plan: storePlanEnum('plan').notNull(),
    country: text('country').notNull(),
    countryNicename: text('country_nicename').notNull(),
    currency: varchar('currency', { length: 3 }).notNull(),
    totalSales: integer('total_sales').notNull(),
    totalRevenue: integer('total_revenue').notNull(),
    thirtyDaySales: integer('thirty_day_sales').notNull(),
    thirtyDayRevenue: integer('thirty_day_revenue').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
})

export const productStatusEnum = pgEnum('product_status', ['draft', 'published'])

export const products = pgTable('products', {
    id: text('id').primaryKey().notNull(),
    storeId: integer('store_id').notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description').notNull(),
    status: productStatusEnum('status').notNull(),
    statusFormatted: text('status_formatted').notNull(),
    thumbUrl: text('thumb_url'),
    largeThumbUrl: text('large_thumb_url'),
    price: integer('price').notNull(),
    payWhatYouWant: boolean('pay_what_you_want').notNull(),
    fromPrice: integer('from_price'),
    toPrice: integer('to_price'),
    buyNowUrl: text('buy_now_url').notNull(),
    priceFormatted: text('price_formatted').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
    testMode: boolean('test_mode').notNull(),
})

export const variantStatusEnum = pgEnum('variant_status', ['pending', 'draft', 'published'])

export const variantIntervalEnum = pgEnum('variant_interval', ['day', 'week', 'month', 'year'])

export const licenseLengthUnitEnum = pgEnum('license_length_unit', ['days', 'months', 'years'])

export const productVariants = pgTable('product_variants', {
    id: text('id').primaryKey().notNull(),
    productId: integer('product_id').notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description').notNull(),
    price: integer('price').notNull(),
    isSubscription: boolean('is_subscription').notNull(),
    interval: variantIntervalEnum('interval'),
    intervalCount: integer('interval_count'),
    hasFreeTrial: boolean('has_free_trial').notNull(),
    trialInterval: variantIntervalEnum('trial_interval').notNull(),
    trialIntervalCount: integer('trial_interval_count').notNull(),
    payWhatYouWant: boolean('pay_what_you_want').notNull(),
    minPrice: integer('min_price'),
    suggestedPrice: integer('suggested_price'),
    hasLicenseKeys: boolean('has_license_keys').notNull(),
    licenseActivationLimit: integer('license_activation_limit'),
    isLicenseLimitUnlimited: boolean('is_license_limit_unlimited').notNull(),
    licenseLengthValue: integer('license_length_value'),
    licenseLengthUnit: licenseLengthUnitEnum('license_length_unit').notNull(),
    isLicenseLengthUnlimited: boolean('is_license_length_unlimited').notNull(),
    sort: integer('sort').notNull(),
    status: variantStatusEnum('status').notNull(),
    statusFormatted: text('status_formatted').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
})

export const prodcutVariantsUsageCaps = pgTable('product_variant_usage_caps', {
    id: text('id').primaryKey().notNull(),
    variantId: integer('variant_id').notNull(),
    usageLimit: integer('usage_limit').notNull(),
    usageCount: integer('usage_count').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
