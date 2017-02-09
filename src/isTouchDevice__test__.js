import jsdom from 'jsdom';
import { expect } from 'chai';
import isTouchDevice from './isTouchDevice';

describe('isTouchDevice', () => {

  it('should return false when NOT a touch enabled device', () => {
    expect(isTouchDevice()).to.equal(false);
  });

  it('should return true when a touch enabled device is assumed via "ontouchstart" in window', () => {
    jsdom.env({
      html: '<html></html>',
      done: function (error, window) {
        window['ontouchstart'] = 'fakeEvent';
        expect(isTouchDevice()).to.equal(true);
      }
    });
  });

  it('should return true when a touch enabled device is assumed via navigator.msMaxTouchPoints > 0', () => {
    jsdom.env({
      html: '<html></html>',
      done: function (error, window) {
        window.navigator.msMaxTouchPoints = 1;
        expect(isTouchDevice()).to.equal(true);
      }
    });
  });

  it('should return true when a touch enabled device is assumed via navigator.MaxTouchPoints > 0', () => {
    jsdom.env({
      html: '<html></html>',
      done: function (error, window) {
        window.navigator.MaxTouchPoints = 1;
        expect(isTouchDevice()).to.equal(true);
      }
    });
  });

});
