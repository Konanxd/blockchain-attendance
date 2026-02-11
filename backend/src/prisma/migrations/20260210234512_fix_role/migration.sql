-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "dateTime" SET DEFAULT NOW() + interval '30 days';
