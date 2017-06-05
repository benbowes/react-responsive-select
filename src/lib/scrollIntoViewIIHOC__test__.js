import React, { Component } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import scrollIntoViewIIHOC from './scrollIntoViewIIHOC';
let containerRef = {};

class ItemComponent extends Component {
  render() {
    return (
      <div
        data-key={this.props.dataKey} // eslint-disable-line
        ref={r => { this.item = r;}}
        className={this.props.classes} // eslint-disable-line
      >
        Item
      </div>
    );
  }
}

const ItemComponentHOC = scrollIntoViewIIHOC(ItemComponent);

class ContainerComponent extends Component { // eslint-disable-line
  render() {
    return (
      <div
        ref={(r) => { if (r) { containerRef = r; }}}
        className="container"
        style={{height:'300px', overflow:'auto'}}
      >
        {[0,1,2,3,4,5].map(v => (
          <ItemComponentHOC
            key={v}
            dataKey={v}
            scrollIntoViewScrollPaneRef={() => containerRef}
            scrollIntoViewElementSelector={'item'}
            classes={v === this.props.selectedItem ? 'item selected' : 'item'} // eslint-disable-line
          />
        ))}
      </div>
    );
  }
}

describe('Scroll into view', () => {

  let containerComponent;

  before(() => {
    containerComponent = mount(<ContainerComponent selectedItem={1} />);
    containerRef.getBoundingClientRect = () => ({
      width: 300, height: 300, top: 0, left: 0, right: 300, bottom: 300
    });
  });

  after(() => {
    containerComponent.unmount();
  });

  it('should scroll option into view when incrementing out of the viewable option area', () => {
    const selectedItem = containerComponent.find('.item').get(5);
    containerRef.scrollTop = 0;
    selectedItem.getBoundingClientRect = () => ({
      width: 300, height: 100, top: 500, left: 0, right: 300, bottom: 600
    });

    containerComponent.setProps({ selectedItem: 5 });
    expect( containerRef.scrollTop ).to.equal(100);
  });

  it('should scroll option into view when incrementing out of the viewable option area', () => {
    const selectedItem = containerComponent.find('.item').get(2);
    containerRef.scrollTop = 0;
    selectedItem.getBoundingClientRect = () => ({
      width: 300, height: 100, top: -100, left: 0, right: 300, bottom: 0
    });

    containerComponent.setProps({ selectedItem: 2 });
    expect( containerRef.scrollTop ).to.equal(0);
  });

  it('should scroll back to first option when all items are deseleted', () => {
    containerRef.scrollTop = 500;

    containerComponent.setProps({ selectedItem: 0 });
    expect( containerRef.scrollTop ).to.equal(0);
  });
});
