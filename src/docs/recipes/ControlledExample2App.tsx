import * as React from 'react';
import { IOption } from '../../react-responsive-select'; // 'react-responsive-select'
import { Form } from './ControlledExample2Form';
import { BRANDS, COLOURS, MODELS, TColoursOption, TModelsOption } from './ControlledExample2MockProps';

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
  };
}

export class ControlledExample2App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedBrand: 'null',
      selectedModel: 'null',
      selectedColour: 'null',
      brands: BRANDS,
      models: MODELS,
      colours: COLOURS,
      functions: {
        handleChangeBrand: this.handleChangeBrand,
        handleChangeModel: this.handleChangeModel,
        handleChangeColour: this.handleChangeColour,
        handleSubmit: this.handleSubmit,
      },
    };
  }

  public handleChangeBrand = (newValue: IOption): void => {
    const models = MODELS.filter(
      (option: TModelsOption & { brand: string }) => option.brand === newValue.value || option.value === 'null'
    );

    const colours = COLOURS.filter(
      (option: TColoursOption) =>
        option.brands.some((brand: string) => brand === newValue.value) || option.value === 'null'
    );

    this.setState({
      selectedBrand: newValue.value || '',
      selectedModel: 'null',
      selectedColour: 'null',
      models,
      colours,
    });
  };

  public handleChangeModel = (newValue: IOption): void => {
    const selectedBrand = MODELS.find((model: TModelsOption) => model.value === newValue.value)?.brand || '';

    const colours = COLOURS.filter(
      (option: TColoursOption) =>
        option.brands.some((brand: string) => brand === selectedBrand) || option.value === 'null'
    );

    this.setState({
      selectedModel: newValue.value || '',
      colours,
    });
  };

  public handleChangeColour = (newValue: IOption): void => {
    this.setState({
      selectedColour: newValue.value || '',
    });
  };

  public handleSubmit = (event: any): void => {
    console.log('handleSubmit()', this.state, event);
  };

  public render(): React.ReactElement {
    return <Form {...this.state} />;
  }
}
