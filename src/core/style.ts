import chalk from "chalk";
type ChalkStyle = typeof chalk;

export const ApplyColor = (style: ChalkStyle, color: string): ChalkStyle => {
  const colorFn = style[color as keyof ChalkStyle];
  return typeof colorFn === "function" ? (colorFn as ChalkStyle) : style;
};
