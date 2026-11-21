# Lifecycle

## Phases

| Status     | The curtain                          |
| ---------- | ------------------------------------ |
| `idle`     | unmounted, or mounted with `persist` |
| `entering` | animating in, until it calls `done`  |
| `covered`  | covering the page                    |
| `leaving`  | animating out, until it calls `done` |

## Transitions

| From       | Event                                                       | To         |
| ---------- | ----------------------------------------------------------- | ---------- |
| `idle`     | `cover()`                                                   | `entering` |
| `entering` | `done`                                                      | `covered`  |
| `covered`  | `hold` and `until` are done, and no `cover()` is holding it | `leaving`  |
| `leaving`  | `done`                                                      | `idle`     |
| `leaving`  | `cover()`                                                   | `entering` |

With `initial="covered"`, the page starts in `covered` and leaves on its own. With reduced motion, `entering` and `leaving` are skipped.

## Leaving

The curtain leaves when both are done:

- `hold`: the milliseconds since the curtain became `covered`.
- `until`: the promise it returns, called with an `AbortSignal`.

`ready` turns `true` as soon as `until` resolves, even while `hold` is still running. The signal aborts when `cover()` is called again or `Interlude` unmounts.
