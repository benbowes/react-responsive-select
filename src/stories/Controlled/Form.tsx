import * as React from 'react';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { CaretIcon } from '../components/CaretIcon';
import { Context } from './Context';
import { IContext } from './types';

import '../../ReactResponsiveSelect.css';
import './Controlled.css';

export const Form = (): React.ReactElement<HTMLFormElement> => (
    <Context.Consumer>
        {({
            isSingleSelect,
            isDisabled,
            selectedValue,
            selectedValues,
            initialState: {
                singleSelectOptions,
                multiSelectOptions,
            },
            functions: {
                handleSelectOption,
                handleSingleSelectChange,
                handleSelectOptions,
                handleMultiSelectChange,
                handleSelectTypeChange,
                handleDisabledChange,
                handleSubmit,
            },
        }: IContext): React.ReactElement<HTMLFormElement> => (
                <form>
                    {isSingleSelect
                        ? (
                            <ReactResponsiveSelect
                                name="make1"
                                disabled={isDisabled}
                                options={singleSelectOptions}
                                caretIcon={<CaretIcon />}
                                prefix="Make1: "
                                selectedValue={selectedValue}
                                onChange={handleSingleSelectChange}
                                onSubmit={handleSubmit}
                            />
                        )
                        : (
                            <ReactResponsiveSelect
                                multiselect={true}
                                disabled={isDisabled}
                                name="make2"
                                options={multiSelectOptions}
                                caretIcon={<CaretIcon />}
                                noSelectionLabel="Please select"
                                selectedValues={selectedValues}
                                onChange={(newValue: any): void => {
                                    if (handleMultiSelectChange !== undefined) {
                                        handleMultiSelectChange(newValue);
                                    }
                                }}
                                onSubmit={handleSubmit}
                            />
                        )
                    }

                    <br/>

                    <fieldset>
                        <legend>Select options via first letter</legend>
                        {isSingleSelect
                        ? (
                            <input
                                className="controlling-input"
                                type="text"
                                name="firstLetter"
                                placeholder="Select option by typing the first letter"
                                onKeyUp={(e: any): void => handleSelectOption && handleSelectOption(e)}
                            />
                        )
                        : (
                            <input
                                className="controlling-input"
                                type="text"
                                name="firstLetters"
                                placeholder="Select options via comma-delimited first letters e.g. 'a,s,f'"
                                onKeyUp={(e: any): void => handleSelectOptions && handleSelectOptions(e)}
                            />
                        )}

                        <span className="first-letter-instructions">
                            <b>a</b>lfa-romeo, <b>b</b>mw, <b>f</b>iat, <b>l</b>exus, <b>m</b>organ, <b>s</b>ubaru
                        </span>

                        <br/>{' '}<br/>

                        <div>
                            <label>
                                <input
                                    className="controlling-radio"
                                    checked={isSingleSelect}
                                    onChange={handleSelectTypeChange}
                                    type="radio"
                                    name="selectType"
                                    value="single-select"
                                />
                                Single Select
                            </label>
                            <label>
                                <input
                                    className="controlling-radio"
                                    checked={!isSingleSelect}
                                    onChange={handleSelectTypeChange}
                                    type="radio"
                                    name="selectType"
                                    value="multi-select"
                                />
                                Multi Select
                            </label>
                            <label>
                                <input
                                    className="controlling-radio"
                                    checked={isDisabled}
                                    onChange={handleDisabledChange}
                                    type="checkbox"
                                    name="disabled"
                                    value="is-disabled"
                                />
                                Disabled
                            </label>
                        </div>
                    </fieldset>
                </form>
            )}
    </Context.Consumer>
);
