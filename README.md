# react-interlude

Cover the screen with your own animated component while your React app gets ready. The curtain is your component and your animation: the library only tells it when to come in and when to leave.

I built it for page transitions, but it works for anything that has to hide the screen for a moment: a first load, a global operation, a theme that needs its fonts.

## Install

```sh
npm install react-interlude
```

It needs React 19.2 or later.

## Usage

Write a curtain. It gets its `phase` and calls `done()` when its animation ends:

```tsx
import type { InterludeProps } from "react-interlude";

const Curtain = ({ interlude }: InterludeProps) => (
  <motion.div
    className="fixed inset-0 bg-black"
    initial={interlude.phase === "covered" ? false : { y: "100%" }}
    animate={{ y: interlude.phase === "leaving" ? "-100%" : "0%" }}
    onAnimationComplete={() => interlude.done()}
  />
);
```

Wrap what it covers. By default it starts covered, so the first paint is already hidden, then it leaves on its own:

```tsx
<Interlude curtain={Curtain} hold={650} until={() => document.fonts.ready}>
  <App />
</Interlude>
```

Cover and uncover whenever you need to, from any component inside it:

```tsx
const { cover, uncover } = useInterlude();

await cover();
await save();
await uncover();
```

## How it works

An interlude goes through `entering`, `covered`, `leaving` and `idle`. The curtain is on screen in every phase except `idle`.

react-interlude doesn't know how long your animations take. It waits for `done()`, so CSS, Motion, GSAP and the Web Animations API all work. On `covered` no animation is needed, and with `prefers-reduced-motion` it skips `entering` and `leaving`.

A `cover()` during `leaving` sends the same curtain back. `cover` and `uncover` resolve when their phase is reached, or when `Interlude` unmounts.

## API

### `<Interlude>`

| prop       | what it does                                                                      |
| ---------- | --------------------------------------------------------------------------------- |
| `curtain`  | your component                                                                    |
| `initial`  | `"covered"` (default) or `"idle"`                                                 |
| `hold`     | minimum time in milliseconds to stay covered, counted from `covered`              |
| `until`    | a function returning a promise to wait for before leaving. It gets an `AbortSignal` |
| `meta`     | your own data, passed to the curtain and to `useInterlude`                        |

If `until` rejects, the error goes to `reportError` and the curtain leaves anyway. Keep `meta` outside the component: an inline object updates every consumer on each render.

### `useInterlude()`

Returns `{ status, ready, first, meta, cover, uncover }`.

- `status` is the phase, or `"idle"`.
- `ready` turns `true` once `until` has resolved, before `hold` has ended.
- `first` is `true` while the curtain on screen is the initial one.

### The curtain

A curtain receives `interlude.phase`, `interlude.meta` and `interlude.done`.

## Typing `meta`

Declare it once for the whole app, and `useInterlude` and `InterludeProps` need no generic:

```ts
declare module "react-interlude" {
  interface InterludeRegister {
    meta: { duration: number };
  }
}
```

It's optional. Without it, pass a generic where you read `meta`: `useInterlude<MyMeta>()`.

## License

MIT
