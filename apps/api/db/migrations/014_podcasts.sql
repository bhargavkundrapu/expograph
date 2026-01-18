-- apps/api/db/migrations/014_podcasts.sql
-- Podcast management with RSS feed support

BEGIN;

-- Podcast Series (optional - can have standalone episodes)
CREATE TABLE IF NOT EXISTS podcast_series (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  title text NOT NULL,
  slug text NOT NULL,
  description text,
  cover_image_url text,
  
  status text NOT NULL DEFAULT 'published', -- draft / published / archived
  
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS podcast_series_tenant_slug_uq
  ON podcast_series(tenant_id, slug)
  WHERE deleted_at IS NULL;

-- Podcast Episodes
CREATE TABLE IF NOT EXISTS podcast_episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  series_id uuid REFERENCES podcast_series(id) ON DELETE SET NULL,
  
  title text NOT NULL,
  slug text NOT NULL,
  description text,
  show_notes text, -- Markdown or HTML
  
  audio_url text NOT NULL, -- URL to audio file
  audio_duration_seconds integer,
  file_size_bytes bigint,
  
  cover_image_url text,
  episode_number integer,
  
  published_at timestamptz, -- When to publish (scheduling)
  status text NOT NULL DEFAULT 'draft', -- draft / published / archived
  
  transcript_url text, -- Optional transcript file URL
  transcript_text text, -- Full transcript text (searchable)
  
  meta jsonb NOT NULL DEFAULT '{}'::jsonb, -- Extra metadata
  
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS podcast_episodes_tenant_slug_uq
  ON podcast_episodes(tenant_id, slug)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS podcast_episodes_series_idx
  ON podcast_episodes(series_id);

CREATE INDEX IF NOT EXISTS podcast_episodes_published_idx
  ON podcast_episodes(tenant_id, published_at DESC, status)
  WHERE deleted_at IS NULL AND status = 'published';

-- Episode progress tracking (for students)
CREATE TABLE IF NOT EXISTS podcast_episode_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  episode_id uuid NOT NULL REFERENCES podcast_episodes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  listened_seconds integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  UNIQUE (tenant_id, episode_id, user_id)
);

CREATE INDEX IF NOT EXISTS podcast_progress_user_idx
  ON podcast_episode_progress(tenant_id, user_id);

-- Mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('014_podcasts.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
