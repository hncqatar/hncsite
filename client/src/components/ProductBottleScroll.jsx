import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { products } from "../data/products";

function getFrameSrc(product, frame) {
  return `${product.frameFolder}/${product.framePrefix}${frame}.${product.extension}`;
}

export default function ProductBottleScroll() {
  const [active, setActive] = useState(products[0]);
  const [frames, setFrames] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isUserActive, setIsUserActive] = useState(false);

  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const inactivityTimer = useRef(null);
  const autoAnimation = useRef(null);

  const maxFrames = useMemo(() => {
    if (typeof window === "undefined") return 60;
    return window.innerWidth < 768 ? 40 : 80;
  }, []);

  const frameNumbers = useMemo(() => {
    const total = active.frameEnd - active.frameStart + 1;
    const step = Math.max(1, Math.ceil(total / maxFrames));
    const nums = [];

    for (let i = active.frameStart; i <= active.frameEnd; i += step) {
      nums.push(i);
    }

    return nums;
  }, [active, maxFrames]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.85, 1],
    [1, 1, 1, 0]
  );

  useEffect(() => {
    setLoaded(false);
    setFrames([]);
    setCurrentFrame(0);

    const imgs = [];
    let count = 0;

    frameNumbers.forEach((num) => {
      const img = new Image();
      img.src = getFrameSrc(active, num);

      img.onload = () => {
        count += 1;

        if (count === frameNumbers.length) {
          setFrames(imgs);
          setLoaded(true);
        }
      };

      img.onerror = () => {
        count += 1;

        if (count === frameNumbers.length) {
          setFrames(imgs.filter(Boolean));
          setLoaded(true);
        }
      };

      imgs.push(img);
    });
  }, [active, frameNumbers]);

  useEffect(() => {
    if (!loaded || !frames.length) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = (img) => {
      if (!img || !img.width || !img.height) return;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const scale = Math.max(
        window.innerWidth / img.width,
        window.innerHeight / img.height
      );

      const x = window.innerWidth / 2 - (img.width * scale) / 2;
      const y = window.innerHeight / 2 - (img.height * scale) / 2;

      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      draw(frames[currentFrame] || frames[0]);
    };

    const markUserActive = () => {
      setIsUserActive(true);

      clearTimeout(inactivityTimer.current);

      inactivityTimer.current = setTimeout(() => {
        setIsUserActive(false);
      }, 2500);
    };

    const unsubscribe = scrollYProgress.on("change", (value) => {
      markUserActive();

      const index = Math.min(
        frames.length - 1,
        Math.floor(value * (frames.length - 1))
      );

      setCurrentFrame(index);
      draw(frames[index]);
    });

   let lastAutoTime = 0;
const autoSpeed = 100; // bigger number = slower motion

const autoPlay = (time) => {
  if (!lastAutoTime) lastAutoTime = time;

  const elapsed = time - lastAutoTime;

  if (!isUserActive && elapsed > autoSpeed) {
    setCurrentFrame((prev) => {
      const nextFrame = (prev + 1) % frames.length;
      draw(frames[nextFrame]);
      return nextFrame;
    });

    lastAutoTime = time;
  }

  autoAnimation.current = requestAnimationFrame(autoPlay);
};

    resize();
    autoPlay();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", markUserActive);
    window.addEventListener("touchstart", markUserActive);
    window.addEventListener("keydown", markUserActive);

    return () => {
      unsubscribe();

      cancelAnimationFrame(autoAnimation.current);

      clearTimeout(inactivityTimer.current);

      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", markUserActive);
      window.removeEventListener("touchstart", markUserActive);
      window.removeEventListener("keydown", markUserActive);
    };
  }, [frames, loaded, scrollYProgress, currentFrame, isUserActive]);

  return (
    <section ref={sectionRef} className="relative h-[260vh] bg-brand-navy">
      <div className="sticky top-0 h-screen overflow-hidden">
        {loaded && frames.length ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <img
            src={active.image}
            alt={active.name}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/20 to-brand-navy/85" />

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="container-hnc relative z-10 flex h-full flex-col items-center justify-center px-5 text-center"
        >
          <p className="mb-5 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-brand-gold backdrop-blur-xl">
            Scroll Experience
          </p>

          <h2 className="max-w-4xl text-5xl font-black leading-none sm:text-7xl">
            {active.name}
            <span className="brand-gradient block">
              {active.tagline}
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-white/70">
            {active.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setActive(product);
                  setIsUserActive(false);
                }}
                className={`rounded-full px-5 py-3 text-xs font-black uppercase tracking-wider transition ${
                  active.id === product.id
                    ? "bg-brand-red text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/15"
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-white/35">
            {isUserActive ? "Manual Scroll Mode" : "Auto Motion Mode"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}