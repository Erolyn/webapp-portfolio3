import config from "../../../config";
import { ExperienceProps } from "../../../types";

// Fetch Experiences
export async function fetchExperienceData(): Promise<ExperienceProps[]> {
  try {
    const res = await fetch(`${config.apiAddress}:${config.apiPort}/experiences`);
    const data: ExperienceProps[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
}