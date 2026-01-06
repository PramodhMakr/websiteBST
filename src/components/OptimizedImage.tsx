import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  removeBorder?: boolean;
}

export default function OptimizedImage({ src, alt, className, style }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  // Generate a higher quality image path
  const optimizedSrc = src.replace('/src/assets/', '/assets/');

  if (error) {
    return (
      <div className={`bg-transparent flex items-center justify-center ${className || ''}`} style={style}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className || ''} image-no-border`} style={style}>
      <img
        src={optimizedSrc}
        alt={alt}
        className={`transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} w-full h-full object-cover rounded-lg`}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          border: 'none',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)',
          padding: '4px',
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 animate-pulse rounded-lg" />
      )}
    </div>
  );
}
