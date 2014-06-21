Ink.setPath( 'Ink' , 'http://rawgit.com/Anmo/Ink/develop/src/js/Ink/' );

Ink.requireModules( [ 'Ink.Dom.Css_1' , 'Ink.Util.Router_1' ] ,
            function(          Css    ,           Router    ) {
    'use strict';

    var body = document.body;
    var mainText = Ink.i( 'main-text' );
    var numText = Ink.i( 'num-text' );

    var main;
    var num;

    var fail = function( ) { this.setPath( ( main || 'slide' ) + '/1' , true ); };

    var router = new Router({
        params : {
            num : '\\d+'
        } ,
        onFail : fail ,
        paths  : [{
            path  : 'slide' ,
            enter : function( _main ) {
                Css.addClassName( body , ( main = _main ) + 's' );

                mainText.innerHTML = main;
            } ,
            exit  : function( _main ) {
                Css.removeClassName( body , _main + 's' );
            } ,
            fail  : fail ,
            paths : [{
                path : ':num' ,
                enter : function( _num ) {
                    numText.innerHTML = num = _num;
                }
            }]
        } , {
            path  : 'demo' ,
            enter : function( _main ) {
                Css.addClassName( body , ( main = _main ) + 's' );

                mainText.innerHTML = main;
            } ,
            exit  : function( _main ) {
                Css.removeClassName( body , _main + 's' );
            } ,
            fail  : fail ,
            paths : [{
                path : ':num' ,
                enter : function( _num ) {
                    numText.innerHTML = num = _num;
                }
            }]
        }]
    });
});
