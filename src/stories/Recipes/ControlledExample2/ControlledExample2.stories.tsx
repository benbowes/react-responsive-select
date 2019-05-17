import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { IOption } from '../../../ReactResponsiveSelect';
import { withStoryBookInfo } from '../../../utils/withStoryBookInfo';
import { Form } from "./Form";
import { Context } from "./Context";
import { BRANDS, MODELS, COLOURS } from "./mockProps";

import './Controlled.css';

interface IState {
    selectedBrand: string;
    selectedModel: string;
    selectedColour: string;
    brands: IOption[];
    models: IOption[];
    colours: IOption[];
    functions: {
        handleChangeBrand: (newValue: IOption) => void;
        handleChangeModel: (newValue: IOption) => void;
        handleChangeColour: (newValue: IOption) => void;
        handleSubmit: (event: any) => void;
    }
}

class ControlledExampleApp extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedBrand: "null",
            selectedModel: "null",
            selectedColour: "null",
            brands: BRANDS,
            models: MODELS,
            colours: COLOURS,
            functions: {
                handleChangeBrand: this.handleChangeBrand,
                handleChangeModel: this.handleChangeModel,
                handleChangeColour: this.handleChangeColour,
                handleSubmit: this.handleSubmit
            }
        };
    }

    public handleChangeBrand = (newValue: IOption): void => {
        const models = MODELS.filter(
            option => option.brand === newValue.value || option.value === "null"
        );

        const colours = COLOURS.filter(
            option =>
                option.brands.some(brand => brand === newValue.value) ||
                option.value === "null"
        );

        this.setState(
            {
                selectedBrand: newValue.value,
                selectedModel: "null",
                selectedColour: "null",
                models,
                colours
            },
            () => console.log("handleChangeBrand()", this.state)
        );
    };

    public handleChangeModel = (newValue: IOption): void => {
        const selectedBrand = MODELS.find(model => model.value === newValue.value)
            .brand;

        const colours = COLOURS.filter(
            option =>
                option.brands.some(brand => brand === selectedBrand) ||
                option.value === "null"
        );

        this.setState(
            {
                selectedModel: newValue.value,
                colours
            },
            () => console.log("handleChangeModel()", this.state)
        );
    };

    public handleChangeColour = (newValue: IOption): void => {
        this.setState(
            {
                selectedColour: newValue.value
            },
            () => console.log("handleChangeColour()", this.state)
        );
    };

    public handleSubmit = (event: any): void => {
        console.log("handleSubmit()", this.state);
    };

    public render(): React.ReactNode {
        return (
            <>
                <Context.Provider value={this.state}>
                    <Form />
                </Context.Provider>
            </>
        );
    }
}

const stories = storiesOf('Recipes', module);

stories.add(
    'Controlled example 2',
    withStoryBookInfo()(() => (
        <ControlledExampleApp />
    )),
);
