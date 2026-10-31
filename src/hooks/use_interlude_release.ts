import { useEffect, useEffectEvent, useRef } from "react";
import type { ActionDispatch } from "react";

import { INTERLUDE_REDUCED_MOTION } from "../constants/interlude.js";
import type { InterludeTiming } from "../types/interlude.js";
import type { InterludeAction, InterludeState } from "../types/interlude_reducer.js";

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    const timer = window.setTimeout(resolve, ms);

    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });

export const isInterludeReduced = () => window.matchMedia(INTERLUDE_REDUCED_MOTION).matches;

export const useInterludeRelease = (
  { status, target }: InterludeState,
  dispatch: ActionDispatch<[InterludeAction]>,
  { hold = 0, until }: InterludeTiming,
) => {
  const heldUntil = useRef(0);

  const startHold = useEffectEvent(() => {
    heldUntil.current = Date.now() + hold;
  });

  const settle = useEffectEvent((signal: AbortSignal, onReady: () => void) =>
    Promise.allSettled([
      Promise.resolve()
        .then(() => (signal.aborted ? undefined : until?.(signal)))
        .catch((error: unknown) => {
          if (!signal.aborted) window.reportError(error);
        })
        .finally(onReady),
      wait(heldUntil.current - Date.now(), signal),
    ]),
  );

  useEffect(() => {
    if (status === "covered") startHold();
  }, [status]);

  useEffect(() => {
    if (status !== "covered" || target !== "idle") return;

    const controller = new AbortController();
    const { signal } = controller;

    void settle(signal, () => {
      if (!signal.aborted) dispatch({ type: "ready" });
    }).then(() => {
      if (!signal.aborted) dispatch({ type: "leave", reduced: isInterludeReduced() });
    });

    return () => controller.abort();
  }, [status, target, dispatch]);
};
