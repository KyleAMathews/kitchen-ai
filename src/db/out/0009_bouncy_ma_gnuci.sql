ALTER TABLE "accounts" ADD COLUMN "issuer" text;--> statement-breakpoint

DO $$
DECLARE
	unmapped_provider_ids text;
BEGIN
	SELECT string_agg(provider_id, ', ' ORDER BY provider_id)
	INTO unmapped_provider_ids
	FROM (
		SELECT DISTINCT provider_id
		FROM accounts
		WHERE provider_id NOT IN ('credential', 'google')
	) providers;

	IF unmapped_provider_ids IS NOT NULL THEN
		RAISE EXCEPTION
			'Cannot backfill Better Auth account issuers for unmapped provider_id(s): %',
			unmapped_provider_ids;
	END IF;
END $$;--> statement-breakpoint

UPDATE "accounts"
SET
	"issuer" = 'local:credential',
	"account_id" = "user_id"
WHERE "provider_id" = 'credential';--> statement-breakpoint

UPDATE "accounts"
SET "issuer" = 'https://accounts.google.com'
WHERE "provider_id" = 'google';--> statement-breakpoint

DO $$
BEGIN
	IF EXISTS (
		SELECT 1
		FROM accounts
		GROUP BY issuer, account_id
		HAVING count(*) > 1
	) THEN
		RAISE EXCEPTION
			'Cannot create Better Auth account identity index: duplicate (issuer, account_id) values exist';
	END IF;
END $$;--> statement-breakpoint

ALTER TABLE "accounts" ALTER COLUMN "issuer" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_issuer_account_id_unique" ON "accounts" USING btree ("issuer","account_id");
