/** Playful gear-flower accent from the style reference */
export function FlowerIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="24" r="6" fill="#FDE047" stroke="#111" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="24"
          cy="10"
          rx="7"
          ry="10"
          fill="#FF6B35"
          stroke="#111"
          strokeWidth="2"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="3" fill="#111" />
    </svg>
  )
}
