export type Project = {
  id: string;
  title: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  tech: string[];
  live?: string;
  github?: string;
  flagship?: boolean;
  team?: string;
  icon: string;
};

export type SkillGroup = {
  label: string;
  icon: string;
  skills: string[];
};

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  desc: string;
};

export type CommunityRole = {
  org: string;
  orgFull: string;
  role: string;
  url?: string;
  points: string[];
};
