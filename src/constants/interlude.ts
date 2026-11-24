import { createContext } from "react";

import type { InterludeValue } from "../types/interlude.js";

export const INTERLUDE_CONTEXT = createContext<InterludeValue<unknown> | null>(null);

export const INTERLUDE_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
