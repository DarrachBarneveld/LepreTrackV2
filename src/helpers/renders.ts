import guardian from "../assets/images/guardians/earth-guardian.png";
import terra from "../assets/images/guardians/terra-tormentor.png";
import balance from "../assets/images/guardians/balanced-footprint.png";
import fingers from "../assets/images/guardians/green-finger.png";

export function renderUserBadge(score: number): {
  guardian: string;
  guardianName: string;
} {
  if (score <= 100) {
    return { guardian: terra, guardianName: "Terra's Tormentor" };
  } else if (score <= 200) {
    return { guardian: balance, guardianName: "Balanced Footprint" };
  } else if (score <= 300) {
    return { guardian: fingers, guardianName: "Green Fingers" };
  } else return { guardian, guardianName: "Earth Guardian" };
}
