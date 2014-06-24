Ink.setPath( 'Ink' , 'http://rawgit.com/Anmo/Ink/develop/src/js/Ink/' );

Ink.requireModules( [ 'Ink.Dom.Css_1' , 'Ink.Dom.Event_1' ,  'Ink.Dom.Element_1' ,  'Ink.Util.Router_1' ] ,
            function(          Css    ,          Ivent    ,           Elem       ,            Router    ) {
    'use strict';

    var body      = document.body;
    var allSlides = Ink.i( 'allSlides' );
    var slides    = Ink.i( 'slides' );
    var allCodes  = Ink.i( 'allCodes' );
    var codes     = Ink.i( 'codes' );
    var allDemos  = Ink.i( 'allDemos' );
    var demos     = Ink.i( 'demos' );

    var proj1     = Ink.i( 'proj1' );
    var proj2     = Ink.i( 'proj2' );

    var mainText  = Ink.i( 'main-text' );
    var numText   = Ink.i( 'num-text' );

    var button_demo_2   = Ink.i( 'button_demo_2' );
    var button_demo_3   = Ink.i( 'button_demo_3' );
    var button_demo_4_1 = Ink.i( 'button_demo_4_1' );
    var button_demo_4_2 = Ink.i( 'button_demo_4_2' );
    var button_demo_5_1 = Ink.i( 'button_demo_5_1' );
    var button_demo_5_2 = Ink.i( 'button_demo_5_2' );
    var button_demo_6_1 = Ink.i( 'button_demo_6_1' );
    var button_demo_6_2 = Ink.i( 'button_demo_6_2' );
    var button_demo_7_1 = Ink.i( 'button_demo_7_1' );
    var button_demo_7_2 = Ink.i( 'button_demo_7_2' );

    var numSlides = 10;
    var numCodes  = 15;
    var numDemos  = 7;

    var main;
    var num;

    var init_2;
    var init_3;
    var init_4;
    var init_5;
    var init_6;
    var init_7;

    var funcDemo4;
    var funcDemo5;
    var funcDemo6;
    var funcDemo7;

    var g7;
    var levels7;
    var legend7;
    var axis7;
    var area7;
    var points7;
    var data7 = [{
        Jogos               : 180 ,
        'Golos Sofridos'    : 148 ,
        'Cartões Vermelhos' : 11 ,
        'Duplo Amarelos'    : 20 ,
        'Cartões Amarelos'  : 430 ,
        'Golos Marcados'    : 394
    } , {
        Jogos               : 180 ,
        'Golos Sofridos'    : 118 ,
        'Cartões Vermelhos' : 5 ,
        'Duplo Amarelos'    : 10 ,
        'Cartões Amarelos'  : 410 ,
        'Golos Marcados'    : 400
    }  , {
        Jogos               : 180 ,
        'Golos Sofridos'    : 159 ,
        'Cartões Vermelhos' : 10 ,
        'Duplo Amarelos'    : 18 ,
        'Cartões Amarelos'  : 468 ,
        'Golos Marcados'    : 265
    }  , {
        Jogos               : 180 ,
        'Golos Sofridos'    : 243 ,
        'Cartões Vermelhos' : 15 ,
        'Duplo Amarelos'    : 29 ,
        'Cartões Amarelos'  : 469 ,
        'Golos Marcados'    : 247
    }  , {
        Jogos               : 180 ,
        'Golos Sofridos'    : 184 ,
        'Cartões Vermelhos' : 15 ,
        'Duplo Amarelos'    : 9 ,
        'Cartões Amarelos'  : 432 ,
        'Golos Marcados'    : 289
    }  , {
        Jogos               : 180 ,
        'Golos Sofridos'    : 220 ,
        'Cartões Vermelhos' : 10 ,
        'Duplo Amarelos'    : 24 ,
        'Cartões Amarelos'  : 509 ,
        'Golos Marcados'    : 166
    }];

    var slide2code = {
        6  : 1 ,
        7  : 4 ,
        8  : 7 ,
        9  : 10 ,
        10 : 15
    };

    var code2slide = {
        1  : 6 ,
        2  : 6 ,
        3  : 6 ,
        4  : 7 ,
        5  : 7 ,
        6  : 7 ,
        7  : 8 ,
        8  : 8 ,
        9  : 8 ,
        10 : 9 ,
        11 : 9 ,
        12 : 9 ,
        13 : 9 ,
        14 : 9 ,
        15 : 10
    };

    var code2demo = {
        7  : 1 ,
        8  : 2 ,
        9  : 3 ,
        10 : 4 ,
        11 : 4 ,
        12 : 4 ,
        13 : 5 ,
        14 : 6 ,
        15 : 7
    };

    var demo2code = {
        1 : 7 ,
        2 : 8 ,
        3 : 9 ,
        4 : 10 ,
        5 : 13 ,
        6 : 14 ,
        7 : 15
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
                    allSlides.innerHTML += '<iframe frameborder="0" scrolling="no" seamless class="all-20" src="/TalkVizD3/slide/' + i + '/"></iframe>';
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
            path  : 'demos' ,
            init  : function( ) {
                for ( var i = 1; i <= numDemos; i++ ) {
                    allDemos.innerHTML += '<iframe frameborder="0" scrolling="no" seamless class="all-25" src="/TalkVizD3/demo/' + i + '/"></iframe>';
                }
            } ,
            enter : function( _main ) {
                main = _main;
                num  = undefined;

                Css.addClassName( body , 'allDemos' );
            } ,
            exit  : function( ) {
                Css.removeClassName( body , 'allDemos' );
            }
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
                path  : ':num' ,
                enter : function( _num ) {
                    switch( _num ) {
                        case '2':
                            if ( init_2 ) { break; }
                            init_2 = true;

                            Ivent.observe( button_demo_2 , 'click' , function( ) {
                                var d3Elem = d3.select( '#demo_2' );

                                var dataElem = d3Elem.selectAll( '.demo_2' )
                                                        .data( [ ] , function( d ) { return d.Id; })
                                                        .exit( )
                                                        .remove( );
                            });

                            break;
                        case '3':
                            if ( init_3 ) { break; }
                            init_3 = true;

                            Ivent.observe( button_demo_3 , 'click' , function( ) {
                                var d3Elem = d3.select( '#demo_3' );

                                var dataElem = d3Elem.selectAll( '.demo_3' )
                                                        .data( [ { Id : 2 , value : 2 } ,
                                                        { Id : 1 , value : 4 } , 
                                                        { Id : 3 , value : 6 } ] ,
                                                        function( d ) { return d.Id; });

                                dataElem.text(function( d ) { return d.value; });
                            });

                            break;
                        case '4':
                            if ( init_4 ) { break; }
                            init_4 = true;
                        case '5':
                            if ( _num === '5' && init_5 ) { break; }
                            else if ( _num === '5' ) { init_5 = true; }
                        case '6':
                            if ( _num === '6' && init_6 ) { break; }
                            else if ( _num === '6' ) { init_6 = true; }

                            Ivent.observe( eval( 'button_demo_' + _num + '_1' ) /*hack just for fun*/ , 'click' , function( ) {
                                eval( 'funcDemo' + _num )( [ ] );
                            });

                            Ivent.observe( eval( 'button_demo_' + _num + '_2' ) , 'click' , function( ) {
                                eval( 'funcDemo' + _num )( [{
                                    Id    : parseInt( Math.random( ) * 10 , 10 ) ,
                                    value : parseInt( Math.random( ) * 10 , 10 )
                                } , {
                                    Id    : parseInt( Math.random( ) * 10 , 10 ) ,
                                    value : parseInt( Math.random( ) * 10 , 10 )
                                } , {
                                    Id    : parseInt( Math.random( ) * 10 , 10 ) ,
                                    value : parseInt( Math.random( ) * 10 , 10 )
                                }] );
                            });

                            break;
                        case '7':
                            if ( init_7 ) { break; }
                            init_7 = true;

                            var d3Elem = d3.select( '#demo_7' );

                            g7 = d3Elem.append( 'g' )
                                        .attr( 'transform' , 'scale(1) translate(437.5,375)' );

                            levels7 = g7.append( 'g' )
                                        .attr( 'class' , 'levels' );
                            legend7 = g7.append( 'g' )
                                        .attr( 'class' , 'legends' );
                            axis7   = g7.append( 'g' )
                                        .attr( 'class' , 'axis' );
                            area7   = g7.append( 'g' )
                                        .attr( 'class' , 'areas' );
                            points7 = g7.append( 'g' )
                                        .attr( 'class' , 'points' );

                            var axisMap = {
                                Jogos               : 180 ,
                                'Golos Sofridos'    : 290 ,
                                'Cartões Vermelhos' : 23 ,
                                'Duplo Amarelos'    : 30 ,
                                'Cartões Amarelos'  : 509 ,
                                'Golos Marcados'    : 400
                            };

                            var radius  = 200;
                            var inner   = 20;

                            var levels  = 5;
                            var toRight = 5;

                            var axis = [ ];
                            for ( var ax in axisMap ) {
                                if ( !axisMap.hasOwnProperty( ax ) ) { continue; }

                                axis.push( ax );
                            }

                            var totalAxis = axis.length;

                            var ang  = 2 * Math.PI / totalAxis;
                            var _ang = 360         / totalAxis;

                            var axeRad    = { };
                            var maxValues = { };
                            var axeRadX   = { };
                            var axeRadY   = { };

                            var positionLegend = function( axisMap , ang ) {
                                legend7.selectAll( '.legend' )
                                        .attr( 'transform' , function( axe , i ) {
                                            if ( axisMap && axe in axisMap ) {
                                                maxValues[ axe ] = axisMap[ axe ];

                                                var iAng = axeRad[ axe ] = i * ang;
                                                axeRadX[ axe ] = Math.sin( iAng );
                                                axeRadY[ axe ] = -Math.cos( iAng );
                                            }

                                            var bb = this.getBBox( );

                                            return  'translate(' + ( ( inner + radius + bb.width ) * axeRadX[ axe ] || 0 ) + ',' + ( ( inner + radius + bb.height ) * axeRadY[ axe ] - bb.height / 2 || 0 ) + ')';
                                        });
                            };

                            //Legends
                            var legend = legend7.selectAll( '.legend' ).data( axis , function( axe ) { return axe; } );

                            var nLegend = legend.enter( )
                                                .append( 'g' )
                                                .attr( 'class' , function( axe , i ) { return 'legend ' + axe.replace( ' ' , '_' ); } );

                            nLegend.append( 'rect' )
                                    .attr( 'x' , -50 )
                                    .attr( 'y' , 50 )
                                    .attr( 'width' , 100 )
                                    .attr( 'height' , 40 );

                            nLegend.append( 'text' )
                                    .attr( 'text-anchor' , 'middle' )
                                    .attr( 'dy' , '1em' )
                                    .attr( 'x' , 0 )
                                    .text( function( axe , i ) { return axe; });

                            nLegend.append( 'text' )
                                    .attr( 'text-anchor' , 'start' )
                                    .attr( 'dy' , '1.5em' )
                                    .attr( 'x' , -50 )
                                    .attr( 'y' , 40 )
                                    .attr( 'class' , 'club _0' )
                                    .text( '' );

                            nLegend.append( 'text' )
                                    .attr( 'text-anchor' , 'end' )
                                    .attr( 'dy' , '1.5em' )
                                    .attr( 'x' , 40 )
                                    .attr( 'y' , 40 )
                                    .attr( 'class' , 'club _1' )
                                    .text( '' );

                            positionLegend( axisMap , ang );
                            setTimeout( function( ) {
                                positionLegend( axisMap , ang );
                            } , 0 );

                            legend.exit( ).remove( );

                            //axis
                            var gAxis = axis7.selectAll( '.axe' ).data( axis , function( axe ) { return axe; } );

                            gAxis.enter( )
                                    .append( 'svg:line' )
                                        .attr( 'x1' , 0 )
                                        .attr( 'y1' , 0 )
                                        .attr( 'class' , 'axe' );

                            gAxis.attr( 'x2' , function( axe ){ return ( inner + radius ) * axeRadX[ axe ]; } )
                                    .attr( 'y2' , function( axe ){ return ( inner + radius ) * axeRadY[ axe ]; } );

                            gAxis.exit( ).remove( );

                            axis7.append( 'circle' )
                                    .attr( 'class' , 'axe' )
                                    .attr( 'r' , inner )
                                    .attr( 'cx' , 0 )
                                    .attr( 'cy' , 0 );

                            //levels + legends
                            levels7.selectAll( '.level' ).data( [ ] ).exit( ).remove( );

                            for ( var i = 0; i < levels; i++ ) {
                                var levelFactor = inner + radius * i / levels;

                                legend7.append( 'svg:text' )
                                        .attr( 'x' , toRight + levelFactor * Math.sin( 0 ) )
                                        .attr( 'y' , levelFactor * -Math.cos( 0 ) )
                                        .attr( 'class' , 'legend' )
                                        .text( i * 100 / levels + '%' );

                                var x2 = levelFactor * Math.sin( 0 );
                                var y2 = levelFactor * -Math.cos( 0 );

                                for ( var j = 1; j <= totalAxis; j++ ) {
                                    var axe = axis[ j ] || axis[ 0 ];

                                    var x1 = x2;
                                    var y1 = y2;
                                    var x2 = levelFactor * axeRadX[ axe ];
                                    var y2 = levelFactor * axeRadY[ axe ];

                                    levels7.append( 'svg:line' )
                                            .attr( 'x1' , x1 )
                                            .attr( 'y1' , y1 )
                                            .attr( 'x2' , x2 )
                                            .attr( 'y2' , y2 )
                                            .attr( 'class' , 'level' );
                                }
                            }

                            funcDemo7 = function( d ) {
                                var areaPoints = [ ];

                                for ( var axe in maxValues ) {
                                    if ( !maxValues.hasOwnProperty( axe ) ) { continue; }

                                    areaPoints.push( [ inner * axeRadX[ axe ] , inner * axeRadY[ axe ] ].join( ',' ) );
                                }

                                areaPoints = areaPoints.join( ' ' );

                                var clubs = area7.selectAll( '.club' )
                                                    .data( d );

                                clubs.exit( )
                                        .transition( )
                                        .duration( 1000 )
                                        .attr( 'points' , function( p , i ) {
                                            for ( var axe in maxValues ) {
                                                if ( !maxValues.hasOwnProperty( axe ) ) { continue; }

                                                var elem = legend7.select( '.' + axe.replace( ' ' , '_' ) + ' ._' + i );

                                                elem.transition( )
                                                    .duration( 1000 )
                                                    .tween( 'text' , Ink.bind(function( v ) {
                                                        var i = d3.interpolate( this.textContent , v );
                                                        var prec = ( v + '' ).split( '.' );
                                                        var round = prec.length > 1 ? Math.pow( 10 , prec[ 1 ].length ) : 1;

                                                        return function( t ) {
                                                            this.textContent = Math.round( i( t ) * round ) / round || '';
                                                        };
                                                    } , elem[ 0 ][ 0 ] , 0 ) );
                                            }

                                            return areaPoints;
                                        })
                                        .remove( );

                                var nClubs = clubs.enter( )
                                                    .append( 'polygon' )
                                                        .attr( 'class' , function( _ , i ) { return 'club area _' + i; } )
                                                        .attr( 'points' , areaPoints );

                                clubs.transition( )
                                        .duration( 1000 )
                                        .attr( 'points' , function( p , i ) {
                                            var r = [ ];

                                            for ( var axe in maxValues ) {
                                                if ( !maxValues.hasOwnProperty( axe ) ) { continue; }

                                                var v = p[ axe ] || 0;

                                                var elem = legend7.select( '.' + axe.replace( ' ' , '_' ) + ' ._' + i );

                                                elem.transition( )
                                                    .duration( 1000 )
                                                    .tween( 'text' , Ink.bind(function( v ) {
                                                        var i = d3.interpolate( this.textContent || 0 , v );
                                                        var prec = ( v + '' ).split( '.' );
                                                        var round = prec.length > 1 ? Math.pow( 10 , prec[ 1 ].length ) : 1;

                                                        return function( t ) {
                                                            this.textContent = Math.round( i( t ) * round ) / round;
                                                        };
                                                    } , elem[ 0 ][ 0 ] , v ) );

                                                var perc = v / maxValues[ axe ] || 0;

                                                r.push( [ ( inner + radius * perc ) * axeRadX[ axe ] , ( inner + radius * perc ) * axeRadY[ axe ] ].join( ',' ) );
                                            }

                                            return r.join( ' ' );
                                        });

                                clubs = points7.selectAll( '.club' )
                                                .data( d );

                                clubs.exit( )
                                        .selectAll( '.point' )
                                        .transition( )
                                        .duration( 1000 )
                                        .attr( 'cx' , function( p ) { return inner * axeRadX[ p.axis ]; })
                                        .attr( 'cy' , function( p ) { return inner * axeRadY[ p.axis ]; } )
                                        .remove( );

                                clubs.exit( )
                                        .transition( )
                                        .duration( 1000 )
                                        .remove( );

                                clubs.enter( )
                                        .append( 'svg:g' )
                                            .attr( 'class' , function( _ , i ) { return 'club _' + i; } );

                                var points = clubs.selectAll( '.point' )
                                                    .data( function( p , i ) {
                                                        var r = [ ];

                                                        for ( var axe in maxValues ) {
                                                            if ( !maxValues.hasOwnProperty( axe ) ) { continue; }

                                                            r.push({
                                                                axis  : axe ,
                                                                value : p[ axe ] || 0 ,
                                                                perc  : p[ axe ] / maxValues[ axe ] || 0
                                                            });
                                                        }

                                                        return r;
                                                    } , function( e ) { return e.axis; } );

                                points.exit( ).remove( );

                                points.enter( )
                                        .append( 'svg:circle' )
                                        .attr( 'class' , 'point' )
                                        .attr( 'cx' , function( p ) { return inner * axeRadX[ p.axis ]; } )
                                        .attr( 'cy' , function( p ) { return inner * axeRadY[ p.axis ]; } );

                                points.attr( 'r' , 5 )
                                        .attr( 'alt' , function( e ) { return e.value + ' ' + e.axis;})
                                        .transition( )
                                        .duration( 1000 )
                                        .attr( 'cx' , function( e , i ) { return ( inner + radius * e.perc ) * axeRadX[ e.axis ]; } )
                                        .attr( 'cy' , function( e , i ) { return ( inner + radius * e.perc ) * axeRadY[ e.axis ]; } );
                            };

                            Ivent.observe( button_demo_7_1 , 'click' , function( ) {
                                funcDemo7([ ]);
                            });

                            Ivent.observe( button_demo_7_2 , 'click' , function( ) {
                                var l = data7.length;

                                var j = Math.floor( Math.random( ) * l );
                                var k = Math.floor( Math.random( ) * l );

                                if ( j === k ) { k = 0; }
                                if ( j === k ) { k = l - 1; }

                                funcDemo7( data7.filter(function( e , i ){ return i === j || i === k; }).sort(function( ) { return Math.random( ); }) );
                            });

                            break;
                    }

                    Css.addClassName( demos , '_' + ( numText.innerHTML = num = parseInt( _num , 10 ) ) );

                    switch( num ) {
                        case 1:
                        case 2:
                        case 3:
                            var d3Elem = d3.select( '#demo_' + num );

                            var dataElem = d3Elem.selectAll( '.demo_' + num )
                                                    .data( [ { Id : 2 , value : 5 } ,
                                                        { Id : 1 , value : 7 } , 
                                                        { Id : 3 , value : 3 } ] ,
                                                        function( d ) { return d.Id; });

                            dataElem.enter( )
                                    .append( 'span' )
                                    .attr( 'class' , 'demo_' + num )
                                    .text(function( d ) { return d.value; });

                            break;
                        case 4:
                            funcDemo4 = function( data ) {
                                var d3Elem = d3.select( '#demo_4' );

                                var dataElem = d3Elem.selectAll( '.demo_4' )
                                                    .data( data ,
                                                        function( d ) { return d.Id; });

                                dataElem.enter( )
                                    .append( 'span' )
                                    .attr( 'class' , 'demo_4' );

                                dataElem.exit( )
                                    .remove( );

                                dataElem.text(function( d ) { return d.value; });
                            };

                            break;
                        case 5:
                            funcDemo5 = function( data ) {
                                var d3Elem = d3.select( '#demo_5' );

                                var dataElem = d3Elem.selectAll( '.demo_5' )
                                                    .data( data ,
                                                        function( d ) { return d.Id; });

                                dataElem.enter( )
                                    .append( 'span' )
                                    .attr( 'class' , 'demo_5' )
                                    .style( 'opacity' , 0 );

                                dataElem.exit( )
                                    .transition( )
                                    .duration( 1000 )
                                    .style( 'opacity' , 0 )
                                    .remove( );

                                dataElem.text(function( d ) { return d.value; })
                                    .transition( )
                                    .duration( 1000 )
                                    .style( 'opacity' , 1 );
                            };

                            break;
                        case 6:
                            funcDemo6 = function( data ) {
                                var d3Elem = d3.select( '#demo_6' );

                                var dataElem = d3Elem.selectAll( '.demo_6' )
                                                    .data( data ,
                                                        function( d ) { return d.Id; });

                                dataElem.enter( )
                                    .append( 'span' )
                                    .attr( 'class' , 'demo_6' )
                                    .text( 0 );

                                dataElem.exit( )
                                    .transition( )
                                    .duration( 1000 )
                                    .tween( 'text' , function( d ) {
                                        var i = d3.interpolateRound( parseInt( this.innerHTML , 10 ) , 0 );

                                        return function( t ) {
                                            this.innerHTML = i( t );
                                        };
                                    })
                                    .remove( );

                                dataElem.transition( )
                                    .duration( 1000 )
                                    .tween( 'text' , function( d ) {
                                        var i = d3.interpolateRound( parseInt( this.innerHTML , 10 ) , d.value );

                                        return function( t ) {
                                            this.innerHTML = i( t );
                                        };
                                    });
                            };

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
