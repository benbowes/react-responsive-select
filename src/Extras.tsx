import React from 'react';

/* tslint:disable:max-line-length*/
export const CaretIcon = (props: any): React.ReactElement => (
  <svg
    className="caret-icon"
    x="0px"
    y="0px"
    width="11.848px"
    height="6.338px"
    viewBox="351.584 2118.292 11.848 6.338"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z" />
    </g>
  </svg>
);

export const ErrorIcon = (props: any): React.ReactElement => (
  <svg
    x="0px"
    y="0px"
    width="12px"
    height="12px"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fill: 'currentColor', marginRight: '4px' }}
    {...props}
  >
    <g>
      <path d="M868,953.8H132.1c-49.3,0-89-19.3-108.8-53.1C3.5,867,5.9,822.9,29.9,779.8l371.3-665.4c24.2-43.4,60.1-68.2,98.6-68.2c38.5,0,74.4,24.8,98.6,68.2L970,779.9c24,43.1,26.5,87.1,6.7,120.8C956.9,934.5,917.3,953.8,868,953.8L868,953.8z M499.8,116.1c-12.2,0-26.2,12.1-37.6,32.4L90.9,813.9c-11.6,20.9-14.4,39.6-7.4,51.5c7,11.8,24.7,18.6,48.5,18.6H868c23.9,0,41.6-6.7,48.5-18.6c6.9-11.8,4.2-30.6-7.4-51.4L537.4,148.5C526.1,128.2,512,116.1,499.8,116.1L499.8,116.1z M500,638.7c-19.3,0-34.9-15.6-34.9-34.9V289.5c0-19.3,15.6-34.9,34.9-34.9c19.3,0,34.9,15.6,34.9,34.9v314.3C534.9,623.1,519.3,638.7,500,638.7z M447.6,761.1c0,28.9,23.5,52.4,52.4,52.4c28.9,0,52.4-23.5,52.4-52.4c0-28.9-23.5-52.4-52.4-52.4C471.1,708.7,447.6,732.2,447.6,761.1z" />
    </g>
  </svg>
);

export const ModalCloseButton = (props: any): React.ReactElement => (
  <div>
    <svg
      className="mobile-close__icon"
      xmlns="http://www.w3.org/2000/svg"
      width="12px"
      height="12px"
      viewBox="0 0 2541 2541"
      {...props}
    >
      <path d="M29 172c-39-39-39-103 0-142s103-39 142 0l1099 1099L2369 30c39-39 103-39 142 0s39 103 0 142L1412 1271l1099 1099c39 39 39 103 0 142s-103 39-142 0L1270 1413 171 2512c-39 39-103 39-142 0s-39-103 0-142l1099-1099L29 172z" />
    </svg>
  </div>
);

export const CheckboxIcon = (props: any): React.ReactElement => (
  <svg
    className="checkbox-icon"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="12px"
    height="12px"
    viewBox="0 0 488.878 488.878"
    {...props}
  >
    <g>
      <polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 " />
    </g>
  </svg>
);

export const MultiSelectOptionMarkup = ({ text, ...props }: { text: string; props: any }): React.ReactElement => (
  <div className="checkbox-container">
    <span className="checkbox">
      <CheckboxIcon {...props} />
    </span>
    <span className="checkbox-text"> {text}</span>
  </div>
);
/* tslint:enable:max-line-length */
