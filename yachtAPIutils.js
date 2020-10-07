/*
 * Utils
 *
 * 
 */
'use strict';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Mathematics

exports.isSequential = function(array) {
  for (var i = 1; i < array.length; ++i) {
    if (array[i] - array[i - 1] !== 1) {
      return false;
    }
  }
  return true;
};