"use client";

import { useMemo } from "react";

import { INTERLUDE_CONTEXT } from "../constants/interlude.js";
import { useInterludeTimeline } from "../hooks/use-interlude-timeline.js";
import type { InterludeMeta, InterludeProps } from "../types/interlude.js";

export const Interlude = <TMeta = InterludeMeta,>({
  children,
  curtain: Curtain,
  initialStatus = "covered",
  hold,
  until,
  meta,
  persist,
}: InterludeProps<TMeta>) => {
  const { timeline, done } = useInterludeTimeline(initialStatus, { hold, until });
  const { status } = timeline;

  const value = useMemo(() => ({ ...timeline, meta: meta as TMeta }), [timeline, meta]);

  const curtain = useMemo(
    () => (status === "idle" && !persist ? null : <Curtain interlude={{ status, meta: meta as TMeta, done }} />),
    [Curtain, status, meta, done, persist],
  );

  return (
    <INTERLUDE_CONTEXT value={value}>
      {curtain}
      {children}
    </INTERLUDE_CONTEXT>
  );
};
