import * as React from 'react';
import { IProps, IState } from '../types/';

interface TArgs {
  state: IState;
  props: IProps;
}

export function getCustomLabelText({ state, props }: TArgs): React.ReactNode {
  const { multiselect, customLabelRenderer } = props;
  const { multiSelectSelectedOptions, singleSelectSelectedOption } = state;

  if (!customLabelRenderer) return false;

  if (multiselect) {
    return customLabelRenderer(multiSelectSelectedOptions);
  }

  return customLabelRenderer(singleSelectSelectedOption);
}
