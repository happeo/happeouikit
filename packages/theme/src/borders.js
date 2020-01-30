import * as colors from "@happeokit/colors";

export const border = type => {
  switch (type) {
    case "gray":
      return `1px solid ${colors["gray06"]}`;
    case "disabled":
      return `1px solid ${colors["gray08"]}`;
    default:
      return `1px solid ${colors[type] || type}`;
  }
};
