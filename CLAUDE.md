# react-interlude

Loading screens for React: it decides when a curtain covers the page and when it leaves, the curtain's animation is the consumer's. Public package on npm.

## Docs

- [README.md](./README.md): install, links to the docs.
- [docs/](./docs/): [interlude.md](./docs/interlude.md), [curtain.md](./docs/curtain.md), [use-interlude.md](./docs/use-interlude.md), [lifecycle.md](./docs/lifecycle.md), [meta.md](./docs/meta.md), plus [scripts.md](./docs/scripts.md) and [release.md](./docs/release.md).

Read the relevant doc before changing the package. When a prop, a phase or a transition changes, update its doc in the same change.

## Structure

```
src/
  index.ts                        the only barrel
  components/interlude.tsx        the provider
  constants/interlude.ts          the context, the reduced motion query
  hooks/
    use_interlude.ts              the public hook
    use_interlude_timeline.ts     state, cover, uncover, done
    use_interlude_release.ts      hold and until, then leave
    use_interlude_waiter.ts       the promises of cover and uncover
  reducer/interlude_reducer.ts    the state machine
  types/
    interlude.ts                  public types
    interlude_reducer.ts          state and actions
```

## State

- `status` is what the curtain shows, `target` is where it's going: `covered` or `idle`.
- Every change goes through `interludeReducer`. Hooks dispatch actions, never set state.
- The release effect runs only while `status` is `covered` and `target` is `idle`. Its `AbortController` is aborted by the cleanup.
- `done` carries the phase it was created for: the reducer ignores it if the phase has changed.
- Reduced motion is read when `cover` and `leave` are dispatched, and skips `entering` and `leaving`.
- The promises of `cover` and `uncover` resolve when the status settles, or when `Interlude` unmounts.

## Conventions

- The package draws nothing: no element, no style, no animation. The curtain is the consumer's.
- Public types are prefixed `Interlude`. `meta` is typed through `InterludeRegister` module augmentation.
- Constants are UPPER_SNAKE_CASE, prefixed `INTERLUDE_`.
- Files that run in the browser are `"use client"`.
- Relative imports end in `.js`, types are imported with `import type`.
- React 19.2 is needed for `useEffectEvent`. React and React DOM are peer dependencies, no other dependencies.
- No comments in the code unless asked.
