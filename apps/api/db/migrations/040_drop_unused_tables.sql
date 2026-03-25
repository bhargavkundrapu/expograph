BEGIN;

-- Remove tables that are not referenced by current backend runtime paths.
-- CASCADE ensures dependent indexes/constraints are removed with the tables.
DROP TABLE IF EXISTS onboarding_decks_state CASCADE;
DROP TABLE IF EXISTS onboarding_state CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;

INSERT INTO schema_migrations (filename)
VALUES ('040_drop_unused_tables.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
