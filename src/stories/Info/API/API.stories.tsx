import { storiesOf } from '@storybook/react';
import * as React from 'react';

import '../../stories.css';

const stories = storiesOf('Info', module);

stories.add(
    'API',
    () => (
        <div>
            <h1>API</h1>
            <h2 className="table-header">SingleSelect</h2>
            <table>
                <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>name (required)</td>
                    <td>String</td>
                    <td>
                        A unique name to associate a select with it's selected option value/s<br />
                        (also used on form submit)
                    </td>
                </tr>
                <tr>
                    <td>options (required)</td>
                    <td>Array of objects</td>
                    <td>
                        <p>Array of shape:</p>
                        <p>
                            <code>
                                {'{'}
                                    text: "Fiat",
                                    value: "fiat",
                                    markup: &lt;span&gt;Fiat&lt;/span&gt;,
                                    disabled: true
                                {'}'}
                            </code>
                        </p>
                        <p>or</p>
                        <p>
                            <code>
                                {'{'}
                                text: "Cars",
                                optHeader: true
                                {'}'}
                            </code>
                        </p>
                        <hr />
                        <p>
                            <code>text: </code>
                                (Required) display value for the select and the default for the option label
                        </p>
                        <p>
                            <code>value: </code> (Required) value that is submitted
                        </p>
                        <p>
                            <code>markup: </code>
                            (Optional) JSX markup used as the option label. Allows for the use of badges and icons...
                        </p>
                        <p>
                            <code>optHeader: </code>
                            (Optional) Will display an option header when present. Use with a <code>text</code> property
                        </p>
                        <p><code>disabled: </code>
                            (Optional) disable option - option cannot be selected and is greyed</p>
                        <p>Note: <code>
                            text</code> is used as the option label when <code>markup</code> is not present</p>
                    </td>
                </tr>
                <tr>
                    <td>onSubmit</td>
                    <td>Function</td>
                    <td>A function that submits your form</td>
                </tr>
                <tr>
                    <td>onChange</td>
                    <td>Function</td>
                    <td><p>Listen for changes on selected option change</p>
                        <p>returns:
                            <br />
                            <code>
                            {'{'}altered: boolean, name: select.name, value: option.value, text: option.text{'}'}
                            </code>
                        </p>
                        <p>Note: {' '}
                            <code>altered</code> signifies whether a select has been changed from it's original value.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>onBlur</td>
                    <td>Function</td>
                    <td><p>Listen for blur when select loses focus</p>
                        <p>returns:
                            <br />
                            <code>
                                {'{'}
                                    altered: boolean,
                                    name: select.name,
                                    value: option.value,
                                    text: option.text
                                {'}'}
                            </code>
                        </p>
                        <p>
                            Note: <code>
                                altered</code> signifies whether a select has been changed from it's original value.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>caretIcon</td>
                    <td>JSX</td>
                    <td>Add a dropdown icon by using JSX markup</td>
                </tr>
                <tr>
                    <td>selectedValue</td>
                    <td>String</td>
                    <td>Pre-select an option with this value - should match an existing
                    {' '}<code>option.value</code>, or if omitted the first item will be selected
                    </td>
                </tr>
                <tr>
                    <td>prefix</td>
                    <td>String</td>
                    <td>Prefix for the select label</td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Boolean</td>
                    <td>Disables the select control</td>
                </tr>
                <tr>
                    <td>noSelectionLabel</td>
                    <td>string</td>
                    <td>
                        A custom label to be used when nothing is selected.
                        When used, the first option is not automatically selected
                    </td>
                </tr>
                <tr>
                    <td>customLabelRenderer</td>
                    <td>Function</td>
                    <td>
                        <p>Allows you to format your own select label</p>
                        <p>
                            The customLabelRenderer function returns an option object
                            <br />
                            e.g.
                            <code>
                                {'{'}name: select.name, value: option.value, text: option.text{'}'}
                            </code>
                        </p>
                        <p>
                            To use this feature you need to return some JSX;
                            using values from the above object to create your own custom label.
                        </p>
                    </td>
                </tr>
            </table>

            <h2 className="table-header">Multi Select</h2>
            <p>Same as Single Select API but with the following amendments</p>

            <table>
                <tr>
                    <td>multiselect</td>
                    <td>Boolean</td>
                    <td>Makes the select control handle multiple selections</td>
                </tr>
                <tr>
                    <td>selectedValues</td>
                    <td>Array of String values</td>
                    <td>
                        <p>Pre-select several options with this value - should match against an existing{' '}
                            <code>option.value</code>, or if omitted, the first item will be selected.
                        </p>
                        <p>e.g. <code>selectedValues={'{['}'mazda', 'ford'{']}'}</code></p>
                    </td>
                </tr>
                <tr>
                    <td>customLabelRenderer</td>
                    <td>Function</td>
                    <td>
                        <p>Allows you to format your own select label</p>
                        <p>The customLabelRenderer function returns an array option objects
                            <br />
                            e.g. <code>{'[{'}name: select.name, value: option.value, text: option.text{'}]'}</code>
                        </p>
                        <p>To use this feature you need to return some JSX; using
                        values from the above object to create your own custom label.</p>
                    </td>
                </tr>
                <tr>
                    <td>noSelectionLabel</td>
                    <td>string</td>
                    <td>
                        A custom label to be used when nothing is selected.
                        When used, the first option is not automatically selected
                    </td>
                </tr>
                <tr>
                    <td>onChange</td>
                    <td>Function</td>
                    <td><p>Listen for changes in selection</p>
                        <p>returns:
                            <br />
                            <code>
                            {'{'}
                            altered: boolean,
                            options: {'{['}name: select.name, value: option.value, text: option.text
                            {']}}'}
                        </code>
                        </p>
                        <p>
                            Note: {' '}
                            <code>altered</code> signifies whether a select has been changed from it's original value.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>onBlur</td>
                    <td>Function</td>
                    <td><p>Listen for blur when select loses focus</p>
                        <p>
                            returns:
                            <br />
                            <code>
                            {'{'}
                            altered: boolean,
                            options: {'[{'} name: select.name, value: option.value, text: option.text {'}]}'}
                            </code>
                        </p>
                        <p>Note: {' '}
                            <code>altered</code> signifies whether a select has been changed from it's original value.
                        </p>
                    </td>
                </tr>
            </table>
        </div>
    ),
);
