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

A single `Interlude` can also take the type as a generic: `useInterlude<{ label: string }>()`, `InterludeProps<{ label: string }>`.

## Example

```tsx
<Interlude curtain={Curtain} meta={{ label: "Loading the gallery" }}>
  <Gallery />
</Interlude>
```

```tsx
const Curtain = ({ interlude: { phase, meta, done } }: InterludeProps) => (
  <div data-phase={phase} onAnimationEnd={done}>
    {meta.label}
  </div>
);
```
