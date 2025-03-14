"use client";

import React, { useEffect, useRef } from "react";

export interface InViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Called when the element enters the viewport
   */
  onInView?: () => void;
  /**
   * The root margin to use for the intersection observer
   * @default "0px"
   */
  rootMargin?: string;
  /**
   * The threshold to use for the intersection observer
   * @default 0
   */
  threshold?: number;
  /**
   * Whether to only trigger once
   * @default false
   */
  triggerOnce?: boolean;
  /**
   * Skip setting up the intersection observer
   * @default false
   */
  skip?: boolean;
}

export function InView({
  children,
  onInView,
  rootMargin = "0px",
  threshold = 0,
  triggerOnce = false,
  skip = false,
  ...props
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!ref.current || skip) return;

    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasTriggered.current) {
              return;
            }
            hasTriggered.current = true;
            onInView?.();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [onInView, rootMargin, threshold, triggerOnce, skip]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}