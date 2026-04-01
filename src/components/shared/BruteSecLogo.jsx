export function BruteSecLogo({ height = 24, color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 352 52"
      height={height}
      className="block overflow-visible shrink-0"
      aria-label="BruteSec Labs"
      role="img"
    >
      <text
        x="2"
        y="40"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="40"
        fill={color}
      >
        <tspan fontWeight="300">] BruteSec </tspan>
        <tspan fontWeight="700">Labs</tspan>
        <tspan fontWeight="300"> [</tspan>
      </text>
    </svg>
  );
}
