var config = require ( 'config' );
var aws = require ( 'aws-sdk' );
var _ = require ( 'lodash' );
var args = require ( 'minimist' )( process.argv );
var plainArgs = _.reject ( args._, function ( arg ) {
    return ( arg.match ( 'node' ) || arg.match ( '.js' ) );
} );
var awsServiceName = _.first ( plainArgs );
var awsCmdName = _.first ( _.rest ( plainArgs ) );
var awsParms = _.omit ( args, [ '_' ] );

var awsService = new aws[awsServiceName]( config );

awsService[awsCmdName] ( awsParms, function ( error, result ) {
    if ( error ) {
        console.error ( error );
        return;
    }

    console.log ( result );
} );
