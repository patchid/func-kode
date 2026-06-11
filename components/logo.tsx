"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({ width = 36, height = 32, className = "object-contain", priority = false }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a blank/loading placeholder or a fallback with matching layout during SSR to avoid mismatch hydration errors
  const isLight = mounted && resolvedTheme === "light";
  const src = isLight ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <Image
      src={src}
      alt="func(Kode) Logo"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
