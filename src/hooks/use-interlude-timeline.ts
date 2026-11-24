import { useCallback, useMemo, useReducer } from "react";
import type { SyntheticEvent } from "react";

import { interludeReducer, interludeStateFor } from "../reducer/interlude-reducer.js";
import type { InterludeInitial, InterludeTiming } from "../types/interlude.js";
import { isInterludeReduced, useInterludeRelease } from "./use-interlude-release.js";
import { useInterludeWaiter } from "./use-interlude-waiter.js";

export const useInterludeTimeline = (initialStatus: InterludeInitial, timing: InterludeTiming) => {
  const [state, dispatch] = useReducer(interludeReducer, initialStatus, interludeStateFor);
  const { status, ready, pending, cycle } = state;

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

      dispatch({ type: "done", status });
    },
    [status],
  );

  const timeline = useMemo(() => {
    const isActive = status !== "idle";

    return {
      status,
      cycle,
      isIdle: status === "idle",
      isEntering: status === "entering",
      isCovered: status === "covered",
      isLeaving: status === "leaving",
      isActive,
      isPending: pending,
      isLoading: isActive && cycle === 1,
      isReloading: isActive && cycle > 1,
      isReady: ready,
      cover,
      uncover,
    };
  }, [status, cycle, pending, ready, cover, uncover]);

  return { timeline, done };
};
