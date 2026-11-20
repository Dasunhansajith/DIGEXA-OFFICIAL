import { gsap } from '@/lib/gsap';

/**
 * Checks if the user prefers reduced motion for accessibility.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Creates a cinematic text line reveal animation using an overflow-hidden wrapper.
 * Target elements should be wrapped in an overflow-hidden parent.
 */
export const createLineReveal = (
  elements: (HTMLElement | null)[],
  triggerElement: HTMLElement | null,
  options: {
    start?: string;
    stagger?: number;
    delay?: number;
    duration?: number;
  } = {}
) => {
  if (prefersReducedMotion() || !triggerElement) {
    elements.forEach((el) => {
      if (el) gsap.set(el, { yPercent: 0, opacity: 1 });
    });
    return null;
  }

  const validElements = elements.filter(Boolean) as HTMLElement[];
  if (!validElements.length) return null;

  gsap.set(validElements, { yPercent: 110, opacity: 0 });

  return gsap.to(validElements, {
    yPercent: 0,
    opacity: 1,
    duration: options.duration ?? 1.2,
    stagger: options.stagger ?? 0.15,
    delay: options.delay ?? 0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: triggerElement,
      start: options.start ?? 'top 80%',
      toggleActions: 'play none none none',
    },
  });
};

/**
 * Creates a smooth fade-in-up scroll trigger animation for paragraphs or cards.
 */
export const createFadeInUp = (
  elements: (HTMLElement | null)[],
  triggerElement: HTMLElement | null,
  options: {
    start?: string;
    y?: number;
    stagger?: number;
    delay?: number;
    duration?: number;
  } = {}
) => {
  if (prefersReducedMotion() || !triggerElement) {
    elements.forEach((el) => {
      if (el) gsap.set(el, { y: 0, opacity: 1 });
    });
    return null;
  }

  const validElements = elements.filter(Boolean) as HTMLElement[];
  if (!validElements.length) return null;

  gsap.set(validElements, { y: options.y ?? 40, opacity: 0 });

  return gsap.to(validElements, {
    y: 0,
    opacity: 1,
    duration: options.duration ?? 1,
    stagger: options.stagger ?? 0.18,
    delay: options.delay ?? 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: triggerElement,
      start: options.start ?? 'top 75%',
      toggleActions: 'play none none none',
    },
  });
};

/**
 * Creates a subtle parallax scroll effect for background or decorative elements.
 */
export const createParallax = (
  element: HTMLElement | null,
  triggerElement: HTMLElement | null,
  yDistance: number = -60
) => {
  if (prefersReducedMotion() || !element || !triggerElement) return null;

  return gsap.to(element, {
    y: yDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
    },
  });
};
