"use client";

import { useContext } from "react";

import { INTERLUDE_ACTIONS_CONTEXT } from "../constants/interlude.js";

export const useInterludeActions = () => {
  const actions = useContext(INTERLUDE_ACTIONS_CONTEXT);

  if (!actions) throw new Error("Not wrapped in Interlude.");

  return actions;
};
