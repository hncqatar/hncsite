import React, { useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import ProductTextOverlays from "./ProductTextOverlays";
import { Loader2, ArrowDownCircle } from "lucide-react";

export default function ProductBottleScroll({ product }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  // Framer motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate frame details
  // Mango has 118 frames: magnific_sequence-cinematic-produc_e8JixcKdqL_1000.jpg to magnific_sequence-cinematic-produc_e8JixcKdqL_1117.jpg
  const startFrame = 1000;
  const endFrame = 1117;
  const totalFrames = endFrame - startFrame + 1; // 118

  useEffect(() => {
    // Reset loader states for a new product
    setIsPreloaded(false);
    setLoadedCount(0);
    setImages([]);
    setErrorLoading(false);

    // If not mango, we don't have an image sequence in assets yet. We can load a premium fallback static image.
    if (product.id !== "mango") {
      setIsPreloaded(true);
      return;
    }

    const loadedImages = [];
    let count = 0;

    const handleImageLoad = (img) => {
      count++;
      setLoadedCount(count);
      if (count === totalFrames) {
        setImages(loadedImages);
        setIsPreloaded(true);
      }
    };

    const handleImageError = () => {
      setErrorLoading(true);
      setIsPreloaded(true); // Proceed to fallback if files aren't ready
    };

    // Preload all 118 frames
    for (let i = startFrame; i <= endFrame; i++) {
      const img = new Image();
      img.src = `/images/mango/magnific_sequence-cinematic-produc_e8JixcKdqL_${i}.jpg`;
      img.onload = () => handleImageLoad(img);
      img.onerror = handleImageError;
      loadedImages.push(img);
    }
  }, [product.id, totalFrames]);

  // Handle drawing and resizing
  useEffect(() => {
    if (!isPreloaded || images.length === 0 || product.id !== "mango" || errorLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set pixel ratio for sharp display (Retina Support)
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Initial render on resize
      const currentProgress = scrollYProgress.get();
      renderFrame(currentProgress);
    };

    const renderFrame = (progress) => {
      if (images.length === 0) return;
      
      // Calculate active frame index (0 to 82)
      // Clamping progress between 0 and 0.999 to avoid overflow
      const clampedProgress = Math.max(0, Math.min(0.999, progress));
      const frameIndex = Math.floor(clampedProgress * totalFrames);
      const img = images[frameIndex];
      
      if (!img || !img.complete) return;

      const rect = canvas.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      // Clear the canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // "Contain" aspect ratio calculation
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image (fit height)
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        // Canvas is taller than image (fit width)
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Trigger first time

    // Bind motion scroll updates to canvas frames
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      requestAnimationFrame(() => renderFrame(latest));
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, [isPreloaded, images, product.id, scrollYProgress, totalFrames, errorLoading]);

  // Loading percent calculation
  const loadPercentage = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div ref={containerRef} className="relative h-[480vh] w-full">
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Cinematic Red/Navy Ambient Gradients */}
        <div className="absolute inset-0 bg-[#050B1F]" />
        
        {/* Large premium back-glow behind the bottle */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-35 transition-all duration-1000 animate-pulse-slow pointer-events-none"
          style={{ 
            background: `radial-gradient(circle, ${product.themeColor} 0%, transparent 70%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Subtle premium red ambient gradient highlight (Brand specs) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EF233C]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EF233C]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Preloader Overlay (Only shows while preloading the massive image sequence) */}
        {!isPreloaded && (
          <div className="absolute inset-0 z-40 bg-[#050B1F]/90 backdrop-blur-md flex flex-col items-center justify-center gap-6">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-rose-500 animate-spin absolute" />
              <span className="text-sm font-bold text-white tracking-widest">{loadPercentage}%</span>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-white text-lg font-black uppercase tracking-[0.2em]">
                Buffering Cinematic Stream
              </h3>
              <p className="text-xs text-white/40 mt-2 font-medium tracking-wide">
                Loading Alphonso Mango frozen-in-time ingredients...
              </p>
            </div>
          </div>
        )}

        {/* The Engine Canvas */}
        {product.id === "mango" && !errorLoading ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full max-h-screen max-w-full relative z-10 transition-opacity duration-700 pointer-events-none"
            style={{ 
              opacity: isPreloaded ? 1 : 0,
              maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%)",
              WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%)"
            }}
          />
        ) : (
          /* FALLBACK / PLACEHOLDER FOR FLAVORS WITH NO SEQUENCE */
          <div className="relative w-full h-full flex items-center justify-center z-10 p-6">
            <div className="relative w-full max-w-md h-[70vh] flex flex-col items-center justify-center text-center">
              
              {/* Premium 3D Glassmorphic Bottle Render Fallback */}
              <div 
                className="w-36 h-80 sm:w-44 sm:h-96 rounded-[40px] relative shadow-[0_0_80px_rgba(255,255,255,0.05)] border border-white/10 flex flex-col items-center justify-between p-6 sm:p-8 backdrop-blur-xl group overflow-hidden transition-all duration-700 hover:border-white/20"
                style={{ 
                  background: `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)`,
                }}
              >
                {/* Cap */}
                <div 
                  className="w-12 h-6 sm:w-16 sm:h-8 rounded-lg shadow-md transition-colors duration-500" 
                  style={{ backgroundColor: product.themeColor }}
                />
                
                {/* Bottle label */}
                <div className="w-full py-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center gap-2">
                  <span className="text-2xl font-black tracking-tight" style={{ color: product.themeColor }}>
                    NANO
                  </span>
                  <span className="text-[9px] font-bold text-white/60 tracking-[0.2em] uppercase leading-none">
                    {product.name}
                  </span>
                </div>
                
                {/* Bottom Base */}
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                  300ML • COLD-PRESSED
                </span>

                {/* Animated Inner Fluid Reflection */}
                <div 
                  className="absolute inset-0 -z-10 opacity-30 blur-2xl rounded-full"
                  style={{ 
                    background: `radial-gradient(circle at center, ${product.themeColor} 0%, transparent 70%)` 
                  }}
                />
              </div>

              {/* Title and prompt */}
              <div className="mt-8">
                <h3 className="text-white font-extrabold text-2xl uppercase tracking-wider">
                  {product.name}
                </h3>
                <p className="text-white/40 text-xs mt-2 max-w-xs mx-auto leading-relaxed">
                  Interactive image sequence triggers dynamically for Mango. {product.name} static visuals loaded gracefully.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cinematic Scroll Indicator (Fades out after user scrolls down) */}
        {isPreloaded && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 animate-bounce pointer-events-none">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Scroll to Explore
            </span>
            <ArrowDownCircle className="w-5 h-5 text-white/30" />
          </div>
        )}

        {/* Text Overlay Layer */}
        {isPreloaded && (
          <ProductTextOverlays product={product} scrollYProgress={scrollYProgress} />
        )}
      </div>
    </div>
  );
}
