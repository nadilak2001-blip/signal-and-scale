export function BrandMark({className = 'w-6 h-6'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="16" width="5" height="9" rx="1.2" fill="#087E83" />
      <rect x="10.5" y="10" width="5" height="15" rx="1.2" fill="#14243A" />
      <rect x="19" y="3" width="5" height="22" rx="1.2" fill="#14243A" />
      <circle cx="21.5" cy="5.5" r="2" fill="#E5A85B" />
    </svg>
  );
}
