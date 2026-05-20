/** Libellés d'affichage unifiés (indépendants de la source / marque). */
export const METRIC_LABELS: Record<string, string> = {
  steps: "Pas",
  calories: "Calories",
  active_calories: "Calories actives",
  heart_rate: "Fréquence cardiaque",
  resting_heart_rate: "FC au repos",
  sleep: "Sommeil",
  weight: "Poids",
  body_fat: "Masse grasse",
  distance: "Distance",
  vo2_max: "VO₂ max",
  water: "Hydratation",
  protein: "Protéines",
  carbs: "Glucides",
  fat: "Lipides",
  bmi: "IMC",
  muscle_mass: "Masse musculaire",
};

export function getMetricLabel(type: string): string {
  return METRIC_LABELS[type] ?? type.replace(/_/g, " ");
}
