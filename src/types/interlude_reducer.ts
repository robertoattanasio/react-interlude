import type { InterludeStatus } from "./interlude.js";

export type InterludeState = {
  status: InterludeStatus;
  target: "covered" | "idle";
  ready: boolean;
  first: boolean;
};

export type InterludeAction =
  | { type: "cover"; reduced: boolean }
  | { type: "leave"; reduced: boolean }
  | { type: "uncover" }
  | { type: "ready" }
  | { type: "done"; phase: InterludeStatus };
