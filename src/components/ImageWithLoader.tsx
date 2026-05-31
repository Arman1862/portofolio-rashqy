import { useState } from "react";

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatioClass?: string;
}

export default function ImageWithLoader({
  src,
  alt,
  className,
  aspectRatioClass = "aspect-video",
  ...props
}: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden bg-neutral-900 border border-white/5 rounded-xl ${aspectRatioClass} flex items-center justify-center`}>
      {/* Skeleton Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-900/90 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase animate-pulse">
            LOADING
          </span>
        </div>
      )}

      {/* Graceful Error Fallback State */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-4 text-center">
          <svg
            className="w-8 h-8 text-neutral-600 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">
            Failed to load
          </span>
          <span className="text-[9px] text-neutral-600 font-sans mt-1 line-clamp-1 max-w-[150px]">
            {alt}
          </span>
        </div>
      )}

      {/* Actual Image Element */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        {...props}
      />
    </div>
  );
}
