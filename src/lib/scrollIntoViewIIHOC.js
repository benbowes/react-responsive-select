import ReactDOM from 'react-dom';

// Inheritence Inversion HOC https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#5247
const scrollIntoViewIIHOC = WrappedComponent => class extends WrappedComponent {
  /*
  * @prop {function} scrollIntoViewScrollPaneRef - react ref lookup function
  * @prop {string} scrollIntoViewElementSelector - a class selector as used by element.querySelector()
  * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector} for element.querySelector()
  * @see {@link https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors} for CSS/Selectors

  * @description
  * scrollIntoViewScrollPaneRef is a DOM reference for the scroll pane used to determine whether
  * an element is in or out of view. The pane is scrolled if the element is out of view.
  */

  scrollIntoView() {
    const { scrollIntoViewElementSelector, scrollIntoViewScrollPaneRef, isDragging } = this.props;
    this.scrollPaneDOM = this.scrollPaneDOM || scrollIntoViewScrollPaneRef();
    this.elementDOM = this.elementDOM || ReactDOM.findDOMNode(this);
    const isCurrentHighlightedOption = this.elementDOM.classList.contains( scrollIntoViewElementSelector );

    if (isDragging === true) this.dontScrollIntoView = true; // if dragged - kill scrollIntoView
    if (
      !this.dontScrollIntoView &&
      isCurrentHighlightedOption
    ) {

      const topOfScrollPane = this.scrollPaneDOM.getBoundingClientRect().top;
      const bottomOfScrollPane = this.scrollPaneDOM.getBoundingClientRect().bottom;
      const topOfElement = this.elementDOM.getBoundingClientRect().top;
      const bottomOfElement = this.elementDOM.getBoundingClientRect().bottom;

      if (bottomOfElement > bottomOfScrollPane) {
        this.scrollPaneDOM.scrollTop += this.elementDOM.getBoundingClientRect().height;
      }

      if (topOfElement < topOfScrollPane) {
        this.scrollPaneDOM.scrollTop -= this.elementDOM.getBoundingClientRect().height;
      }

      // Scroll to show first option if first option selected - so as to have it in view
      if (this.elementDOM.getAttribute('data-key') === '0') {
        this.scrollPaneDOM.scrollTop = 0;
      }

      // Else - no need to scroll
    }
  }

  componentDidUpdate() {
    if (super.componentDidUpdate) super.componentDidUpdate();
    return this.scrollIntoView();
  }

  render() {
    return super.render(); // super render so that IIHOC.componentDidUpdate fires
  }
};

export default scrollIntoViewIIHOC;
