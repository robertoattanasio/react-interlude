import { useEffect, useEffectEvent, useRef } from "react";
import type { ActionDispatch } from "react";

import { INTERLUDE_REDUCED_MOTION } from "../constants/interlude.js";
import type { InterludeTiming } from "../types/interlude.js";
import type { InterludeAction, InterludeState } from "../types/interlude-reducer.js";

export const useInterludeRelease = (
  { status, target }: InterludeState,
  dispatch: ActionDispatch<[InterludeAction]>,
  { hold = 0, until }: InterludeTiming,
) => {
  const heldUntil = useRef(0);

  const startHold = useEffectEvent(() => {
    heldUntil.current = Date.now() + hold;
  });

  const waitUntil = useEffectEvent(async (signal: AbortSignal) => {
    await Promise.resolve();
    if (signal.aborted) return;

    try {
      await until?.(signal);
    } catch (error) {
      if (!signal.aborted) window.reportError(error);
    }

    if (!signal.aborted) dispatch({ type: "ready" });
  });

  useEffect(() => {
    if (status === "covered") startHold();
  }, [status]);

  useEffect(() => {
    if (status !== "covered" || target !== "idle") return;

    const controller = new AbortController();
    const { signal } = controller;

    const leave = async () => {
      await Promise.all([waitUntil(signal), wait(heldUntil.current - Date.now(), signal)]);

      if (!signal.aborted) dispatch({ type: "leave", reduced: isInterludeReduced() });
    };

    void leave();

    return () => controller.abort();
  }, [status, target, dispatch]);
};

export const isInterludeReduced = () => window.matchMedia(INTERLUDE_REDUCED_MOTION).matches;

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
