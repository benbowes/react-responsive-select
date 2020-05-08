import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Code } from '../../components/Code';
import '../../stories.css';

const stories = storiesOf('Info', module);

stories.add(
    'API',
    () => (
        <div>
            <h1>API</h1>
            <h2 className="table-header">
                SingleSelect mode
                <small>* And MultiSelect mode - some ammendments below</small>
            </h2>
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
                            
                            <Code>
                            {
`{
    text: "Fiat",
    value: "fiat",
    markup: <span>Fiat</span>,
    disabled: true
}`
                            }
                            </Code>
                            
                        </p>
                        <p>or</p>
                        <p>
                            
                            <Code>
                                {
`{
    text: "Cars",
    optHeader: true
}`
                                }
                            </Code>
                            
                        </p>

                        <table>
                            <tr>
                                <th>param</th>
                                <th>type</th>
                                <th>required</th>
                                <th>description</th>
                            </tr>
                            <tr>
                                <td>text</td>
                                <td>String</td>
                                <td>yes</td>
                                <td>display value for the select and the default for the option label</td>
                            </tr>
                            <tr>
                                <td>value</td>
                                <td>String</td>
                                <td>yes</td>
                                <td>value that is submitted</td>
                            </tr>
                            <tr>
                                <td>markup</td>
                                <td>JSX</td>
                                <td>&nbsp;</td>
                                <td>JSX markup used as the option label. Allows for the use of badges and icons...</td>
                            </tr>
                            <tr>
                                <td>optHeader</td>
                                <td>Boolean</td>
                                <td>&nbsp;</td>
                                <td>Will display an option header when present. Use with a <code>text</code> property</td>
                            </tr>
                            <tr>
                                <td>disabled</td>
                                <td>Boolean</td>
                                <td>&nbsp;</td>
                                <td>disable option - option cannot be selected and is greyed</td>
                            </tr>
                        </table>

                        <br />
                        
                        
                        <p>Note: <code>text</code> is used as the option label when <code>markup</code> is not present</p>
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
                        <p>returns:</p>
                        <p>
                            <Code>
                            {`{
    altered: boolean,
    value: option.value,
    text: option.text,
    name: The name prop you gave RRS
}`}
                            </Code>
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
                            
                            <Code>
                            {`{
    altered: boolean,
    value: option.value,
    text: option.text,
    name: The name prop you gave RRS
}`}
                            </Code>
                            
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
                        <p>Allows you to format your own custom select label.</p>
                        <p>
                            The customLabelRenderer function returns an array option objects.
                            To use this feature, you need to construct and return some JSX using the below param
                        </p>
                        <p>
                            <Code>
                            {`{
    value: option.value,
    text: option.text,
    name: The name prop you gave RRS
}`}
                            </Code>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>onListen</td>
                    <td>Function</td>
                    <td>
                        <p>Allows you to hook into changes in RRS</p>
                        <p>
                            The onListen function returns the following:
                        </p>
                        <table>
                            <tr>
                                <th>param</th>
                                <th>type</th>
                                <th>description</th>
                            </tr>
                            <tr>
                                <td>isOpen</td>
                                <td>Boolean</td>
                                <td>Whether the options panel is currently open or closed</td>
                            </tr>
                            <tr>
                                <td>name</td>
                                <td>string</td>
                                <td>The name prop you passed into the ReactResponsiveSelect component</td>
                            </tr>
                            <tr>
                                <td>actionType</td>
                                <td>String</td>
                                <td>The internal action type that was fired within RRS</td>
                            </tr>
                        </table>
                        
                        <br />

                        <p>
                         Handy for those situations where you need to change something potentially
                         outside of your control, e.g. setting a class on {'<body/>'} when the options panel opens to inhibit body scrolling.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>onSelect</td>
                    <td>Function</td>
                    <td>
                        <p>
                            The onSelect function returns the following:

                            <br />
                            
                            <Code>
                            {`{
    value: option.value,
    text: option.text,
    name: The name prop you gave RRS
}`}
                            </Code>
                            
                        </p>
                    </td>
                </tr>
            </table>

            <h2 className="table-header">
                MultiSelect mode
                <small>* Same as SingleSelect mode, but with the following amendments</small>
            </h2>

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
                    <td>onChange</td>
                    <td>Function</td>
                    <td><p>Listen for changes in selection</p>
                        <p>returns:
                            <br />
                            <Code>
                            {`{
    altered: boolean,
    options: [{
        text: option.text,
        value: option.value,
        name: The name prop you gave RRS
    ]
}`}
                            </Code>
                            
                        </p>
                        <br />
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
                            <Code>
                            {`{
    altered: boolean,
    options: [{
        value: option.value,
        text: option.text,
        name: The name prop you gave RRS
    }]
}`}
                            </Code>
                        </p>
                        <p>
                            Note: {' '}
                            <code>altered</code> signifies whether a select has been changed from it's original value.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>onSelect</td>
                    <td>Function</td>
                    <td>
                        <p>
                            The onSelect function returns the following:

                            <br />
                            
                            <Code>
                            {`{
    value: option.value,
    text: option.text,
    name: The name prop you gave RRS
}`}
                            </Code>
                            
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>onDeselect</td>
                    <td>Function</td>
                    <td>
                        <p>
                            The onDeselect function returns the following:

                            <br />
                            
                            <Code>
                            {`{
    value: option.value,
    text: option.text,
    name: The name prop you gave RRS
}`}
                            </Code>
                            
                        </p>
                    </td>
                </tr>
            </table>
        </div>
    ),
);
