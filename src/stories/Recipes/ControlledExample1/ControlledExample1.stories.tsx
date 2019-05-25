import { storiesOf } from '@storybook/react';
import * as React from 'react';
import RRS, { IOption } from '../../../ReactResponsiveSelect';
import { withStoryBookInfo } from '../../../utils/withStoryBookInfo';

import './Controlled.css';

interface IData {
    year: number;
    quarters: number[];
}

const DATA = [
    { year: 2000, quarters: [1, 2, 3, 4] },
    { year: 2001, quarters: [1, 2, 3] },
    { year: 2002, quarters: [2, 3] },
    { year: 2004, quarters: [1, 4] },
    { year: 2005, quarters: [1, 2, 3, 4] },
];

interface IState {
    years: IOption[];
    quarters: IOption[];
    selectedYear: string;
    selectedQuarter: string;
}

class ControlledExampleApp extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            years: DATA.map((item: IData) => ({
                text: item.year.toString(),
                value: item.year.toString(),
            })),
            quarters: this.extractQuarters(DATA[0].quarters),
            selectedYear: DATA[0].year.toString(),
            selectedQuarter: DATA[0].quarters[0].toString(),
        };
    }

    public extractQuarters(quarters: number[]): IOption[] {
        return quarters.map((quarter: number) => ({
            text: quarter.toString(),
            value: quarter.toString(),
        }));
    }

    public onChangeYear = (newValue: IOption): void => {
        const selectedYearDataFragment = DATA.find(
            (item: IData): boolean => item.year.toString() === newValue.value,
        );

        this.setState({
            selectedYear: newValue.value,
            selectedQuarter: selectedYearDataFragment.quarters[0].toString(),
            quarters: this.extractQuarters(selectedYearDataFragment.quarters),
        });
    }

    public onChangeQuarter = (newValue: IOption): void => {
        this.setState({ selectedQuarter: newValue.value });
    }

    public render(): React.ReactNode {
        const { years, selectedYear, quarters, selectedQuarter } = this.state;

        return (
            <form className="form">
                <div className="form__item">
                    <label htmlFor="rrs-year-menu">Year</label>
                    <RRS
                        selectedValue={selectedYear}
                        name="year"
                        options={years}
                        onChange={this.onChangeYear}
                    />
                </div>
                <div className="form__item">
                    <label htmlFor="rrs-year-menu">Financial quarter</label>
                    <RRS
                        key={selectedYear} // Added key, will reset this RRS when selectedYear changes
                        selectedValue={selectedQuarter}
                        name="quarters"
                        options={quarters}
                        onChange={this.onChangeQuarter}
                    />
                </div>
            </form>
        );
    }
}

const stories = storiesOf('Recipes', module);

stories.add(
    'Controlled example 1',
    withStoryBookInfo()(() => (
        <ControlledExampleApp />
    )),
);
