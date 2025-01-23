-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PENDING', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "order" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "order_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "orderStatus" NOT NULL DEFAULT 'PENDING',
    "total_amount" DOUBLE PRECISION NOT NULL,
    "billing_address" TEXT,
    "shipping_method" TEXT NOT NULL,
    "tracking_number" INTEGER,
    "shipping_address_id" UUID NOT NULL,
    "payment_method_id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);
