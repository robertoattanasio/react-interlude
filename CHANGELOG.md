# react-interlude

## 1.0.0
### Major Changes

- 7c8bbc5: Names change so the API reads without ambiguity, and `useInterlude` gets a flag for every common question about the curtain. The lifecycle is the same as 0.2.1. There are no aliases for the 0.x names.
  
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

## 0.2.1

The curtain is rendered before the children, so server-rendered HTML streams it first and it covers the page from the first paint on slow connections.

## 0.2.0

New `persist` prop: the curtain stays mounted when the interlude is idle, and gets `phase` set to `"idle"`. Because of this, `interlude.phase` can now be `"idle"` too.

## 0.1.0

First release. It starts from the code of `react-scrim` 3.0.0-unstable.1, renamed: `react-scrim` stays on 2.x for the people using it.
