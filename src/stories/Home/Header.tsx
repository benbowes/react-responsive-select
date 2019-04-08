import * as React from 'react';
// import { RRSLogo } from './RRSLogo';
// <RRSLogo />
import { LogoLinks } from './LogoLinks';

import './Header.css';

export const Header = (): React.ReactElement => (
    <div className="header">
        <div className="header__wrapper">
            <div>
                <h1>React-Responsive-Select</h1>
                <h2 className="subh1">
                    A customisable, touchable, <b>React select</b> / <b>multi-select</b> form component.
                    <br />Built with keyboard and screen reader accessibility in mind.
                </h2>
                {/* <LogoLinks /> */}
            </div>
        </div>
    </div>
);
