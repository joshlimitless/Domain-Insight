import { useEffect, useRef, useState } from "react";

interface FadingDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function FadingDescription({ children, className = "" }: FadingDescriptionProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const headerHeight = 64; // 4rem header
      const stickyTitleBottom = headerHeight + 60; // Approximate sticky title height
      
      // Calculate how close the description is to the sticky title
      const distanceFromTitle = rect.top - stickyTitleBottom;
      
      // Start fading when within 100px of the sticky title
      const fadeStartDistance = 100;
      const fadeEndDistance = 0;
      
      if (distanceFromTitle <= fadeStartDistance && distanceFromTitle >= fadeEndDistance) {
        const newOpacity = distanceFromTitle / fadeStartDistance;
        setOpacity(Math.max(0, Math.min(1, newOpacity)));
      } else if (distanceFromTitle > fadeStartDistance) {
        setOpacity(1);
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <p
      ref={ref}
      className={className}
      style={{ 
        opacity,
        position: 'relative',
        zIndex: 50,
        transition: 'opacity 0.1s ease-out'
      }}
    >
      {children}
    </p>
  );
}
