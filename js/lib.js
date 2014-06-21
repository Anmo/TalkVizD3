Ink.setPath( 'Ink' , 'http://rawgit.com/Anmo/Ink/develop/src/js/Ink/' );

Ink.requireModules( [ 'Ink.Util.Router_1' ] ,
            function(           Router    ) {
    'use strict';

    var router = new Router({
        params : {
            num : '\\d+'
        } ,
        onFail : function( ) { this.setPath( 'slide/1' ); } ,
        paths  : [{
            path  : 'slide' ,
            enter : function( ) { console.log( 'enter slide' ); } ,
            fail  : function( ) { this.setPath( 'slide/1' ); } ,
            paths : [{
                path : ':num' ,
                enter : function( num ) { console.log( 'number:' , num ); }
            }]
        } , {
            path  : 'demo' ,
            enter : function( ) { console.log( 'enter demo' ); } ,
            fail  : function( ) { this.setPath( 'demo/1' ); } ,
            paths : [{
                path : ':num' ,
                enter : function( num ) { console.log( 'number:' , num ); }
            }]
        }]
    });
});
