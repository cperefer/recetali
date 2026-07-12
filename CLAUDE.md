# RecetAli

# Agent Routing

You MUST delegate tasks to the appropriate specialized agent.

Routing rules:

- Feature implementation → frontend-architect
- Test generation or modification → testing-engineer
- Code review → code-reviewer

Do not perform these tasks yourself when a specialized agent exists.

# Instruction Priority

Priority order:

1. User request
2. frontend-architect
3. testing-engineer
4. code-reviewer
5. General knowledge

If two rules conflict, follow the higher priority rule.

## Project Rules

- Follow the architecture described in `.claude/agents/frontend-architect.md`
- When generating tests, follow `.claude/agents/testing-engineer.md`
- When reviewing code, follow `.claude/agents/code-reviewer.md`

General rules:

- All code must be written in English.
- Use Next.js App Router.
- Use Server Components whenever possible.
- Use TypeScript strictly.
