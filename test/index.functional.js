var expect = require('chai').expect;

var index = require('../lib/index');

describe('index', function() {


    it('should return the language spoken in England', function(done) {

        index.processLabelQuery('England', 'national language', function(err, result) {
            expect(err).to.not.be.ok;
            expect(result.objectList.length).to.equal(1);
            expect(result.objectList[0]['rdfs:label']).to.equal('English');
            done();
        });
    });

    it('should return the languages spoken in Afghanistan', function(done) {

        index.processLabelQuery('Afghanistan', 'national language', function(err, result) {
            expect(err).to.not.be.ok;
            expect(result.objectList.length).to.equal(2);
            expect(result.objectList[0]['rdfs:label']).to.equal('Pashto');
            expect(result.objectList[1]['rdfs:label']).to.equal('Dari language');
            done();
        });
    });


    it('should return the language spoken in inkgland (semantic correction)', function(done) {

        index.processLabelQuery('INKgland', 'national language', function(err, result) {
            expect(err).to.not.be.ok;
            expect(result.objectList.length).to.equal(1);
            expect(result.objectList[0]['rdfs:label']).to.equal('English');
            done();
        });
    });

});
