# react-interlude

Loading screens for React. You bring the animation.

Your page starts behind a curtain, and the curtain leaves when everything is ready: fonts, data, whatever you're waiting for. The curtain is a normal component, so it can look and move however you want.

```sh
npm install react-interlude
```

## Usage

Write your curtain and wrap your app with `Interlude`:

```jsx
import { Interlude } from "react-interlude";

const Curtain = ({ interlude }) => (
  <div className="curtain" data-phase={interlude.phase} onTransitionEnd={interlude.done} />
);

function App() {
  return (
    <Interlude curtain={Curtain} until={() => document.fonts.ready}>
      <Page />
    </Interlude>
  );
}
```

```css
.curtain {
  position: fixed;
  inset: 0;
  background: black;
  transition: opacity 0.5s;
}

.curtain[data-phase="leaving"] {
  opacity: 0;
}
```

The curtain gets a `phase`, and calls `done` when its animation ends. That's how it works with CSS, Motion, GSAP or anything else.

To bring it back, use `useInterlude` anywhere inside:

```jsx
const { cover, uncover } = useInterlude();

await cover();
await saveEverything();
await uncover();
```

## Options

| prop      | what it does                                 |
| --------- | -------------------------------------------- |
| `curtain` | your component                               |
| `until`   | what to wait for before leaving              |
| `hold`    | the minimum time to stay covered, in ms      |
| `initial` | `"idle"` to start without the curtain        |
| `meta`    | anything you want to pass to the curtain     |

## License

MIT
