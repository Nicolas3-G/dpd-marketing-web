export type TeamState = { team: string; secOn: boolean; members: { name: string; p: number; s: number }[] };
export const TEAM_SUBMISSION_KEY = "dpd-team-submission";
export function isSubmittedTeam(value: unknown): value is TeamState {
  if (!value || typeof value !== "object") return false;
  const state = value as TeamState;
  return typeof state.team === "string" && typeof state.secOn === "boolean" &&
    Array.isArray(state.members) && state.members.length > 0 && state.members.every(member =>
      member && typeof member.name === "string" && Number.isInteger(member.p) && member.p >= 0 && member.p <= 2 &&
      Number.isInteger(member.s) && member.s >= -1 && member.s <= 2 && (member.s === -1 || member.s !== member.p));
}
