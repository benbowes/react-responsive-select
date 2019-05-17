import * as React from "react";
import RRS from '../../../ReactResponsiveSelect';
import { CaretIcon } from "../../components/CaretIcon";
import { Context } from "./Context";

export const Form = () => (
    <Context.Consumer>
        {({
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
                handleSubmit
            }
        }) => (
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
                        disabled={selectedBrand === "null"}
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
                        disabled={selectedModel === "null"}
                        caretIcon={<CaretIcon />}
                        prefix="Colour: "
                        selectedValue={selectedColour}
                        onChange={handleChangeColour}
                        onSubmit={handleSubmit}
                    />
                </form>
            )}
    </Context.Consumer>
);
