"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface AutoScrollContainerProps {
  children: ReactNode;
  className?: string;
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
}

export default function AutoScrollContainer({
  children,
  className = "",
  speed = 30,
  pauseOnHover = true,
}: AutoScrollContainerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [singleCopyHeight, setSingleCopyHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    const updateHeights = () => {
      if (contentRef.current && containerRef.current) {
        const totalScroll = contentRef.current.scrollHeight;
        // If we already duplicated, each copy is half
        const single = ready ? totalScroll / 2 : totalScroll;
        setSingleCopyHeight(single);
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    // Small delay to let content render and images load
    const timer = setTimeout(() => {
      updateHeights();
      setReady(true);
    }, 100);

    const observer = new ResizeObserver(updateHeights);
    observer.observe(contentRef.current);
    observer.observe(containerRef.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ready]);

  const shouldScroll = ready && singleCopyHeight > containerHeight && singleCopyHeight > 0;
  const duration = shouldScroll ? singleCopyHeight / speed : 0;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
    >
      <div
        ref={contentRef}
        className={pauseOnHover && shouldScroll ? "hover:[animation-play-state:paused]" : ""}
        style={
          shouldScroll
            ? {
                animation: `autoScroll ${duration}s linear infinite`,
              }
            : undefined
        }
      >
        <div>{children}</div>
        {shouldScroll && (
          <div aria-hidden="true">{children}</div>
        )}
      </div>
    </div>
  );
}
