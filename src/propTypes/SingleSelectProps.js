import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const SingleSelectProps = {
  altered: PropTypes.bool,
  caretIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  customLabelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.element,
  ]),
  disabled: PropTypes.bool,
  singleSelectInitialIndex: PropTypes.number,
  singleSelectSelectedIndex: PropTypes.number,
  singleSelectSelectedOption: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  }),
  isDragging: PropTypes.bool,
  isOptionsPanelOpen: PropTypes.bool,
  name: PropTypes.string,
  nextPotentialSelectionIndex: PropTypes.number,
  onSubmit: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  prefix: PropTypes.string,
  noSelectionLabel: PropTypes.string,
  selectedValue: PropTypes.string,
};
