import { createContext } from "react";
import { IOption } from '../../../ReactResponsiveSelect';

export const Context = createContext({
  selectedBrand: "null",
  selectedModel: "null",
  selectedColour: "null",
  brands: [],
  models: [],
  colours: [],
  functions: {
    handleChangeBrand: (newValue: IOption) => { },
    handleChangeModel: (newValue: IOption) => { },
    handleChangeColour: (newValue: IOption) => { },
    handleSubmit: (event: any) => { },
  },
});
