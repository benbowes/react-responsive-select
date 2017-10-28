import PropTypes from 'prop-types';

export const MultiSelectOptionProps = {
  index: PropTypes.number.isRequired,
  isOptionsPanelOpen: PropTypes.bool.isRequired,
  multiSelectSelectedIndexes: PropTypes.arrayOf(
    PropTypes.number
  ),
  nextPotentialSelectionIndex: PropTypes.number,
  option: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    markup: PropTypes.element
  }).isRequired
};
