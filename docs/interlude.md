# Interlude

The provider. It renders the curtain next to its children and runs the [lifecycle](./lifecycle.md).

```ts
Interlude<TMeta>(props: InterludeComponentProps<TMeta>): JSX.Element
```

| Prop       | Type                                        | Default     |                                                                         |
| ---------- | ------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `curtain`  | `InterludeCurtain<TMeta>`                   | required    | the component that draws the curtain, see [Curtain](./curtain.md)       |
| `initial`  | `"covered" \| "idle"`                       | `"covered"` | whether the page starts covered                                         |
| `hold`     | `number`                                    | `0`         | milliseconds the curtain stays covered at least                         |
| `until`    | `(signal: AbortSignal) => Promise<unknown>` |             | what the curtain waits for before leaving                               |
| `meta`     | `TMeta`                                     |             | data passed to the curtain and to `useInterlude`, see [Meta](./meta.md) |
| `persist`  | `boolean`                                   | `false`     | keeps the curtain mounted while idle                                    |
| `children` | `ReactNode`                                 |             |                                                                         |

## Behavior

- The curtain is rendered before `children`, as a sibling. `Interlude` adds no element of its own.
- While `idle` the curtain is unmounted, unless `persist` is on: then it stays, with `phase: "idle"`.
- With `initial="covered"` the page starts covered and the curtain leaves as soon as `hold` and `until` are done.
- With `initial="idle"` nothing shows until `cover()` is called.
- `hold` is counted from the moment the curtain is fully covered.
- `until` runs each time the curtain is about to leave, with a signal that aborts if `cover()` is called again or `Interlude` unmounts. A rejected `until` is reported with `reportError` and counts as done.
- It's a client component (`"use client"`).

## Types

`InterludeComponentProps`, `InterludeCurtain`, `InterludeProps`, `InterludeInitial`, `InterludeTiming`, `InterludeMeta`, `InterludeRegister`, `InterludePhase`, `InterludeStatus`, `InterludeTimeline`, `InterludeValue`.

## Example

```tsx
<Interlude curtain={Curtain} hold={600} until={() => document.fonts.ready}>
  <App />
</Interlude>
```
