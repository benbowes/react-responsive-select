import jsdom from 'jsdom';
import { expect } from 'chai';
import isTouchableDevice from './isTouchableDevice';

describe('isTouchableDevice', () => {

  it('should return false when NOT a touch enabled device', () => {
    expect(isTouchableDevice()).to.equal(false);
  });

  it('should return true when a touch enabled device is assumed via "ontouchstart" in window', () => {
    jsdom.env({
      html: '<html></html>',
      done: function (error, window) {
        window['ontouchstart'] = 'fakeEvent';
        expect(isTouchableDevice()).to.equal(true);
      }
    });
  });

  it('should return true when a touch enabled device is assumed via navigator.msMaxTouchPoints > 0', () => {
    jsdom.env({
      html: '<html></html>',
      done: function (error, window) {
        window.navigator.msMaxTouchPoints = 1;
        expect(isTouchableDevice()).to.equal(true);
      }
    });
  });

  it('should return true when a touch enabled device is assumed via navigator.MaxTouchPoints > 0', () => {
    jsdom.env({
      html: '<html></html>',
      done: function (error, window) {
        window.navigator.MaxTouchPoints = 1;
        expect(isTouchableDevice()).to.equal(true);
      }
    });
  });

});
