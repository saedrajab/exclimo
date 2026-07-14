"use client";

/**
 * Hover-animated Lucide-style icons in the manner of animateicons.in.
 * Icons animate when the surrounding <IconHover> area is hovered or focused,
 * and stay still when the user prefers reduced motion.
 */

import { createContext, useContext, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Briefcase,
  Landmark,
  Mail,
  MapPin,
  Phone,
  PlaneTakeoff,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/content";

const HoverContext = createContext(false);

export function IconHover({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <HoverContext.Provider value={active}>{children}</HoverContext.Provider>
    </div>
  );
}

function useIconState() {
  const hovered = useContext(HoverContext);
  const reduce = useReducedMotion();
  return hovered && !reduce ? "animate" : "normal";
}

export type AnimatedIconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

function createMotionIcon(Icon: LucideIcon, variants: Variants) {
  function MotionIcon({ size = 28, className, strokeWidth = 1.75 }: AnimatedIconProps) {
    const state = useIconState();
    return (
      <motion.span
        aria-hidden
        className={className}
        style={{ display: "inline-flex" }}
        initial="normal"
        animate={state}
        variants={variants}
      >
        <Icon size={size} strokeWidth={strokeWidth} />
      </motion.span>
    );
  }
  return MotionIcon;
}

export const PlaneIcon = createMotionIcon(PlaneTakeoff, {
  normal: { x: 0, y: 0, opacity: 1 },
  animate: {
    x: [0, 16, -16, 0],
    y: [0, -14, 14, 0],
    opacity: [1, 0, 0, 1],
    transition: { duration: 0.9, ease: "easeInOut", times: [0, 0.42, 0.52, 1] },
  },
});

export const BriefcaseIcon = createMotionIcon(Briefcase, {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: [0, -5, 0],
    rotate: [0, -7, 7, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
});

export const SparklesIcon = createMotionIcon(Sparkles, {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.25, 0.95, 1],
    rotate: [0, 14, -8, 0],
    transition: { duration: 0.7, ease: "easeInOut" },
  },
});

export const StarIcon = createMotionIcon(Star, {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.3, 1],
    rotate: [0, -12, 12, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
});

export const LandmarkIcon = createMotionIcon(Landmark, {
  normal: { y: 0, scale: 1 },
  animate: {
    y: [0, -4, 0],
    scale: [1, 1.08, 1],
    transition: { duration: 0.55, ease: "easeInOut" },
  },
});

export const MapPinIcon = createMotionIcon(MapPin, {
  normal: { y: 0 },
  animate: {
    y: [0, -6, 0, -3, 0],
    transition: { duration: 0.7, ease: "easeOut" },
  },
});

export const PhoneIcon = createMotionIcon(Phone, {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -14, 14, -9, 9, 0],
    transition: { duration: 0.7, ease: "easeInOut" },
  },
});

export const MailIcon = createMotionIcon(Mail, {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: [0, -4, 0],
    rotate: [0, -4, 4, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
});

const drawVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

export function RouteIcon({ size = 28, className, strokeWidth = 1.75 }: AnimatedIconProps) {
  const state = useIconState();
  return (
    <motion.svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial="normal"
      animate={state}
    >
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <motion.path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" variants={drawVariants} />
    </motion.svg>
  );
}

export function ShieldIcon({ size = 28, className, strokeWidth = 1.75 }: AnimatedIconProps) {
  const state = useIconState();
  return (
    <motion.svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial="normal"
      animate={state}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <motion.path
        d="m9 12 2 2 4-4"
        variants={{
          normal: { pathLength: 1, opacity: 1 },
          animate: {
            pathLength: [0, 1],
            opacity: 1,
            transition: { duration: 0.5, delay: 0.1, ease: "easeOut" },
          },
        }}
      />
    </motion.svg>
  );
}

export function ClockIcon({ size = 28, className, strokeWidth = 1.75 }: AnimatedIconProps) {
  const state = useIconState();
  return (
    <motion.svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial="normal"
      animate={state}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.g
        style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        variants={{
          normal: { rotate: 0 },
          animate: { rotate: 360, transition: { duration: 0.9, ease: "easeInOut" } },
        }}
      >
        <path d="M12 12V7" />
        <path d="m12 12 3.5 2" />
      </motion.g>
    </motion.svg>
  );
}

const registry: Record<IconName, (props: AnimatedIconProps) => ReactNode> = {
  plane: PlaneIcon,
  briefcase: BriefcaseIcon,
  sparkles: SparklesIcon,
  route: RouteIcon,
  clock: ClockIcon,
  landmark: LandmarkIcon,
  shield: ShieldIcon,
  star: StarIcon,
};

export function AnimatedIcon({ name, ...props }: AnimatedIconProps & { name: IconName }) {
  const Icon = registry[name];
  return <Icon {...props} />;
}
