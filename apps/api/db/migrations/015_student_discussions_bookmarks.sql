-- apps/api/db/migrations/015_student_discussions_bookmarks.sql
-- Student discussions and bookmarks tables

BEGIN;

-- Discussions table
CREATE TABLE IF NOT EXISTS discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  discussion_name TEXT NOT NULL,
  problem TEXT NOT NULL,
  upvotes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS discussions_tenant_idx ON discussions(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS discussions_author_idx ON discussions(tenant_id, author_id);

-- Discussion replies
CREATE TABLE IF NOT EXISTS discussion_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  discussion_id UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS discussion_replies_discussion_idx ON discussion_replies(discussion_id, created_at ASC);
CREATE INDEX IF NOT EXISTS discussion_replies_tenant_idx ON discussion_replies(tenant_id);

-- Discussion upvotes (to prevent duplicate upvotes)
CREATE TABLE IF NOT EXISTS discussion_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  discussion_id UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, discussion_id, user_id)
);

CREATE INDEX IF NOT EXISTS discussion_upvotes_discussion_idx ON discussion_upvotes(discussion_id);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'mcq', 'practice', 'lesson', 'discussion'
  item_id UUID NOT NULL, -- ID of the bookmarked item (lesson_id, mcq_id, etc.)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, user_id, type, item_id)
);

CREATE INDEX IF NOT EXISTS bookmarks_user_idx ON bookmarks(tenant_id, user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS bookmarks_type_idx ON bookmarks(tenant_id, type, item_id);

-- Note: MCQs table already exists as lesson_mcqs (from migration 012_lesson_mcq_slides.sql)

-- Mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('015_student_discussions_bookmarks.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
