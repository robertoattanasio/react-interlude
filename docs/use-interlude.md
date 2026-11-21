# useInterlude

Reads the state of the nearest `Interlude`, and covers or uncovers the page.

```ts
useInterlude<TMeta>(): InterludeValue<TMeta>
```

| Field     | Type                  |                                                    |
| --------- | --------------------- | -------------------------------------------------- |
| `status`  | `InterludeStatus`     | `"idle"`, `"entering"`, `"covered"` or `"leaving"` |
| `ready`   | `boolean`             | `false` from `cover()` until `until` has resolved  |
| `first`   | `boolean`             | `true` during the cover the page started with      |
| `cover`   | `() => Promise<void>` | covers the page, resolves once it's `covered`      |
| `uncover` | `() => Promise<void>` | lets the curtain leave, resolves once it's `idle`  |
| `meta`    | `TMeta`               | the `meta` passed to `Interlude`                   |

## Behavior

- Throws outside an `Interlude`.
- `cover()` keeps the curtain on the page until `uncover()` is called, whatever `hold` and `until` say.
- `uncover()` runs `hold` and `until` before the curtain leaves.
- Calling `cover()` while the curtain is leaving turns it around: it enters again.
- Both promises resolve at once if `Interlude` unmounts, so an `await` never hangs.
- `first` lets the first cover differ from the next ones, such as an intro played only on load.

## Example

```tsx
const { cover, uncover } = useInterlude();

const navigate = async (to: string) => {
  await cover();
  router.navigate(to);
  await uncover();
};
```
