'use strict';

let Main;

describe('main', () => {
    beforeEach(() => {
        Main = require('../main');
    });

    it('works', () => {
        Main.run();
    });
});
