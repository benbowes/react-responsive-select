import * as React from 'react';
import './Header.css';

export const Header = (): React.ReactElement<HTMLDivElement> => (
    <div className="header">
        <div className="header__wrapper">
            <div>
                <h1>React-Responsive-Select</h1>
                <h2 className="subh1">
                    A customisable, touchable, <b>React select</b> / <b>multi-select</b> form component.
                    <br />Built with keyboard and screen reader accessibility in mind.
                </h2>
            </div>
        </div>
    </div>
);
