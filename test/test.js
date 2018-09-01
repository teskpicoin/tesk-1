'use strict';

const expect = require('chai').expect;
const next = require('../dist/next.js').next;

describe('next do test', () => {
    it('exec() should return 123', (done) => {
        let result = '';

        next()
            .do((task) => {
                result += '1';
                task.next();
            })
            .do((task) => {
                setTimeout(() => {
                    result += '2';
                    task.next();
                }, 1000);
            })
            .do((task) => {
                result += '3';
                task.next();
            })
            .finally(() => {
                expect(result).to.equal('123');
                done();
            })
            .catch(() => {
            })
            .exec();
    });

    it('execAsync() should return 132', (done) => {
        let result = '';

        next()
            .do((task) => {
                result += '1';
                task.next();
            })
            .do((task) => {
                setTimeout(() => {
                    result += '2';
                    task.next();
                }, 1000);
            })
            .do((task) => {
                result += '3';
                task.next();
            })
            .finally(() => {
                expect(result).to.equal('132');
                done();
            })
            .catch(() => {
            })
            .execAsync();
    });
});

describe('next forEach test', () => {
    it('exec() should return 1234', (done) => {
        let result = '';

        next()
            .forEach([1, 2, 3, 4], (elem, index, task) => {
                if (index == 2) {
                    setTimeout(() => {
                        result += elem;
                        task.next();
                    }, 1000);
                }
                else {
                    result += elem;
                    task.next();
                }
            })
            .finally(() => {
                expect(result).to.equal('1234');
                done();
            })
            .catch(() => {
            })
            .exec();
    });

    it('execAsync() should return 1243', (done) => {
        let result = '';

        next()
        .forEach([1, 2, 3, 4], (elem, index, task) => {
            if (index == 2) {
                setTimeout(() => {
                    result += elem;
                    task.next();
                }, 1000);
            }
            else {
                result += elem;
                task.next();
            }
        })
        .finally(() => {
            expect(result).to.equal('1243');
            done();
        })
        .catch(() => {
        })
        .execAsync();
    });
});