"use client";

import { useContext } from "react";

import { INTERLUDE_CONTEXT } from "../constants/interlude.js";
import type { InterludeMeta, InterludeValue } from "../types/interlude.js";

export const useInterlude = <TMeta = InterludeMeta,>(): InterludeValue<TMeta> => {
  const value = useContext(INTERLUDE_CONTEXT);

  if (!value) throw new Error("useInterlude must be used inside an Interlude.");

  return value as InterludeValue<TMeta>;
};
