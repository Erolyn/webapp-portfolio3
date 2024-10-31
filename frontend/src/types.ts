export type ExperienceProps = {
  id: string; // UUIDs are stored as strings
  title: string;
  description: string;
};

export type ExperiencesProps = {
  experiences: ExperienceProps[];
};

export type StudentProps = {
  name: string;
  degree: string;
  points: number;
  email: string;
};


export type UUID = ReturnType<typeof crypto.randomUUID>;
export type Action = "add" | "delete";