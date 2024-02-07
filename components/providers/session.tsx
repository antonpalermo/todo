"use client";

import {
  SessionProvider as NextSessionProvider,
  SessionProviderProps as NextSessionProviderProps
} from "next-auth/react";

export interface SessionProviderProps extends NextSessionProviderProps {}

export default function SessionProvider({ ...props }: SessionProviderProps) {
  return <NextSessionProvider {...props} />;
}
