# react-interlude

Cover the screen with your own animated component while your React app gets ready.

I use it for page transitions, first loads and anything else that needs a moment off-screen.

```sh
npm install react-interlude
```

## Usage

The curtain is yours. Animate it however you like and call `done()` when it finishes:

```tsx
const Curtain = ({ interlude }: InterludeProps) => (
  <motion.div
    className="fixed inset-0 bg-black"
    initial={interlude.phase === "covered" ? false : { y: "100%" }}
    animate={{ y: interlude.phase === "leaving" ? "-100%" : "0%" }}
    onAnimationComplete={() => interlude.done()}
  />
);
```

Wrap your app. The page starts covered, then the curtain leaves once it's ready:

```tsx
<Interlude curtain={Curtain} hold={650} until={() => document.fonts.ready}>
  <App />
</Interlude>
```

Need to cover it again later?

```tsx
const { cover, uncover } = useInterlude();

await cover();
await save();
await uncover();
```

## Props

| prop      | what it does                                  |
| --------- | --------------------------------------------- |
| `curtain` | your component                                |
| `hold`    | the minimum time to stay covered, in ms       |
| `until`   | a promise to wait for before leaving          |
| `initial` | `"covered"` (default) or `"idle"`             |
| `meta`    | anything you want to read in the curtain      |

`useInterlude()` also gives you `status`, `ready`, `first` and `meta`.

## License

MIT
