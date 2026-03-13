# Contributing to Clowder AI

Thank you for your interest in contributing to Clowder AI! This guide will help you get started.

## For Beta Testers (Internal Preview)

You have **Read** access to this repo. Here's how to contribute:

### Step-by-step: Submit a PR

```bash
# 1. Fork this repo (click "Fork" button on GitHub, or use gh cli)
gh repo fork zts212653/clowder-ai --clone
cd clowder-ai

# 2. Create a feature branch
git checkout -b feat/your-feature-name

# 3. Install and verify
pnpm install
pnpm check

# 4. Make your changes, then run checks
pnpm check          # Biome lint
pnpm lint           # TypeScript type check
pnpm --filter @cat-cafe/api run test:public  # Public test suite

# 5. Commit and push to YOUR fork
git add -A
git commit -m "feat(scope): description of your change"
git push origin feat/your-feature-name

# 6. Open a PR from your fork → zts212653/clowder-ai main
gh pr create --repo zts212653/clowder-ai
```

### Report bugs or suggest features

- Open an [Issue](https://github.com/zts212653/clowder-ai/issues) — please include reproduction steps for bugs
- Check [pinned issues](https://github.com/zts212653/clowder-ai/issues) for current focus areas

### What you CAN do with Read access

- Clone, pull, and read all code
- Fork and submit Pull Requests
- Open and comment on Issues
- Participate in Discussions

### Runtime ports

The default ports are `3003` (API) and `3004` (Frontend). See [SETUP.md](SETUP.md) for full configuration.

---

## Code of Conduct

Be respectful, constructive, and collaborative. We welcome contributors of all experience levels.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Redis 7+ (for full test suite; basic tests work without it)
- At least one AI provider API key (Anthropic, OpenAI, or Google)

### Development Setup

See [SETUP.md](SETUP.md) for the full runtime configuration matrix, optional integrations, and design tooling requirements.

```bash
# Clone the repository
git clone https://github.com/zts212653/clowder-ai.git
cd clowder-ai

# Install dependencies
pnpm install

# Build shared packages (required before other packages)
pnpm --filter @cat-cafe/shared build

# Run the public test suite
pnpm --filter @cat-cafe/api run test:public

# Run lint checks
pnpm check
```

### Project Structure

| Directory | Purpose |
|-----------|---------|
| `packages/api/` | Backend API server (agent routing, MCP, sessions) |
| `packages/web/` | Frontend Mission Hub (Next.js) |
| `packages/shared/` | Shared TypeScript types and utilities |
| `packages/mcp-server/` | MCP server for agent tool integration |
| `cat-cafe-skills/` | Modular skill definitions |
| `scripts/` | Development and build utilities |

### After Modifying `packages/shared`

Always rebuild shared types after changes:

```bash
pnpm --filter @cat-cafe/shared build
```

Other packages depend on the compiled `.d.ts` files.

## Submitting Changes

### Pull Request Process

1. **Fork** the repository and create a feature branch
2. **Write tests** for new functionality (we practice TDD)
3. **Run quality checks** before submitting:
   ```bash
   pnpm check          # Lint (Biome)
   pnpm -r build       # Build all packages
   pnpm --filter @cat-cafe/api run test:public  # Public test suite
   ```
4. **Open a PR** with a clear description of what and why
5. **Wait for review** — at least one maintainer review is required

### PR Guidelines

- **Title**: Use conventional commits format: `feat(scope):`, `fix(scope):`, `docs:`, etc.
- **Description**: Explain what changed and why. Link to relevant issues.
- **Tests**: New features must include tests. Bug fixes should include a regression test.
- **Size**: Prefer small, focused PRs over large ones.

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(api): add webhook support for external notifications
fix(web): resolve thread sidebar scroll position on reload
docs: update Quick Start with Redis configuration
test(api): add coverage for concurrent session creation
```

## Code Quality Standards

### Hard Requirements

- **No `any` type** in TypeScript (use `unknown` + type guards)
- **File size**: 200 lines warning, 350 lines hard limit
- **Directory size**: 15 files warning, 25 files hard limit
- **New features must have tests**
- **Biome lint must pass** (`pnpm check`)

### Style

- We use [Biome](https://biomejs.dev/) for linting and formatting
- Run `pnpm check:fix` to auto-fix most issues
- TypeScript strict mode is enabled

## Path Ownership

Different parts of the codebase have different contribution expectations:

| Path | Ownership | PR Requirements |
|------|-----------|----------------|
| `packages/api/src/` | Core | 2 reviewer approvals |
| `packages/web/src/` | Core | 1 reviewer approval |
| `packages/shared/` | Core | 2 reviewer approvals (affects all packages) |
| `cat-cafe-skills/` | Core | 1 reviewer + skill test validation |
| `scripts/` | Utility | 1 reviewer approval |
| `docs/` | Community | 1 reviewer approval |

## Reporting Issues

- Use GitHub Issues for bug reports and feature requests
- Include reproduction steps for bugs
- For security vulnerabilities, see [SECURITY.md](SECURITY.md)

## Questions?

Open a [Discussion](https://github.com/zts212653/clowder-ai/discussions) for questions, ideas, or general conversation.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
