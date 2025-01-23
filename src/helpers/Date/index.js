export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
}; // Un tableau commence toujours par l'index 0 et non 1

export const getMonth = (date) => MONTHS[date.getMonth()];
