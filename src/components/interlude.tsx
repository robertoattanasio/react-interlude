"use client";

import { useMemo } from "react";

import { INTERLUDE_ACTIONS_CONTEXT, INTERLUDE_STATE_CONTEXT } from "../constants/interlude.js";
import { useInterludeTimeline } from "../hooks/use_interlude_timeline.js";
import type { InterludeComponentProps, InterludeMeta } from "../types/interlude.js";

export const Interlude = <TMeta = InterludeMeta,>({
  children,
  curtain: Curtain,
  initial = "covered",
  hold,
  until,
  meta,
}: InterludeComponentProps<TMeta>) => {
  const { timeline, actions, done } = useInterludeTimeline(initial, { hold, until });
  const { status } = timeline;

  const state = useMemo(() => ({ ...timeline, meta: meta as TMeta }), [timeline, meta]);

  const curtain = useMemo(
    () => (status === "idle" ? null : <Curtain interlude={{ phase: status, meta: meta as TMeta, done }} />),
    [Curtain, status, meta, done],
  );

  return (
    <INTERLUDE_ACTIONS_CONTEXT value={actions}>
      <INTERLUDE_STATE_CONTEXT value={state}>
        {children}
        {curtain}
      </INTERLUDE_STATE_CONTEXT>
    </INTERLUDE_ACTIONS_CONTEXT>
  );
};
