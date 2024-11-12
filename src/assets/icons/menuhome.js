const MenuHome = ({ className = "", style = {} }) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g filter="url(#filter0_d_2199_149376)">
        <rect x="5" y="3" width="50" height="50" rx="25" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 24H26V20H22V24ZM28 36H32V32H28V36ZM22 36H26V32H22V36ZM22 30H26V26H22V30ZM28 30H32V26H28V30ZM34 20V24H38V20H34ZM28 24H32V20H28V24ZM34 30H38V26H34V30ZM34 36H38V32H34V36Z"
          fill="#C3CAD9"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2199_149376"
          x="0"
          y="0"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.14902 0 0 0 0 0.2 0 0 0 0 0.301961 0 0 0 0.03 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2199_149376" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2199_149376" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default MenuHome;
