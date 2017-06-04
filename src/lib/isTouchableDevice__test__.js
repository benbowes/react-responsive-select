import { expect } from 'chai';
import isTouchableDevice from './isTouchableDevice';

describe('isTouchableDevice', () => {

  it('should return false when NOT a touch enabled device', () => {
    expect(isTouchableDevice()).to.equal(false);
  });

  it('should return true when a touch enabled device is assumed via "ontouchstart" in window', () => {
    window['ontouchstart'] = 'fakeEvent';
    expect(isTouchableDevice()).to.equal(true);
    delete window.ontouchstart;
  });

  it('should return true when a touch enabled device is assumed via navigator.msMaxTouchPoints > 0', () => {
    window.navigator.msMaxTouchPoints = 1;
    expect(isTouchableDevice()).to.equal(true);
    window.navigator.msMaxTouchPoints = 0;
  });

  it('should return true when a touch enabled device is assumed via navigator.MaxTouchPoints > 0', () => {
    window.navigator.MaxTouchPoints = 1;
    expect(isTouchableDevice()).to.equal(true);
    window.navigator.MaxTouchPoints = 0;
  });

});
