interface Props {
  className?: string;
}

const EditIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5288 1.9437C15.0172 1.45576 15.809 1.45576 16.2974 1.9437L19.0726 4.7165C19.5609 5.20444 19.5609 5.99556 19.0726 6.4835L9.05327 16.4941C8.85152 16.6957 8.58685 16.8223 8.30318 16.8529L5.19226 17.1883C4.39872 17.2738 3.72913 16.6048 3.81477 15.812L4.15048 12.7038C4.18109 12.4203 4.30778 12.1559 4.50953 11.9543L14.5288 1.9437Z"
        stroke-width="1.5"
      />
      <rect
        x="0.350303"
        width="3.46633"
        height="0.495189"
        transform="matrix(0.707413 0.7068 0.707413 -0.7068 13.5341 4.70214)"
        fill="white"
        stroke-width="0.495189"
      />
    </svg>
  );
};

export default EditIcon;
