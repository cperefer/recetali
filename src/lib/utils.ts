import { Session } from "next-auth";

export function getUserInitial(session: Session): string {
  const displayName = session.user.name || session.user.email || "?";
  return displayName.charAt(0).toUpperCase();
}
