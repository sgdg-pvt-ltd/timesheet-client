export const HomeIcon = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g clip-path="url(#clip0_4_91)">
        <path
          d="M0 20V6.66667L10 0L20 6.66667V20H12.5V12.2222H7.5V20H0Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_4_91">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};
