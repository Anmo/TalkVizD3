Ink.setPath( 'Ink' , 'http://rawgit.com/Anmo/Ink/develop/src/js/Ink/' );

Ink.requireModules( [ 'Ink.Dom.Css_1' , 'Ink.Dom.Event_1' ,  'Ink.Dom.Element_1' ,  'Ink.Util.Router_1' ] ,
            function(          Css    ,          Ivent    ,           Elem       ,            Router    ) {
    'use strict';

    var body      = document.body;
    var allSlides = Ink.i( 'allSlides' );
    var slides    = Ink.i( 'slides' );
    var proj1     = Ink.i( 'proj1' );
    var proj2     = Ink.i( 'proj2' );
    var allCodes  = Ink.i( 'allCodes' );
    var codes     = Ink.i( 'codes' );
    var demos     = Ink.i( 'demos' );
    var mainText  = Ink.i( 'main-text' );
    var numText   = Ink.i( 'num-text' );

    var numSlides = 6;
    var numCodes  = 3;

    var main;
    var num;

    var slide2code = {
        6 : 1
    };

    var code2slide = {
        1 : 6 ,
        2 : 6 ,
        3 : 6
    };

    var demo2code = { };

    var fail = function( ) { this.setPath( ( main || 'slide' ) + 's' , true ); };

    window.router = new Router({
        params  : {
            num : '\\d+'
        } ,
        baseURL : '/TalkVizD3/' ,
        mode    : 'path' ,
        onFail  : fail ,
        paths   : [{
            path  : 'slides' ,
            init  : function( ) {
                for ( var i = 1; i <= numSlides; i++ ) {
                    allSlides.innerHTML += '<iframe frameborder="0" scrolling="no" seamless class="all-25" src="/TalkVizD3/slide/' + i + '/"></iframe>';
                }
            } ,
            enter : function( _main ) {
                main = _main;
                num  = undefined;

                Css.addClassName( body , 'allSlides' );
            } ,
            exit  : function( ) {
                Css.removeClassName( body , 'allSlides' );
            }
        } , {
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

                    if ( num === 3 ) {
                        proj1.src = 'http://noticias.sapo.pt/maquinadotempo/grafo.php#date=2013-06-23&entityID=34157&interval=1A&nodeStep=2';
                        proj2.src = 'http://futebol.staging.labs.sapo.pt/TodosMundiais/Estatisticas/TopSelecoes/Eficiencia/';
                    }
                } ,
                exit  : function( _num ) {
                    Css.removeClassName( slides , '_' + _num );

                    if ( num === 3 ) {
                        proj1.removeAttribute( 'src' );
                        proj2.removeAttribute( 'src' );
                    }
                }
            }]
        } , {
            path  : 'codes' ,
            init  : function( ) {
                for ( var i = 1; i <= numCodes; i++ ) {
                    allCodes.innerHTML += '<iframe frameborder="0" scrolling="no" seamless class="all-25" src="/TalkVizD3/code/' + i + '/"></iframe>';
                }
            } ,
            enter : function( _main ) {
                main = _main;
                num  = undefined;

                Css.addClassName( body , 'allCodes' );
            } ,
            exit  : function( ) {
                Css.removeClassName( body , 'allCodes' );
            }
        } , {
            path  : 'code' ,
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
                    Css.addClassName( codes , '_' + ( numText.innerHTML = num = parseInt( _num , 10 ) ) );
                } ,
                exit  : function( _num ) {
                    Css.removeClassName( codes , '_' + _num );
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

    Ivent.observe( document , 'keydown' , function( e ) {
        if ( e.altKey || e.ctrlKey || e.shiftKey ) { return ; }

        var path;

        switch( e.keyCode ) {
            case 37:
                if ( !--num ) { num = 1; }

                path = [ main.replace( /s$/ , '' ) , num , '' ].join( '/' );

                break;
            case 38:
                if ( main === 'slide' || main === 'slides' || main === 'codes' || main === 'demos' ) { return ; }

                if ( main === 'code' ) {
                    if ( !( num in code2slide ) ) { return ; }

                    path = [ 'slide' , code2slide[ num ] , '' ].join( '/' );
                } else {
                    if ( !( num in demo2code ) ) { return ; }

                    path = [ 'code' , demo2code[ num ] , '' ].join( '/' );
                }

                break;
            case 39:
                if ( ++num > numSlides && main === 'slide' ) { num = numSlides; }
                if (   num > numCodes  && main === 'code' )  { num = numCodes;  }

                path = [ main.replace( /s$/ , '' ) , num || 1 , '' ].join( '/' );

                break;
            case 40:
                if ( main === 'demo' ) { return ; }

                if ( main === 'slides' || main === 'codes' || main === 'demos' ) {
                    path = [ main.replace( /s$/ , '' ) , 1 , '' ].join( '/' );
                } else if ( main === 'slide' ) {
                    if ( !( num in slide2code ) ) { return ; }

                    path = [ 'code' , slide2code[ num ] , '' ].join( '/' );
                } else {
                    if ( !( num in code2demo ) ) { return ; }

                    path = [ 'demo' , code2demo[ num ] , '' ].join( '/' );
                }

                break;
            default:
                return;
        }

        router.setPath( path );
    });

    Ivent.observe( window , 'click' , function( e ) {
        var elem = Elem.findUpwardsByTag( Ivent.element( e ) , 'a' );
        var path = elem && elem.getAttribute( 'data-path' );

        if ( window.parent !== window ) {
            window.parent.router.setPath( router.getPath( ) );
        } else if ( path ) {
            router.setPath( path );
        } else {
            return ;
        }

        Ivent.stop( e );
    });
});
