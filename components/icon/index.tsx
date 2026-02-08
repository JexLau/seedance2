"use client";

import * as Ri from "react-icons/ri"; // Remix icons
import { memo, useMemo } from "react";

// Map of prefixes to icon packages - only include what's actually used
const iconPackages: { [key: string]: Record<string, React.ElementType> } = {
  Ri,
};

// Memoize the icon lookup
function getIconComponent(name: string): React.ElementType | null {
  // Extract prefix (first two characters)
  const prefix = name.slice(0, 2);
  const iconPackage = iconPackages[prefix];

  if (iconPackage) {
    return iconPackage[name] || null;
  }
  return null;
}

// Memoized Icon component to prevent unnecessary re-renders
const Icon = memo(function Icon({
  name,
  className,
  onClick,
}: {
  name: string;
  className?: string;
  onClick?: () => void;
}) {
  // useMemo to cache icon lookup based on name
  const IconComponent = useMemo(() => getIconComponent(name), [name]);

  if (!IconComponent) return null;

  return (
    <IconComponent
      className={className}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    />
  );
});

export default Icon;
