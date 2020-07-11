import * as React from 'react';
import { Select, IOption, IOutputSingleSelect, CaretIcon } from '../../react-responsive-select'; // 'react-responsive-select'

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
  functions: { handleChangeBrand, handleChangeModel, handleChangeColour, handleSubmit },
}: IFormProps): React.ReactElement => (
  <form className="form">
    <div className="form__item">
      <Select
        name="brand"
        key="brands"
        options={brands}
        caretIcon={<CaretIcon />}
        prefix="Brand: "
        selectedValue={selectedBrand}
        onChange={handleChangeBrand}
        onSubmit={handleSubmit}
      />
    </div>
    <div className="form__item">
      <Select
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
    </div>
    <div className="form__item">
      <Select
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
    </div>
  </form>
);
