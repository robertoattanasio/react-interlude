"use client";

import { useMemo } from "react";

import { INTERLUDE_CONTEXT } from "../constants/interlude.js";
import { useInterludeTimeline } from "../hooks/use_interlude_timeline.js";
import type { InterludeComponentProps, InterludeMeta } from "../types/interlude.js";

export const Interlude = <TMeta = InterludeMeta,>({
  children,
  curtain: Curtain,
  initial = "covered",
  hold,
  until,
  meta,
  persist,
}: InterludeComponentProps<TMeta>) => {
  const { timeline, done } = useInterludeTimeline(initial, { hold, until });
  const { status } = timeline;

  const value = useMemo(() => ({ ...timeline, meta: meta as TMeta }), [timeline, meta]);

  const curtain = useMemo(
    () => (status === "idle" && !persist ? null : <Curtain interlude={{ phase: status, meta: meta as TMeta, done }} />),
    [Curtain, status, meta, done, persist],
  );

  return (
    <INTERLUDE_CONTEXT value={value}>
      {children}
      {curtain}
    </INTERLUDE_CONTEXT>
  );
};
