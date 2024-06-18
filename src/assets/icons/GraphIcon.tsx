export const GraphIcon = ({
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
      <path d="M1.33333 0H0V20H20V18.3673H1.33333V0Z" fill="currentColor" />
      <path
        d="M14.2764 0V2.32462H17.3944L8.36194 16.0815L4.92776 10.8511L0 18.3562L1.07929 20L4.92776 14.1385L8.36194 19.3689L18.4737 3.96842V8.71732H20V0H14.2764Z"
        fill="currentColor"
      />
    </svg>
  );
};
