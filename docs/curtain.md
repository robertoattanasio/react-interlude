# Curtain

The component you write and pass to `Interlude` as `curtain`. It receives the current phase and tells `Interlude` when its animation is over.

```ts
type InterludeCurtain<TMeta> = ComponentType<InterludeProps<TMeta>>;

type InterludeProps<TMeta> = {
  interlude: {
    phase: InterludeStatus;
    meta: TMeta;
    done: (event?: SyntheticEvent) => void;
  };
};
```

| Field   |                                                                    |
| ------- | ------------------------------------------------------------------ |
| `phase` | `"entering"`, `"covered"`, `"leaving"`, or `"idle"` with `persist` |
| `meta`  | the `meta` passed to `Interlude`                                   |
| `done`  | call it when the `entering` or `leaving` animation ends            |

## Behavior

- `entering` and `leaving` wait for `done`: without it the curtain never moves on.
- `done` acts only on the phase it was given for: a call that arrives late, after the phase has changed, is ignored.
- Passed an event, `done` ignores it unless it comes from the element that has the handler. Animations of children, bubbling up, don't end the phase.
- With `prefers-reduced-motion: reduce`, `entering` and `leaving` are skipped: the curtain goes straight to `covered` and straight to unmounted.
- `covered` needs nothing: the curtain stays until `Interlude` lets it leave.

## Example

```tsx
const Curtain = ({ interlude: { phase, done } }: InterludeProps) => (
  <div className="curtain" data-phase={phase} onAnimationEnd={done} />
);
```

```css
.curtain {
  position: fixed;
  inset: 0;
  background: black;
}

.curtain[data-phase="entering"] {
  animation: curtain-in 600ms both;
}

.curtain[data-phase="leaving"] {
  animation: curtain-out 600ms both;
}
```
