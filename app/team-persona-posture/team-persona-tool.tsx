"use client";

import { useEffect, useRef } from "react";
import markup from "./team-persona-markup.json";
import { initializeTeamPersonaTool } from "./team-persona-engine";
import "./team-persona-tool.css";

export function TeamPersonaTool() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    // Reset the static content before attaching the calculator's scoped handlers.
    root.current.innerHTML = markup;
    return initializeTeamPersonaTool(root.current);
  }, []);

  return <div ref={root} className="team-persona-tool" dangerouslySetInnerHTML={{ __html: markup }} />;
}
