import * as React from "react";

export const OvalIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={0}
    height={0}
    fill={'#000'}
    stroke="#000"
    className="avatar-shape"
    {...props}
  >
    <clipPath id="oval" clipPathUnits="objectBoundingBox" transform="scale(0.005)">
      <path d="M0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100Z" />
    </clipPath>
  </svg>
);

export const NewUp = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 20}
    height={props.height || 20}
    fill={'currentColor'}
    className="new-up"
    {...props}
  >
    <path d="M5.83366 5C5.37343 5 5.00033 5.3731 5.00033 5.83333C5.00033 6.29357 5.37343 6.66667 5.83366 6.66667V5ZM14.167 5.83333H15.0003C15.0003 5.3731 14.6272 5 14.167 5V5.83333ZM13.3337 14.1667C13.3337 14.6269 13.7068 15 14.167 15C14.6272 15 15.0003 14.6269 15.0003 14.1667H13.3337ZM4.41108 14.4108C4.08563 14.7362 4.08563 15.2638 4.41108 15.5893C4.73651 15.9147 5.26415 15.9147 5.58958 15.5893L4.41108 14.4108ZM5.83366 6.66667H14.167V5H5.83366V6.66667ZM13.3337 5.83333V14.1667H15.0003V5.83333H13.3337ZM13.5777 5.24408L4.41108 14.4108L5.58958 15.5893L14.7562 6.42258L13.5777 5.24408Z" />
  </svg>
);
