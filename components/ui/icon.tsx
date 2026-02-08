/**
 * @deprecated This component imports the entire lucide-react icons bundle.
 * Import icons directly instead: import { IconName } from "lucide-react"
 *
 * This file is unused and should be deleted to reduce bundle size.
 */
import { icons } from "lucide-react";

export const Icon = ({
  name,
  color,
  size,
  className,
}: {
  name: keyof typeof icons;
  color: string;
  size: number;
  className?: string;
}) => {
  const LucideIcon = icons[name as keyof typeof icons];

  return <LucideIcon color={color} size={size} className={className} />;
};
