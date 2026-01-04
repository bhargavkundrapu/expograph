#!/usr/bin/env bash
set -euo pipefail

# Run from repo root: expograph/

mkd() { mkdir -p "$1"; }

mkf() {
  local f="$1"
  if [[ -e "$f" ]]; then
    return 0
  fi
  mkdir -p "$(dirname "$f")"
  : > "$f"
}

# ---- repo top-level ----
mkd "apps/web"
mkd "apps/api"
mkd "packages/shared"
mkd "docs"
mkd "scripts"

mkf "packages/shared/README.md"
mkf "docs/README.md"
mkf "scripts/README.md"

# ---- web structure ----
mkd "apps/web/src/app/routes"
mkd "apps/web/src/app/layouts"
mkd "apps/web/src/app/providers"

mkd "apps/web/src/pages/academy"
mkd "apps/web/src/pages/solutions"
mkd "apps/web/src/pages/auth"
mkd "apps/web/src/pages/lms"
mkd "apps/web/src/pages/admin"
mkd "apps/web/src/pages/mentor"

mkd "apps/web/src/features/auth"
mkd "apps/web/src/features/tenant"
mkd "apps/web/src/features/courses"
mkd "apps/web/src/features/lessons"
mkd "apps/web/src/features/practice"
mkd "apps/web/src/features/progress"
mkd "apps/web/src/features/code-vault"
mkd "apps/web/src/features/launchpad"
mkd "apps/web/src/features/micro-internships"
mkd "apps/web/src/features/client-lab"
mkd "apps/web/src/features/settings"

mkd "apps/web/src/components/ui"
mkd "apps/web/src/components/common"

mkd "apps/web/src/services/api"
mkd "apps/web/src/services/storage"

mkd "apps/web/src/styles"
mkd "apps/web/src/assets"

# Add tiny placeholders so folders appear in git (optional)
mkf "apps/web/src/app/routes/README.md"
mkf "apps/web/src/app/layouts/README.md"
mkf "apps/web/src/app/providers/README.md"

# ---- api structure ----
mkd "apps/api/src/server"
mkd "apps/api/src/config"
mkd "apps/api/src/db"
mkd "apps/api/src/middlewares/auth"
mkd "apps/api/src/middlewares/tenant"
mkd "apps/api/src/middlewares/rbac"
mkd "apps/api/src/middlewares/rate-limit"
mkd "apps/api/src/middlewares/error-handler"

mkd "apps/api/src/modules/auth"
mkd "apps/api/src/modules/tenants"
mkd "apps/api/src/modules/users"
mkd "apps/api/src/modules/rbac"
mkd "apps/api/src/modules/content"
mkd "apps/api/src/modules/progress"
mkd "apps/api/src/modules/practice"
mkd "apps/api/src/modules/submissions"
mkd "apps/api/src/modules/code-vault"
mkd "apps/api/src/modules/micro-internships"
mkd "apps/api/src/modules/client-lab"
mkd "apps/api/src/modules/billing"
mkd "apps/api/src/modules/notifications"
mkd "apps/api/src/modules/audit"
mkd "apps/api/src/modules/feature-flags"
mkd "apps/api/src/modules/media"

mkd "apps/api/src/utils"
mkd "apps/api/src/jobs"

mkf "apps/api/src/server/README.md"
mkf "apps/api/src/modules/README.md"

echo "✅ Scaffold complete (no existing files overwritten)."
