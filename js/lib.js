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

    var numSlides = 8;
    var numCodes  = 9;
    var numDemos  = 3;

    var main;
    var num;

    var slide2code = {
        6 : 1 ,
        7 : 4 ,
        8 : 7
    };

    var code2slide = {
        1 : 6 ,
        2 : 6 ,
        3 : 6 ,
        4 : 7 ,
        5 : 7 ,
        6 : 7 ,
        7 : 8 ,
        8 : 8 ,
        9 : 8
    };

    var code2demo = {
        7 : 1 ,
        8 : 2 ,
        9 : 3
    };

    var demo2code = {
        1 : 7 ,
        2 : 8 ,
        3 : 9
    };

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

                    switch( num ) {
                        case 1:
                            var d3Elem = d3.select( '#demo_1' );

                            var dataElem = d3Elem.selectAll( '.demo_1' )
                                                    .data( [ { Id : 2 , value : 5 } ,
                                                        { Id : 1 , value : 7 } , 
                                                        { Id : 3 , value : 3 } ] ,
                                                        function( d ) { return d.Id; });

                            dataElem.enter( )
                                    .append( 'span' )
                                    .attr( 'class' , 'demo_1' )
                                    .text(function( d ) { return d.value; });

                            break;
                    }
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
            case 37://left
                if ( !--num ) { num = 1; }

                path = [ main.replace( /s$/ , '' ) , num , '' ].join( '/' );

                break;
            case 38://up
                if ( main === 'slide' || main === 'slides' || main === 'codes' || main === 'demos' ) { return ; }

                if ( main === 'code' ) {
                    if ( !( num in code2slide ) ) { return ; }

                    path = [ 'slide' , code2slide[ num ] , '' ].join( '/' );
                } else {
                    if ( !( num in demo2code ) ) { return ; }

                    path = [ 'code' , demo2code[ num ] , '' ].join( '/' );
                }

                break;
            case 39://right
                if ( ++num > numSlides && main === 'slide' ) { num = numSlides; }
                if (   num > numCodes  && main === 'code' )  { num = numCodes;  }
                if (   num > numDemos  && main === 'demo' )  { num = numDemos;  }

                path = [ main.replace( /s$/ , '' ) , num || 1 , '' ].join( '/' );

                break;
            case 40://down
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
