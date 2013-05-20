define(['validate'], function(validate) {
   'use strict';
    var missingDataError = 'You are missing some data';
    /*
    *
    * API STRUCTURE
    *
    */
    describe('Test the API structure', function() {
        it('should be a function', function() {
            validate.should.be.instanceof(Function);
        });
        it('should have an extend method', function() {
            validate.extend.should.be.instanceof(Function);
        });
        it('should have a config method', function() {
            validate.config.should.be.instanceof(Function);
        });
        it('should have a backboneModel method', function() {
            validate.backboneModel.should.be.instanceof(Function);
        });
    });
    /*
     *
     * REQUIRED validator
     *
     */
    describe('Required validator', function() {
        it('should fail on missing property', function() {
            var validation = validate({
            }, {
                name: ['required']
            });
            validation.isValid.should.be.false;
            validation.errors.name[0].should.equal(missingDataError);
        });
        it('should fail on empty string', function() {
            var validation = validate({
                name: ''
            }, {
                name: ['required']
            });
            validation.isValid.should.be.false;
            validation.errors.name[0].should.equal('You have to type something!');
        });
        it('should succeed when string length is more than 0', function() {
            var validation = validate({
                name: 'g'
            }, {
                name: ['required']
            });
            validation.isValid.should.be.true;
        });
    });
    /*
     *
     * NUMBER validator
     *
     */
    describe('required validator', function() {
        it('should fail on missing property', function() {
            var validation = validate({
            }, {
                age: ['number']
            });
            validation.isValid.should.be.false;
            validation.errors.age[0].should.equal(missingDataError);
        });
        it('should fail if not number', function() {
            var validation = validate({
                age: '25'
            }, {
                age: ['number']
            });
            validation.isValid.should.be.false;
            validation.errors.age[0].should.equal('25 is not a valid number');
        });
        it('should succeed when property is a number', function() {
            var validation = validate({
                age: 25
            }, {
                age: ['number']
            });
            validation.isValid.should.be.true;
        });
    });
    /*
     *
     * BEFORE validator
     *
     */
    describe('before validator', function() {
        it('should fail on missing property', function() {
            var validation = validate({
            }, {
                startTime: ['before:endTime']
            });
            validation.isValid.should.be.false;
            validation.errors.startTime[0].should.equal(missingDataError);
        });
        it('should fail when value is after validation value', function() {
            var validation = validate({
                startTime: new Date(2013, 4, 20, 10).getTime(),
                endTime: new Date(2013, 4, 20, 8).getTime()
            }, {
                startTime: ['before:endTime']
            });
            validation.isValid.should.be.false;
            validation.errors.startTime[0].should.equal('Date has to be before ' + new Date(2013, 4, 20, 8));
        });
        it('should succeed when value is before validation value', function() {
            var validation = validate({
                startTime: new Date(2013, 4, 20, 10).getTime(),
                endTime: new Date(2013, 4, 20, 12).getTime()
            }, {
                startTime: ['before:endTime']
            });
            validation.isValid.should.be.true;
        });
        it('should handle both date and milliseconds', function() {
            var validation = validate({
                startTime: new Date(2013, 4, 20, 10).getTime(),
                endTime: new Date(2013, 4, 20, 12)
            }, {
                startTime: ['before:endTime']
            });
            validation.isValid.should.be.true;
        });
    });
    /*
     *
     * AFTER validator
     *
     */
    describe('after validator', function() {
        it('should fail on missing property', function() {
            var validation = validate({
            }, {
                endTime: ['after:startTime']
            });
            validation.isValid.should.be.false;
            validation.errors.endTime[0].should.equal(missingDataError);
        });
        it('should fail when value is before validation value', function() {
            var validation = validate({
                startTime: new Date(2013, 4, 20, 10).getTime(),
                endTime: new Date(2013, 4, 20, 8).getTime()
            }, {
                endTime: ['after:startTime']
            });
            validation.isValid.should.be.false;
            validation.errors.endTime[0].should.equal('Date has to be after ' + new Date(2013, 4, 20, 10));
        });
        it('should succeed when value is after validation value', function() {
            var validation = validate({
                startTime: new Date(2013, 4, 20, 10).getTime(),
                endTime: new Date(2013, 4, 20, 12).getTime()
            }, {
                endTime: ['after:startTime']
            });
            validation.isValid.should.be.true;
        });
        it('should handle both date and milliseconds', function() {
            var validation = validate({
                startTime: new Date(2013, 4, 20, 10).getTime(),
                endTime: new Date(2013, 4, 20, 12)
            }, {
                endTime: ['after:startTime']
            });
            validation.isValid.should.be.true;
        });
    });
    /*
     *
     * LENGTH validator
     *
     */
    describe('length validator', function() {
        it('should fail on missing property', function() {
            var validation = validate({
            }, {
                name: ['length:8']
            });
            validation.isValid.should.be.false;
            validation.errors.name[0].should.equal(missingDataError);
        });
        it('should fail when length does not match validate length', function() {
            var validation = validate({
                name: 'Christian'
            }, {
                name: ['length:8']
            });
            validation.isValid.should.be.false;
            validation.errors.name[0].should.equal('Length should be 8');
        });
        it('should succeed when property is a number', function() {
            var validation = validate({
                name: 'Christian'
            }, {
                name: ['length:9']
            });
            validation.isValid.should.be.true;
        });
        it('should ignore type', function() {
            var validation = validate({
                name: 25
            }, {
                name: ['length:2']
            });
            validation.isValid.should.be.true;
        });
    });
    /*
     *
     * LONGERTHAN validator
     *
     */
    describe('longerThan validator', function() {
        it('should fail on missing property', function() {
            var validation = validate({
            }, {
                name: ['longerThan:8']
            });
            validation.isValid.should.be.false;
            validation.errors.name[0].should.equal(missingDataError);
        });
        it('should fail when length is too short', function() {
            var validation = validate({
                name: 'Christian'
            }, {
                name: ['longerThan:10']
            });
            validation.isValid.should.be.false;
            validation.errors.name[0].should.equal('Length should be more than 10');
        });
        it('should succeed when length is longer than validation value', function() {
            var validation = validate({
                name: 'Christian'
            }, {
                name: ['longerThan:8']
            });
            validation.isValid.should.be.true;
        });
    });
    /*
     *
     * SHORTERTHAN validator
     *
     */
    describe('shorterThan validator', function() {
        it('should fail on missing property', function() {
            var validation = validate({
            }, {
                name: ['shorterThan:8']
            });
            validation.isValid.should.be.false;
            validation.errors.name[0].should.equal(missingDataError);
        });
        it('should fail when length is too short', function() {
            var validation = validate({
                name: 'Christian'
            }, {
                name: ['shorterThan:8']
            });
            validation.isValid.should.be.false;
            validation.errors.name[0].should.equal('Length should be less than 8');
        });
        it('should succeed when length is longer than validation value', function() {
            var validation = validate({
                name: 'Christian'
            }, {
                name: ['shorterThan:10']
            });
            validation.isValid.should.be.true;
        });
    });
    /*
     *
     * EMAIL validator
     *
     */
    describe('email validator', function() {
        it('should fail on missing property', function() {
            var validation = validate({
            }, {
                email: ['email']
            });
            validation.isValid.should.be.false;
            validation.errors.email[0].should.equal(missingDataError);
        });
        it('should fail when not an email', function() {
            var validation = validate({
                email: 'test@test'
            }, {
                email: ['email']
            });
            validation.isValid.should.be.false;
            validation.errors.email[0].should.equal('Not valid email');
        });
        it('should succeed when is a valid email', function() {
        var validation = validate({
            email: 'test@test.no'
        }, {
            email: ['email']
        });
        validation.isValid.should.be.true;
    });
});
    /*
     *
     * CONFIGURATION
     *
     */
    describe('Configuration', function() {
        it('should change default error message', function() {
            // Verify initial default error message
            var validation = validate({
                name: ''
            }, {
                name: ['required']
            });
            validation.errors.name[0].should.equal('You have to type something!');
            // Set new error message
            validate.config({
                errorMessages: {
                    required: 'I changed it!'
                }
            });
            // Verify new error message
            validation = validate({
                name: ''
            }, {
                name: ['required']
            });
            validation.errors.name[0].should.equal('I changed it!');
        });
    });
});