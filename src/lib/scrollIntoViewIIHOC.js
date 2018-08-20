import ReactDOM from 'react-dom';
import containsClassName from './containsClassName';

// Inheritence Inversion HOC https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#5247
const scrollIntoViewIIHOC = WrappedComponent =>
  class extends WrappedComponent {
    /*
  * scrollIntoViewScrollPaneRef is a DOM reference for the scroll pane used to determine whether
  * an element is in or out of view. The pane is scrolled if the element is out of view.
  * @prop {function} scrollIntoViewScrollPaneRef - react ref lookup function
  * @prop {string} scrollIntoViewElementSelector - a class selector as used by element.querySelector()
  */

    scrollIntoView() {
      const {
        scrollIntoViewElementSelector,
        scrollIntoViewScrollPaneRef,
        isDragging,
      } = this.props;
      this.scrollPaneDOM = this.scrollPaneDOM || scrollIntoViewScrollPaneRef();
      // eslint-disable-next-line react/no-find-dom-node
      this.elementDOM = this.elementDOM || ReactDOM.findDOMNode(this);
      const isCurrentHighlightedOption = containsClassName(
        this.elementDOM,
        scrollIntoViewElementSelector,
      );

      if (isDragging === true) this.dontScrollIntoView = true; // if dragged, it is a touch screen - kill scrollIntoView

      if (!this.dontScrollIntoView && isCurrentHighlightedOption) {
        const topOfScrollPane = this.scrollPaneDOM.getBoundingClientRect().top;
        const bottomOfScrollPane = this.scrollPaneDOM.getBoundingClientRect()
          .bottom;
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
