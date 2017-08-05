import { expect } from 'chai';
import simpleArraysEqual from './simpleArraysEqual';

describe('simpleArraysEqual', () => {

  it('should determine whether 2 empty arrays equal', () => {
    const arrayA = [];
    const arrayB = [];

    expect(simpleArraysEqual(arrayA, arrayB)).to.equal(true);
  });

  it('should determine whether an array of numbers has changed', () => {
    const arrayA = [1,2,3];
    const arrayB = [1,2];

    expect(simpleArraysEqual(arrayA, arrayB)).to.equal(false);
  });

  it('should determine whether an array of strings has changed', () => {
    const arrayA = ['a','b','c'];
    const arrayB = ['a','b','c','d'];

    expect(simpleArraysEqual(arrayA, arrayB)).to.equal(false);
  });

  it('should determine whether an array of booleans has changed', () => {
    const arrayA = [true,true,false];
    const arrayB = [true,true,false,true];

    expect(simpleArraysEqual(arrayA, arrayB)).to.equal(false);
  });

  it('should determine whether an array of strings is the same', () => {
    const arrayA = ['a','b','c'];
    const arrayB = ['a','b','c'];

    expect(simpleArraysEqual(arrayA, arrayB)).to.equal(true);
  });

  it('should determine whether an array of numbers is the same', () => {
    const arrayA = [1,2,3];
    const arrayB = [1,2,3];

    expect(simpleArraysEqual(arrayA, arrayB)).to.equal(true);
  });

  it('should determine whether an array of booleans is the same', () => {
    const arrayA = [true,true,false,true];
    const arrayB = [true,true,false,true];

    expect(simpleArraysEqual(arrayA, arrayB)).to.equal(true);
  });

  it('should determine whether a mixed array of strings, numbers and booleans is the same', () => {
    const arrayA = [true,true,false,true,1,5,'seven'];
    const arrayB = [true,true,false,true,1,5,'seven'];

    expect(simpleArraysEqual(arrayA, arrayB)).to.equal(true);
  });
});
