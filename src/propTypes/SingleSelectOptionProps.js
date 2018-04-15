import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const SingleSelectOptionProps = {
  index: PropTypes.number.isRequired,
  isOptionsPanelOpen: PropTypes.bool.isRequired,
  nextPotentialSelectionIndex: PropTypes.number,
  option: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    markup: PropTypes.element,
  }).isRequired,
  singleSelectSelectedIndex: PropTypes.number,
};
