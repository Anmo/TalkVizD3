Ink.setPath( 'Ink' , 'http://rawgit.com/Anmo/Ink/develop/src/js/Ink/' );

Ink.requireModules( [ 'Ink.Dom.Css_1' , 'Ink.Dom.Event_1' ,  'Ink.Util.Router_1' ] ,
            function(          Css    ,          Ivent    ,            Router    ) {
    'use strict';

    var body = document.body;
    var slides = Ink.i( 'slides' );
    var demos  = Ink.i( 'demos' );
    var codes  = Ink.i( 'codes' );
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
                    Css.addClassName( slides , '_' + ( numText.innerHTML = num = parseInt( _num , 10 ) ) );
                } ,
                exit  : function( _num ) {
                    Css.removeClassName( slides , '_' + _num );
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
                    Css.addClassName( demos , '_' + ( numText.innerHTML = num = parseInt( _num , 10 ) ) );
                } ,
                exit  : function( _num ) {
                    Css.removeClassName( demos , '_' + _num );
                }
            }]
        }]
    });

    Ivent.observe( window , 'keypress' , function( e ) {
        console.log( e );
    });
});
