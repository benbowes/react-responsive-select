import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const MultiSelectOptionProps = {
  index: PropTypes.number.isRequired,
  isOptionsPanelOpen: PropTypes.bool.isRequired,
  multiSelectSelectedIndexes: PropTypes.arrayOf(PropTypes.number),
  nextPotentialSelectionIndex: PropTypes.number,
  option: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    markup: PropTypes.element,
    disabled: PropTypes.bool,
  }).isRequired,
};
