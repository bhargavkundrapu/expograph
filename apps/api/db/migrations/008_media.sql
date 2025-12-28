-- apps/api/db/migrations/008_media.sql
BEGIN;

-- video assets table
CREATE TABLE IF NOT EXISTS video_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),

  provider text NOT NULL DEFAULT 'cloudflare_stream',
  uid text NOT NULL, -- Cloudflare video UID
  require_signed_urls boolean NOT NULL DEFAULT true,

  status text NOT NULL DEFAULT 'ready', -- ready | processing | failed
  duration_seconds integer,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- prevent duplicate video uid per tenant/provider
CREATE UNIQUE INDEX IF NOT EXISTS video_assets_tenant_provider_uid_uq
  ON video_assets (tenant_id, provider, uid);

-- connect lessons to video asset (nullable)
ALTER TABLE lessons
  ADD COLUMN IF NOT EXISTS video_asset_id uuid REFERENCES video_assets(id);

CREATE INDEX IF NOT EXISTS lessons_video_asset_id_idx
  ON lessons(video_asset_id);

COMMIT;
