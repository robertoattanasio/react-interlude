import type { ComponentType, ReactNode, SyntheticEvent } from "react";

export type InterludePhase = "entering" | "covered" | "leaving";

export type InterludeStatus = InterludePhase | "idle";

export type InterludeInitial = "covered" | "idle";

export interface InterludeRegister {}

export type InterludeMeta = InterludeRegister extends { meta: infer TMeta } ? TMeta : undefined;

export type InterludeDone = (event?: SyntheticEvent) => void;

export type InterludeProps<TMeta = InterludeMeta> = {
  interlude: {
    phase: InterludeStatus;
    meta: TMeta;
    done: InterludeDone;
  };
};

export type InterludeCurtain<TMeta = InterludeMeta> = ComponentType<InterludeProps<TMeta>>;

export type InterludeTiming = {
  hold?: number;
  until?: (signal: AbortSignal) => Promise<unknown>;
};

export type InterludeComponentProps<TMeta = InterludeMeta> = InterludeTiming & {
  children?: ReactNode;
  curtain: InterludeCurtain<TMeta>;
  initial?: InterludeInitial;
  meta?: TMeta;
  persist?: boolean;
};

export type InterludeTimeline = {
  status: InterludeStatus;
  ready: boolean;
  first: boolean;
  cover: () => Promise<void>;
  uncover: () => Promise<void>;
};

export type InterludeValue<TMeta = InterludeMeta> = InterludeTimeline & {
  meta: TMeta;
};
