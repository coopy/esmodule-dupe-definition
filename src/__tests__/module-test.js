'use strict';

let Module;

describe('module', () => {
    beforeEach(() => {
        Module = require('../module');
    });

    it('works', () => {
        Module.run();
    });
});
