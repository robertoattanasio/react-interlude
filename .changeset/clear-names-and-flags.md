---
"react-interlude": major
---

Names change so the API reads without ambiguity, and `useInterlude` gets a flag for every common question about the curtain. The lifecycle is the same as 0.2.1. There are no aliases for the 0.x names.

- `InterludeProps` are now the props of `Interlude`. The props of the curtain are `InterludeCurtainProps`.
- The curtain reads `interlude.status` instead of `interlude.phase`, the same name and type as `useInterlude`.
- `Interlude` takes `initialStatus` instead of `initial`.
- `InterludePhase` is removed: use `InterludeStatus`.
- `useInterlude` returns `cycle`, how many times the curtain has covered the page, and the flags `isIdle`, `isEntering`, `isCovered`, `isLeaving`, `isActive`, `isPending`, `isLoading`, `isReloading` and `isReady`.
- `ready` is renamed `isReady`. `first` is removed: use `cycle`, `isPending` or `isLoading`.
- The error thrown by `useInterlude` outside an `Interlude` now reads "useInterlude must be used inside an Interlude.".
- Only the types a consumer needs are exported: `InterludeProps`, `InterludeCurtainProps`, `InterludeStatus` and `InterludeRegister`. `InterludeCurtain`, `InterludeInitial`, `InterludeTiming`, `InterludeMeta`, `InterludeTimeline` and `InterludeValue` are no longer exported.

### Migration

| 0.x                                  | 1.0                                                        |
| ------------------------------------ | ---------------------------------------------------------- |
| `InterludeComponentProps` (provider) | `InterludeProps`                                           |
| `InterludeProps` (curtain)           | `InterludeCurtainProps`                                    |
| `interlude.phase`                    | `interlude.status`                                         |
| `InterludePhase`                     | `InterludeStatus`                                          |
| `initial`                            | `initialStatus`                                            |
| `ready`                              | `isReady`                                                  |
| `first`                              | `initialStatus === "covered" && cycle === 1`               |
| `InterludeCurtain`                   | `ComponentType<InterludeCurtainProps>`                     |
| `InterludeValue`                     | `ReturnType<typeof useInterlude>`                          |
