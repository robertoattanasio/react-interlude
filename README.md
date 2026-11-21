# react-interlude

`react-interlude` helps you coordinate a loading screen in React. It manages when a curtain covers the page and when it can leave, waiting for any data you specify and for a minimum display time. You provide the curtain component and its animation.

Package: [npmjs.com/package/react-interlude](https://www.npmjs.com/package/react-interlude)

Documentation: [dev.robertoattanasio.com/react-interlude](https://dev.robertoattanasio.com/react-interlude)

## Installation

```sh
npm install react-interlude
```

React 19.2 and React DOM 19.2 are required as peer dependencies.

Wrap your app in `Interlude` and pass it a curtain component. In this example, the curtain stays up for at least 800 ms and waits for the page's fonts to load before leaving:

```tsx
import { Interlude } from "react-interlude";

<Interlude curtain={Curtain} hold={800} until={() => document.fonts.ready}>
  <App />
</Interlude>;
```

## API

The guides cover the provider, its hook, and the props your curtain component receives:

- [Interlude](./docs/interlude.md)
- [Curtain](./docs/curtain.md): the component you write
- [useInterlude](./docs/use-interlude.md)
- [Lifecycle](./docs/lifecycle.md): phases, and how the curtain moves between them
- [Meta](./docs/meta.md): typed data for the curtain

## Scripts

For the available project scripts and what they do, see [docs/scripts.md](./docs/scripts.md).

## License

[MIT](./LICENSE)
