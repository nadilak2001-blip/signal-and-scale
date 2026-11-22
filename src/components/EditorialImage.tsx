import {useState} from 'react';
import {BarChart3} from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  loading?: 'eager' | 'lazy';
}

export function EditorialImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[4/3]',
  loading = 'lazy',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#E8EEF4] border border-[#14243A]/10 text-[#14243A]/70 p-6 text-center ${aspectClass} ${className}`}
      >
        <BarChart3 className="w-8 h-8 text-[#087E83] mb-2" aria-hidden="true" />
        <span className="text-sm font-medium text-[#14243A]">Signal &amp; Scale Visual</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
