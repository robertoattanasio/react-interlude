import type { ComponentType, ReactNode, SyntheticEvent } from "react";

export type InterludeStatus = "idle" | "entering" | "covered" | "leaving";

export type InterludeInitial = "covered" | "idle";

export interface InterludeRegister {}

export type InterludeMeta = InterludeRegister extends { meta: infer TMeta } ? TMeta : undefined;

export type InterludeCurtainProps<TMeta = InterludeMeta> = {
  interlude: {
    status: InterludeStatus;
    meta: TMeta;
    done: (event?: SyntheticEvent) => void;
  };
};

export type InterludeCurtain<TMeta = InterludeMeta> = ComponentType<InterludeCurtainProps<TMeta>>;

export type InterludeTiming = {
  hold?: number;
  until?: (signal: AbortSignal) => Promise<unknown>;
};

export type InterludeProps<TMeta = InterludeMeta> = InterludeTiming & {
  children?: ReactNode;
  curtain: InterludeCurtain<TMeta>;
  initialStatus?: InterludeInitial;
  meta?: TMeta;
  persist?: boolean;
};

export type InterludeTimeline = {
  status: InterludeStatus;
  cycle: number;
  isIdle: boolean;
  isEntering: boolean;
  isCovered: boolean;
  isLeaving: boolean;
  isActive: boolean;
  isPending: boolean;
  isLoading: boolean;
  isReloading: boolean;
  isReady: boolean;
  cover: () => Promise<void>;
  uncover: () => Promise<void>;
};

export type InterludeValue<TMeta = InterludeMeta> = InterludeTimeline & {
  meta: TMeta;
};
