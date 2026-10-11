# Vendored Endpoints prototype

This directory contains the unpublished compiler and runtime layer used by
Kitchen AI's DB Endpoints integration. It was copied from TanStack DB commit
`e6715dd55` on `codex/component-endpoints-prototype`.

The branch-only TanStack DB source packages used by the runtime live under
`vendor/tanstack-db`. Keeping both layers in the repository lets clean checkouts
and remote builders reproduce this exact prototype without a developer's local
TanStack DB worktree.
