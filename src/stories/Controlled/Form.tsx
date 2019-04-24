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
                                onChange={handleMultiSelectChange}
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
                                autoFocus={true}
                                name="firstLetter"
                                placeholder="Select option by typing the first letter"
                                onKeyUp={handleSelectOption}
                            />
                        )
                        : (
                            <input
                                className="controlling-input"
                                type="text"
                                autoFocus={true}
                                name="firstLetters"
                                placeholder="Select options via comma-delimited first letters e.g. 'a,s,f'"
                                onKeyUp={handleSelectOptions}
                            />
                        )}

                        <span className="first-letter-instructions">
                            <b>a</b>lfa-romeo, <b>b</b>mw, <b>f</b>iat, <b>l</b>exus, <b>m</b>organ, <b>s</b>ubaru
                        </span>

                        <br/>{' '}<br/>

                        <ul>
                            <li>
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
                            </li>
                            <li>
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
                            </li>
                            <li>
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
                            </li>
                        </ul>
                    </fieldset>
                </form>
            )}
    </Context.Consumer>
);
