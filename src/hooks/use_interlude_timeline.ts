import { useCallback, useMemo, useReducer } from "react";
import type { SyntheticEvent } from "react";

import { interludeReducer, interludeStateFor } from "../reducer/interlude_reducer.js";
import type { InterludeInitial, InterludeTiming } from "../types/interlude.js";
import { isInterludeReduced, useInterludeRelease } from "./use_interlude_release.js";
import { useInterludeWaiter } from "./use_interlude_waiter.js";

export const useInterludeTimeline = (initial: InterludeInitial, timing: InterludeTiming) => {
  const [state, dispatch] = useReducer(interludeReducer, initial, interludeStateFor);
  const { status, ready, first } = state;

  const waitCovered = useInterludeWaiter(state, status === "covered");
  const waitIdle = useInterludeWaiter(state, status === "idle");

  useInterludeRelease(state, dispatch, timing);

  const cover = useCallback(
    () => waitCovered(() => dispatch({ type: "cover", reduced: isInterludeReduced() })),
    [waitCovered],
  );

  const uncover = useCallback(() => waitIdle(() => dispatch({ type: "uncover" })), [waitIdle]);

  const done = useCallback(
    (event?: SyntheticEvent) => {
      if (event && event.target !== event.currentTarget) return;

      dispatch({ type: "done", phase: status });
    },
    [status],
  );

  const timeline = useMemo(() => ({ status, ready, first, cover, uncover }), [status, ready, first, cover, uncover]);

  return { timeline, done };
};
