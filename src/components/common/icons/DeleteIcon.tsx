interface Props {
  className?: string;
}

const DeleteIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.04688 2.96985H16.8998"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M6.00098 13.8593L6.00098 5.93969"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M8.97363 13.8593L8.97363 5.93969"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M11.9453 13.8593L11.9453 5.93969"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.00977 1.5H10.9362C11.2124 1.5 11.4362 1.72386 11.4362 2V2.4598H6.50977V2C6.50977 1.72386 6.73362 1.5 7.00977 1.5ZM5.00977 2C5.00977 0.895429 5.9052 0 7.00977 0H10.9362C12.0408 0 12.9362 0.895431 12.9362 2V2.4598V2.96985H5.00977V2.4598V2Z"
        fill="#A3A3A3"
        stroke-width="0.5"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.03711 4.94978V13.8191C2.03711 16.0283 3.82797 17.8191 6.03711 17.8191H11.9084C14.1176 17.8191 15.9084 16.0283 15.9084 13.8191V4.94978H14.4084V13.8191C14.4084 15.1998 13.2891 16.3191 11.9084 16.3191H6.03711C4.6564 16.3191 3.53711 15.1998 3.53711 13.8191V4.94978H2.03711Z"
        fill="#A3A3A3"
        stroke-width="0.5"
      />
    </svg>
  );
};

export default DeleteIcon;
