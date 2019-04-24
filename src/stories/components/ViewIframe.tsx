import * as React from 'react';

import './ViewIframe.css';

export const ViewIframe = (): React.ReactElement => {
    return (
        <div className="ViewIframe">
            {top.location.href !== location.href
                ? (
                    <a href={location.href} target="_blank">
                        Open this iFrame in new window for better keyboard interactions
                    </a>
                )
                : <span>Viewing contents of iFrame (better keyboard interactions)</span>
            }
        </div>
    );
};
