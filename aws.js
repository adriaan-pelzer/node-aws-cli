#! /usr/bin/env node

var aws = require ( 'aws-sdk' );
var _ = require ( 'lodash' );
var inspect = require ( 'eyes' ).inspector ( { maxLength: 0 } );
var args = require ( 'minimist' )( process.argv );
var plainArgs = _.reject ( args._, function ( arg ) {
    return ( arg.match ( 'node' ) || arg.match ( '.js' ) || arg.match ( '/bin/' ) );
} );
var awsServiceName = _.first ( plainArgs );
var awsCmdName = _.first ( _.rest ( plainArgs ) );
var awsParms = _.omit ( args, [ '_' ] );

var awsService = new aws[awsServiceName]( { region: args.r || args.region || 'eu-west-1' } );

awsService[awsCmdName] ( awsParms, function ( error, result ) {
    if ( error ) {
        console.error ( error );
        return;
    }

    inspect ( result );
} );
