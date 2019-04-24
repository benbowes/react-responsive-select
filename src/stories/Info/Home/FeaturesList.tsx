import * as React from 'react';
import { CheckboxIcon } from '../../components/MultiSelectOptionMarkup';
import './FeaturesList.css';

export const FeaturesList = (): React.ReactElement => (
    <ul className="features-list">
        <li className="features-list__item">
            <span className="features-list__checkIcon"><CheckboxIcon /></span>
            <h4>Single and Multi select modes</h4>
        </li>
        <li className="features-list__item">
            <span className="features-list__checkIcon"><CheckboxIcon /></span>
            <h4>Accessible WAI ARIA compliance</h4>
        </li>
        <li className="features-list__item">
            <span className="features-list__checkIcon"><CheckboxIcon /></span>
            <h4>Touch friendly</h4>
        </li>
        <li className="features-list__item">
            <span className="features-list__checkIcon"><CheckboxIcon /></span>
            <h4>Keyboard friendly</h4>
        </li>
        <li className="features-list__item">
            <span className="features-list__checkIcon"><CheckboxIcon /></span>
            <h4>Similar interaction experience across platforms</h4>
        </li>
        <li className="features-list__item">
            <span className="features-list__checkIcon"><CheckboxIcon /></span>
            <h4>Easy to style</h4>
        </li>
    </ul>
);
