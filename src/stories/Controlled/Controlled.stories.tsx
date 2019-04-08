import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { wInfo } from '../../utils/wInfo';
import { MultiSelectOptionMarkup } from '../components/MultiSelectOptionMarkup';
import { Context } from './Context';
import { Form } from './Form';
import { IState } from './types';

class ControlledExampleApp extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedValue: 'null',
            initialSelectedValue: 'null',
            selectedValues: [],
            initialSelectedValues: [],
            isSingleSelect: true,
            isDisabled: false,
            initialSingleSelectOptions: [
                { value: 'null', text: 'Any' },
                { value: 'alfa-romeo', text: 'Alfa Romeo' },
                { value: 'bmw', text: 'BMW' },
                { value: 'fiat', text: 'Fiat' },
                { value: 'lexus', text: 'Lexus' },
                { value: 'morgan', text: 'Morgan' },
                { value: 'subaru', text: 'Subaru' },
            ],
            initialMultiSelectOptions: [
                {
                    value: 'null',
                    text: 'Any',
                    markup: <MultiSelectOptionMarkup text="Any" />,
                },
                {
                    value: 'alfa-romeo',
                    text: 'Alfa Romeo',
                    markup: <MultiSelectOptionMarkup text="Alfa Romeo" />,
                },
                {
                    value: 'bmw',
                    text: 'BMW',
                    markup: <MultiSelectOptionMarkup text="BMW" />,
                },
                {
                    value: 'fiat',
                    text: 'Fiat',
                    markup: <MultiSelectOptionMarkup text="Fiat" />,
                },
                {
                    value: 'lexus',
                    text: 'Lexus',
                    markup: <MultiSelectOptionMarkup text="Lexus" />,
                },
                {
                    value: 'morgan',
                    text: 'Morgan',
                    markup: <MultiSelectOptionMarkup text="Morgan" />,
                },
                {
                    value: 'subaru',
                    text: 'Subaru',
                    markup: <MultiSelectOptionMarkup text="Subaru" />,
                },
            ],
            functions: {
                handleSelectOption: this.handleSelectOption,
                handleSelectOptions: this.handleSelectOptions,
                handleSingleSelectChange: this.handleSingleSelectChange,
                handleMultiSelectChange: this.handleMultiSelectChange,
                handleSelectTypeChange: this.handleSelectTypeChange,
                handleDisabledChange: this.handleDisabledChange,
                handleSubmit: this.handleSubmit,
            },
        };
    }

    public getMultiSelectValue = (newValue: {
        options: Array<{
            name: string;
            text: string;
            value: string;
        }>;
        altered?: boolean;
    }): {
        [key: string]: {
            options: Array<{
                name: string;
                text: string;
                value: string;
            }>;
            altered?: boolean;
        },
    } => ({
        [newValue.options[0].name]: {
            options: [...newValue.options],
            altered: newValue.altered,
        },
    })

    public handleSelectOption = (e: any): void => {
        const { initialSingleSelectOptions } = this.state;
        const firstLetter = e.target.value.charAt(0);
        const foundValue: any =
            initialSingleSelectOptions.filter(
                (v: { value: string }) => v.value.charAt(0) === firstLetter,
            )[0] || {};

        this.setState({
            selectedValue: foundValue.value || '',
        });
    }

    public handleSelectOptions = ({ target: { value = '' }}: any): void => {
        const { initialMultiSelectOptions } = this.state;
        const firstLetters = value.split(',');
        const foundValues = initialMultiSelectOptions
            .filter((option: any) =>
                firstLetters.some((letter: string) => option.value.charAt(0) === letter.charAt(0)),
            )
            .map((option: any) => option.value);

        this.setState({ selectedValues: foundValues });
    }

    public handleSingleSelectChange = (newValue: any): void => {
        const formValue = {
            [newValue.name]: {
                text: newValue.text,
                value: newValue.value,
                altered: newValue.altered,
            },
            selectedValue: newValue.value,
        };

        // Merge new value over top of existing value
        this.setState({ ...this.state, ...formValue }, () =>
            console.log('handleChange()', this.state),
        );
    }

    public handleMultiSelectChange = (newValue: any): void => {
        const formValue = this.getMultiSelectValue(newValue);
        console.log(newValue);
        // Merge new value over top of existing value
        this.setState({
            ...this.state,
            ...formValue,
            selectedValues: newValue.options.reduce(
                (acc: any, v: any) => (v.value !== 'null' ? [...acc, v.value] : acc),
                [],
            ),
        });
    }

    public handleSelectTypeChange = (e: any): void => {
        this.setState({ isSingleSelect: e.target.value === 'single-select' });
    }

    public handleDisabledChange = (e: any): void => {
        this.setState({ isDisabled: e.target.checked });
    }

    public handleSubmit = (): void => {
        console.log('handleSubmit()', this.state);
    }

    public render(): React.ReactNode {
        const { selectedValue, selectedValues, isSingleSelect, isDisabled } = this.state;
        return (
            <>
                <Context.Provider value={this.state}>
                    <Form />
                    <pre>{JSON.stringify({ selectedValue, selectedValues, isSingleSelect, isDisabled }, null, 2)}</pre>
                </Context.Provider>
            </>
        );
    }
}

const stories = storiesOf('Controlled', module);

stories.add(
    'Using RRS as a controlled component with the ContextAPI',
    wInfo()(() => (
        <ControlledExampleApp />
    )),
);
