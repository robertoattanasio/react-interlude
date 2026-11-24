import { useCallback, useEffect, useRef } from "react";

import type { InterludeState } from "../types/interlude_reducer.js";

export const useInterludeWaiter = (state: InterludeState, isSettled: boolean) => {
  const waiters = useRef<(() => void)[]>([]);
  const isUnmounted = useRef(false);

  const resolveAll = useCallback(() => {
    for (const resolve of waiters.current.splice(0)) resolve();
  }, []);

  useEffect(() => {
    if (isSettled) resolveAll();
  }, [state, isSettled, resolveAll]);

  useEffect(() => {
    isUnmounted.current = false;

    return () => {
      isUnmounted.current = true;

      queueMicrotask(() => {
        if (isUnmounted.current) resolveAll();
      });
    };
  }, [resolveAll]);

  return useCallback(
    (run: () => void) =>
      new Promise<void>((resolve) => {
        if (isUnmounted.current) return resolve();

        waiters.current.push(resolve);
        run();
      }),
    [],
  );
};
