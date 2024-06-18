export const PaperPlaneIcon = ({
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
      <g clip-path="url(#clip0_4_106)">
        <path
          d="M0 10L6.125 11.75H6.25V11.625L15.125 5L13.75 6.5L6 14.75L6.25 18.75L9.875 14.75L12.5 20L20 0L0 10Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_4_106">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};
