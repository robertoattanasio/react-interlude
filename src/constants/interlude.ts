import { createContext } from "react";

import type { InterludeActions, InterludeStateValue } from "../types/interlude.js";

export const INTERLUDE_STATE_CONTEXT = createContext<InterludeStateValue<any> | null>(null);

export const INTERLUDE_ACTIONS_CONTEXT = createContext<InterludeActions | null>(null);

export const INTERLUDE_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
