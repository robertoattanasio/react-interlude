# Curtain

The component you write and pass to `Interlude` as `curtain`. It receives the current status and tells `Interlude` when its animation is over.

```ts
type InterludeCurtainProps<TMeta> = {
  interlude: {
    status: InterludeStatus;
    meta: TMeta;
    done: (event?: SyntheticEvent) => void;
  };
};
```

| Field    |                                                                    |
| -------- | ------------------------------------------------------------------ |
| `status` | `"entering"`, `"covered"`, `"leaving"`, or `"idle"` with `persist` |
| `meta`   | the `meta` passed to `Interlude`                                   |
| `done`   | call it when the `entering` or `leaving` animation ends            |

## Behavior

- `entering` and `leaving` wait for `done`: without it the curtain never moves on.
- `done` acts only on the status it was given for: a call that arrives late, after the status has changed, is ignored.
- Passed an event, `done` ignores it unless it comes from the element that has the handler. Animations of children, bubbling up, don't end the status. With CSS, pass it to `onAnimationEnd` or `onTransitionEnd`. With Motion, call `done()` with no argument from `onAnimationComplete`.
- With `prefers-reduced-motion: reduce`, `entering` and `leaving` are skipped: the curtain goes straight to `covered` and straight to `idle`.
- `covered` needs nothing: the curtain stays until `Interlude` lets it leave.

## Example

```tsx
const Curtain = ({ interlude: { status, done } }: InterludeCurtainProps) => (
  <div className="curtain" data-status={status} onAnimationEnd={done} />
);
```

```css
.curtain {
  position: fixed;
  inset: 0;
  background: black;
}

.curtain[data-status="entering"] {
  animation: curtain-in 600ms both;
}

.curtain[data-status="leaving"] {
  animation: curtain-out 600ms both;
}

@keyframes curtain-in {
  from {
    translate: 0 100%;
  }
}

@keyframes curtain-out {
  to {
    translate: 0 -100%;
  }
}
```
