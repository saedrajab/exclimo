"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { Check, ChevronDown } from "lucide-react";

// Custom listbox in the React Bits style: the panel opens on a spring and
// options stagger in. React Bits ships no select control, so this adapts
// their menu motion patterns onto an accessible ARIA combobox/listbox.
const spring = { type: "spring", stiffness: 500, damping: 32, mass: 0.8 } as const;

export function Select({
  id,
  value,
  options,
  placeholder,
  onChange,
  invalid,
  describedBy,
  className = "",
}: {
  id: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function openList() {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  }

  function commit(index: number) {
    onChange(options[index]);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) openList();
        else if (active >= 0) commit(active);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(options.length - 1);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open && active >= 0 ? `${listboxId}-${active}` : undefined
        }
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${className} flex items-center justify-between gap-3 text-left`}
      >
        <span className={value ? "" : "text-mute"}>{value || placeholder}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduceMotion ? { duration: 0 } : spring}
          className="shrink-0 text-mute"
        >
          <ChevronDown size={16} aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            id={listboxId}
            aria-label={placeholder}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.15 } }
            }
            transition={reduceMotion ? { duration: 0.1 } : spring}
            className="absolute left-0 right-0 top-full z-20 mt-2 origin-top rounded-[18px] bg-canvas p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.14)]"
          >
            {options.map((option, i) => (
              <motion.li
                key={option}
                role="option"
                id={`${listboxId}-${i}`}
                aria-selected={option === value}
                initial={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { ...spring, delay: 0.03 * i }
                }
                onClick={() => commit(i)}
                onPointerEnter={() => setActive(i)}
                className={`flex h-11 cursor-pointer items-center justify-between rounded-[12px] px-3.5 text-[15px] ${
                  i === active ? "bg-cloud" : ""
                } ${option === value ? "font-medium" : ""}`}
              >
                {option}
                {option === value && <Check size={16} aria-hidden />}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
