import * as React from 'react';
import RRS, { IOption, IOutputSingleSelect } from '../../../ReactResponsiveSelect';
import { CaretIcon } from '../../components/Icons';

interface IFormProps {
    brands: IOption[];
    models: IOption[];
    colours: IOption[];
    selectedBrand: string;
    selectedModel: string;
    selectedColour: string;
    functions: {
        handleChangeBrand: (newValue: IOutputSingleSelect) => void;
        handleChangeModel: (newValue: IOutputSingleSelect) => void;
        handleChangeColour: (newValue: IOutputSingleSelect) => void;
        handleSubmit: (event: any) => void;
    };
}

export const Form = ({
    brands,
    models,
    colours,
    selectedBrand,
    selectedModel,
    selectedColour,
    functions: {
        handleChangeBrand,
        handleChangeModel,
        handleChangeColour,
        handleSubmit,
    },
}: IFormProps): React.ReactElement => (
    <form>
        <RRS
            name="brand"
            key="brands"
            options={brands}
            caretIcon={<CaretIcon />}
            prefix="Brand: "
            selectedValue={selectedBrand}
            onChange={handleChangeBrand}
            onSubmit={handleSubmit}
        />
        <RRS
            name="models"
            key={`models_${selectedBrand}`}
            options={models}
            disabled={selectedBrand === 'null'}
            caretIcon={<CaretIcon />}
            prefix="Model: "
            selectedValue={selectedModel}
            onChange={handleChangeModel}
            onSubmit={handleSubmit}
        />
        <RRS
            name="colour"
            key={`colours_${selectedBrand}_${selectedModel}`}
            options={colours}
            disabled={selectedModel === 'null'}
            caretIcon={<CaretIcon />}
            prefix="Colour: "
            selectedValue={selectedColour}
            onChange={handleChangeColour}
            onSubmit={handleSubmit}
        />
    </form>
);
