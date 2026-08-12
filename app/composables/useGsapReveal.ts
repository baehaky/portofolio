import gsap from "gsap";

export function useGsapReveal(root?: MaybeRefOrGetter<HTMLElement | null>) {
  let ctx: gsap.Context | undefined;

  onMounted(() => {
    const scope = toValue(root);

    ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.reducedMotion = "reduce";

      mm.add("(min-width: 1px)", () => {
        const targets = gsap.utils.toArray<HTMLElement>(
          (scope ?? document).querySelectorAll("[data-reveal]"),
        );

        targets.forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          });
        });
      });
    }, scope);
  });

  onUnmounted(() => ctx?.revert());
}
