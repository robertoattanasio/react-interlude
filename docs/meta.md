# Meta

Data you pass to `Interlude` as `meta`, read by the curtain as `interlude.meta` and by `useInterlude` as `meta`.

## Typing

By default `meta` is `undefined`. Register its type once, and every curtain and every `useInterlude` gets it:

```ts
declare module "react-interlude" {
  interface InterludeRegister {
    meta: { label: string };
  }
}
```

A single `Interlude` can also take the type as a generic: `useInterlude<{ label: string }>()`, `InterludeCurtainProps<{ label: string }>`.

## Example

```tsx
const META = { label: "Loading the gallery" };

<Interlude curtain={Curtain} meta={META}>
  <Gallery />
</Interlude>;
```

Keep `meta` stable, a constant or a memoized object: a new object on every render re-renders the curtain and every component that reads `useInterlude`.

```tsx
const Curtain = ({ interlude: { status, meta, done } }: InterludeCurtainProps) => (
  <div data-status={status} onAnimationEnd={done}>
    {meta.label}
  </div>
);
```
