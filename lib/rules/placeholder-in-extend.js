'use strict';

var gonzales = require('gonzales-pe'),
    util = require('util'),
    merge = require('merge');

function log (input) {
  console.log(util.inspect(input, false, null));
}

module.exports = {
  'name': 'placeholder-in-extend',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('extend', function (extend, i, parent) {
      extend.forEach('simpleSelector', function (selector) {
	var placeholder = false;
	selector.content.forEach(function (selectorPiece) {
	  if (selectorPiece.type === 'placeholder') {
	    placeholder = true;
	  }
	});

	if (!placeholder) {
	  result.push({
	    'ruleId': parser.rule.name,
	    'line': selector.start.line,
	    'column': selector.start.column,
	    'message': '@extend must be used with a %placeholder',
	    'severity': parser.severity
	  })
	}
      })
    });

    return result;
  }
}