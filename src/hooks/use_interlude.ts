"use client";

import { useContext } from "react";

import { INTERLUDE_STATE_CONTEXT } from "../constants/interlude.js";
import type { InterludeMeta, InterludeStateValue, InterludeValue } from "../types/interlude.js";
import { useInterludeActions } from "./use_interlude_actions.js";

export const useInterlude = <TMeta = InterludeMeta,>(): InterludeValue<TMeta> => {
  const state = useContext(INTERLUDE_STATE_CONTEXT) as InterludeStateValue<TMeta> | null;
  const actions = useInterludeActions();

  if (!state) throw new Error("Not wrapped in Interlude.");

  return { ...state, ...actions };
};
