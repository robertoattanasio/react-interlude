# useInterlude

Reads the state of the nearest `Interlude`, and covers or uncovers the page.

```ts
useInterlude<TMeta>();
```

| Field         | Type                  |                                                              |
| ------------- | --------------------- | ------------------------------------------------------------ |
| `status`      | `InterludeStatus`     | `"idle"`, `"entering"`, `"covered"` or `"leaving"`           |
| `cycle`       | `number`              | how many times the curtain has covered the page              |
| `isIdle`      | `boolean`             | no curtain on the page                                       |
| `isEntering`  | `boolean`             | the curtain plays its entrance                               |
| `isCovered`   | `boolean`             | the page is covered                                          |
| `isLeaving`   | `boolean`             | the curtain plays its exit                                   |
| `isActive`    | `boolean`             | the curtain is on the page: entering, covered or leaving     |
| `isPending`   | `boolean`             | the page hasn't been shown yet: `true` until the first leave |
| `isLoading`   | `boolean`             | `isActive` in the first cycle                                |
| `isReloading` | `boolean`             | `isActive` in any cycle after the first                      |
| `isReady`     | `boolean`             | `until` has settled on this cycle                            |
| `cover`       | `() => Promise<void>` | covers the page, resolves once it's `covered`                |
| `uncover`     | `() => Promise<void>` | lets the curtain leave, resolves once it's `idle`            |
| `meta`        | `TMeta`               | the `meta` passed to `Interlude`                             |

## Behavior

- Throws outside an `Interlude`.
- `cover()` keeps the curtain on the page until `uncover()` is called, whatever `hold` and `until` say.
- `uncover()` runs `hold` and `until` before the curtain leaves.
- Calling `cover()` while the curtain is leaving turns it around: it enters again.
- Both promises resolve at once if `Interlude` unmounts, so an `await` never hangs.
- `cycle` starts at 1 with `initialStatus="covered"`, the page load, and at 0 with `initialStatus="idle"`. Every `cover()` from `idle` or `leaving` adds one.
- `isReady` turns `false` on every `cover()`, and `true` when `until` settles, resolved or rejected, even while `hold` is still running. Without `until`, it turns `true` as soon as the curtain is free to leave. With `initialStatus="idle"` it's `true` from the start.
- `isPending` turns `false` when the curtain starts to leave for the first time, and never turns back. With `initialStatus="idle"` it's `false` from the start.
- To play the page's animations once the curtain leaves, and replay them after every `cover()`: `animate={isLeaving || isIdle}`. To play them once and keep them after a `cover()`: `animate={!isPending}`.

## Example

```tsx
const { cover, uncover } = useInterlude();

const navigate = async (to: string) => {
  await cover();
  router.navigate(to);
  await uncover();
};
```
