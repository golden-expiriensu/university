export type SelectGradesDBResponse = {
  userId: number;
  gottenGrades: { grade: number }[];
}[];
