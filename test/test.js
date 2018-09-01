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
                }, 1);
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

    it('exec() - task.reject() should return 1', (done) => {
        let result = '';

        next()
            .do((task) => {
                result += '1';
                task.next();
            })
            .do((task) => {
                setTimeout(() => {
                    task.reject();
                }, 1);
            })
            .do((task) => {
                result += '3';
                task.next();
            })
            .finally(() => {
                
            })
            .catch(() => {
                expect(result).to.equal('1');
                done();
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
                }, 1);
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

    it('execAsync() - task.reject should return 13', (done) => {
        let result = '';

        next()
            .do((task) => {
                result += '1';
                task.next();
            })
            .do((task) => {
                setTimeout(() => {
                    task.reject();
                }, 1);
            })
            .do((task) => {
                result += '3';
                task.next();
            })
            .finally(() => {
            })
            .catch(() => {
                expect(result).to.equal('13');
                done();
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
                    }, 1);
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

    it('exec() - task.reject() should return 12', (done) => {
        let result = '';

        next()
            .forEach([1, 2, 3, 4], (elem, index, task) => {
                if (index == 2) {
                    setTimeout(() => {
                        task.reject();
                    }, 1);
                }
                else {
                    result += elem;
                    task.next();
                }
            })
            .finally(() => {
            })
            .catch(() => {
                expect(result).to.equal('12');
                done();
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
                    }, 1);
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

    it('execAsync() - task.reject() should return 124', (done) => {
        let result = '';

        next()
            .forEach([1, 2, 3, 4], (elem, index, task) => {
                if (index == 2) {
                    setTimeout(() => {
                        task.reject();
                    }, 1);
                }
                else {
                    result += elem;
                    task.next();
                }
            })
            .finally(() => {
            })
            .catch(() => {
                expect(result).to.equal('124');
                done();
            })
            .execAsync();
    });
});