import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { withStoryBookInfo } from '../../utils/withStoryBookInfo';
import { MultiSelectOptionMarkup } from '../components/MultiSelectOptionMarkup';
import { Context } from './Context';
import { Form } from './Form';
import { IContext, INewSingleSelectValue, INewMultiSelectValue } from './types';
import { IOption } from '../../types/index'; // from ReactResponsiceSelect types

class ControlledExampleApp extends React.Component<{}, IContext> {
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedValue: 'null',
            selectedValues: [],
            isSingleSelect: true,
            isDisabled: false,
            initialState: {
                singleSelectOptions: [
                    { value: 'null', text: 'Any' },
                    { value: 'alfa-romeo', text: 'Alfa Romeo' },
                    { value: 'bmw', text: 'BMW' },
                    { value: 'fiat', text: 'Fiat' },
                    { value: 'lexus', text: 'Lexus' },
                    { value: 'morgan', text: 'Morgan' },
                    { value: 'subaru', text: 'Subaru' },
                ],
                multiSelectOptions: [
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
            },
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

    public getMultiSelectValue = (newValue: INewMultiSelectValue): {
        [key: string]: INewMultiSelectValue,
    } => ({
        [newValue.options[0].name]: {
            options: [...newValue.options],
            altered: newValue.altered,
        },
    })

    public handleSelectOption = (event: any): void => {
        const { initialState } = this.state;
        const firstLetter = event.target.value.charAt(0);
        const foundValue: { text?: string; value?: string; } =
        initialState.singleSelectOptions.filter(
                (option: { value: string }) => option.value.charAt(0) === firstLetter,
            )[0] || {};

        this.setState({ selectedValue: foundValue.value || '' });
    }

    public handleSelectOptions = ({ target: { value = '' }}: any ): void => {
        const { initialState } = this.state;
        const firstLetters = value.split(',');
        const foundValues = initialState.multiSelectOptions
            .filter((option: IOption) =>
                firstLetters.some((letter: string) => option.value.charAt(0) === letter.charAt(0)),
            )
            .map((option: IOption) => option.value);

        this.setState({ selectedValues: foundValues });
    }

    public handleSingleSelectChange = (newValue: INewSingleSelectValue): void => {
        const formValue = {
            [newValue.name]: {
                text: newValue.text,
                value: newValue.value,
                altered: newValue.altered,
            },
            selectedValue: newValue.value,
        };

        this.setState({ ...this.state, ...formValue });
    }

    public handleMultiSelectChange = (newValue: INewMultiSelectValue): void => {
        const formValue = this.getMultiSelectValue(newValue);

        this.setState({
            ...this.state,
            ...formValue,
            selectedValues: newValue.options.reduce(
                (acc: string[], option: IOption) => (
                    option.value !== 'null' ? [...acc, option.value] : acc
                ),
                [],
            ),
        });
    }

    public handleSelectTypeChange = (event: any): void => {
        this.setState({ isSingleSelect: event.target.value === 'single-select' });
    }

    public handleDisabledChange = (event: any): void => {
        this.setState({ isDisabled: event.target.checked });
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
    withStoryBookInfo()(() => (
        <ControlledExampleApp />
    )),
);
