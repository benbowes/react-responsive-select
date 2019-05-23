import * as React from 'react';

/* tslint:disable:max-line-length*/
export const CheckboxIcon = (): React.ReactElement => (
    <svg
        className="checkbox-icon"
        x="0px"
        y="0px"
        width="12px"
        height="12px"
        viewBox="0 0 488.878 488.878"
    >
        <g>
            <polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 " />
        </g>
    </svg>
);

export const MultiSelectOptionMarkup = ({ text }: {text: string}): React.ReactElement => (
    <div>
        <span className="checkbox">
            <CheckboxIcon />
        </span>
        <span> {text}</span>
    </div>
);
/* tslint:enable:max-line-length */
