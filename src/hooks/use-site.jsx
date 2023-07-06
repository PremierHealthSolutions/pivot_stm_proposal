import { useContext, createContext, useState } from "react";

export const SiteContext = createContext();

/**
 * useSiteState
 */

export function useSiteState() {
  const [duration, setDuration] = useState(1);
  const [maxOOP, setMaxOOP] = useState(5000);
  const [maxCoverage, setMaxCoverage] = useState(500000);
  return {
    duration,
    setDuration,
    maxOOP,
    setMaxOOP,
    maxCoverage,
    setMaxCoverage,
  };
}

/**
 * useSiteContext
 */

export function useSiteContext(data) {
  const site = useSiteState();
  return {
    ...site,
    ...data,
  };
}

/**
 * useSite
 */

export default function useSite() {
  const site = useContext(SiteContext);
  return {
    ...site,
  };
}
