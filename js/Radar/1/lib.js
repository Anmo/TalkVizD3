/* global Ink, d3 */

Ink.createModule( 'CdB.UI.Radar' , '1' , [ 'Ink.UI.Common_1' , 'Ink.Dom.Element_1' , 'Ink.Dom.Event_1' ] ,
                                         function( Common    ,          Elem       ,          Ivent ) {
    'use strict';

    var moduleName = 'CdB_Radar';

    var rad = 2 * Math.PI;
    var deg = 360;

    var Radar = function( selector , options ) {
        this._element = Common.elOrSelector( selector , moduleName );

        var o = this._options = Common.options( moduleName , {
            width       : [ 'Integer' , 800 ] ,
            height      : [ 'Integer' , 400 ] ,
            extraWidth  : [ 'Integer' , 100 ] ,
            extraHeight : [ 'Integer' , 200 ] ,

            centerX     : [ 'Integer' , 400 ] ,
            centerY     : [ 'Integer' , 200 ] ,

            translateX  : [ 'Integer' , 50 ] ,
            translateY  : [ 'Integer' , 100 ] ,

            levels         : [ 'Integer' , 5 ] ,
            textLevelRight : [ 'Integer' , 5 ]
        } ,  options || { } , this._element );

        o.radius = Math.min( o.centerX , o.centerY );
        o.inner  = o.radius / 10;

        return this.init( );
    };

    Radar.prototype = {
        _positionLegend : function( axisMap , ang ) {
            var o = this._options;
            var radius    = o.radius;
            var inner     = o.inner;
            var maxValues = this._maxValues;
            var axeRad    = this._axeRad
            var axeRadX   = this._axeRadX;
            var axeRadY   = this._axeRadY;

            this._legend.selectAll( '.legend' )
                        .attr( 'transform' , function( axe , i ) {
                            if ( axisMap && axe in axisMap ) {
                                maxValues[ axe ] = axisMap[ axe ];

                                var iAng = axeRad[ axe ] = i * ang;
                                axeRadX[ axe ] = Math.sin( iAng );
                                axeRadY[ axe ] = -Math.cos( iAng );
                            }

                            var bb = this.getBBox( );
                            var w  = bb.width;

                            d3.select( this )
                                .select( 'line' )
                                .attr( 'x1' , - w / 2 )
                                .attr( 'x2' ,   w / 2 );

                            return  'translate(' + ( ( inner + radius + bb.width ) * axeRadX[ axe ] || 0 ) + ',' + ( ( inner + radius + bb.height ) * axeRadY[ axe ] - bb.height / 2 || 0 ) + ')';
                        });
        } ,

        _resize : function( ) {
            this._g.attr( 'transform' , 'translate(0,0) scale(1)' );

            this._positionLegend( );

            var b1 = this._svg[ 0 ][ 0 ].parentNode.getBoundingClientRect( );
            var b2 = this._g[ 0 ][ 0 ].getBoundingClientRect( );

            var w1 = b1.right  - b1.left;
            var h1 = b1.bottom - b1.top;

            var w2 = b2.right  - b2.left;
            var h2 = b2.bottom - b2.top;

            var scale = Math.min( w2 ? w1 / w2 : 1 , h2 ? h1 / h2 : 1 );

            this._g.attr( 'transform' , 'translate(0,0) scale(' + scale + ')' );

            b2 = this._g[ 0 ][ 0 ].getBoundingClientRect( );

            w2 = b2.right  - b2.left;
            h2 = b2.bottom - b2.top;

            var translate = [ b1.left - b2.left + w1 / 2 - w2 / 2 , b1.top - b2.top + h1 / 2 - h2 / 2 ];

            this._g.attr( 'transform' , 'translate(' + translate.join( ',' ) + ') scale(' + scale + ')' );

            return this;
        } ,

        init : function( ) {
            var o = this._options;

            this._svg = d3.select( this._element )
                            .append( 'svg' );

            this._g = this._svg.append( 'g' )
                                .attr( 'transform' , 'scale(1) translate(0,0)' );

            this._levels = this._g.append( 'g' )
                                    .attr( 'class' , 'levels' );
            this._legend = this._g.append( 'g' )
                                    .attr( 'class' , 'legends' );
            this._axis   = this._g.append( 'g' )
                                    .attr( 'class' , 'axis' );
            this._area   = this._g.append( 'g' )
                                    .attr( 'class' , 'areas' );
            this._points = this._g.append( 'g' )
                                    .attr( 'class' , 'points' );

            Ivent.observe( window , 'resize' , Ink.bind( this._resize , this ) );

            return this;
        } ,

        setAxis : function( axisMap ) {
            if ( !axisMap ) { return this; }

            var o  = this._options;
            var w2 = o.centerX;
            var h2 = o.centerY;
            var tY = o.translateY;

            var radius  = o.radius;
            var radiusX = w2 - radius;
            var radiusY = h2 - radius;

            var inner = o.inner;

            var levels  = o.levels;
            var toRight = o.textLevelRight;

            var axis = [ ];
            for ( var ax in axisMap ) {
                if ( !axisMap.hasOwnProperty( ax ) ) { continue; }

                axis.push( ax );
            }

            var totalAxis = axis.length;

            var ang  = rad / totalAxis;
            var _ang = deg / totalAxis;

            var axeRad    = this._axeRad    = { };
            var maxValues = this._maxValues = { };
            var axeRadX   = this._axeRadX   = { };
            var axeRadY   = this._axeRadY   = { };

            //Legends
            var legend = this._legend.selectAll( '.legend' ).data( axis , function( axe ) { return axe; } );

            var nLegend = legend.enter( )
                                .append( 'g' )
                                .attr( 'class' , function( axe , i ) { return 'legend ' + axe.replace( ' ' , '_' ); } );

            nLegend.append( 'circle' )
                    .attr( 'class' , 'club _0' )
                    .attr( 'cx' , -40 )
                    .attr( 'cy' , 60 )
                    .attr( 'r'  , 25 );

            nLegend.append( 'circle' )
                    .attr( 'class' , 'club _1' )
                    .attr( 'cx' , 40 )
                    .attr( 'cy' , 60 )
                    .attr( 'r'  , 25 );

            nLegend.append( 'text' )
                    .attr( 'text-anchor' , 'middle' )
                    .attr( 'dy' , '1em' )
                    .attr( 'x' , 0 )
                    .text( function( axe , i ) { return axe; });

            nLegend.append( 'text' )
                    .attr( 'text-anchor' , 'middle' )
                    .attr( 'dy' , '1.5em' )
                    .attr( 'x' , -40 )
                    .attr( 'y' , 37,5 )
                    .attr( 'class' , 'club _0' )
                    .text( '' );

            nLegend.append( 'text' )
                    .attr( 'text-anchor' , 'middle' )
                    .attr( 'dy' , '1.5em' )
                    .attr( 'x' , 40 )
                    .attr( 'y' , 37,5 )
                    .attr( 'class' , 'club _1' )
                    .text( '' );

            this._positionLegend( axisMap , ang );

            legend.exit( ).remove( );

            //axis
            var gAxis = this._axis.selectAll( '.axe' ).data( axis , function( axe ) { return axe; } );

            gAxis.enter( )
                    .append( 'svg:line' )
                        .attr( 'x1' , 0 )
                        .attr( 'y1' , 0 )
                        .attr( 'class' , 'axe' );

            gAxis.attr( 'x2' , function( axe ){ return ( inner + radius ) * axeRadX[ axe ]; } )
                    .attr( 'y2' , function( axe ){ return ( inner + radius ) * axeRadY[ axe ]; } );

            gAxis.exit( ).remove( );

            this._axis.append( 'circle' )
                        .attr( 'class' , 'axe' )
                        .attr( 'r' , inner )
                        .attr( 'cx' , 0 )
                        .attr( 'cy' , 0 );

            //levels + legends
            this._levels.selectAll( '.level,.radius' ).data( [ ] ).exit( ).remove( );

            this._levels
                .append( 'svg:circle' )
                .attr( 'cx' , 0 )
                .attr( 'cy' , 0 )
                .attr( 'r' , radius + inner )
                .attr( 'class' , 'radius' );

            for ( var i = 0; i < levels; i++ ) {
                var levelFactor = inner + radius * i / levels;

                this._legend.append( 'svg:text' )
                            .attr( 'x' , toRight + levelFactor * Math.sin( 0 ) )
                            .attr( 'y' , levelFactor * -Math.cos( 0 ) )
                            .attr( 'class' , 'legend' )
                            .text( i * 100 / levels + '%' );

                var x2 = levelFactor * Math.sin( 0 );
                var y2 = levelFactor * -Math.cos( 0 );

                this._levels.append( 'svg:path' )
                            .attr( 'd' , function( ) {
                                var d = [ 'M' + x2 + ',' + y2 ];

                                for ( var j = 1; j <= totalAxis; j++ ) {
                                    var axe = axis[ j ] || axis[ 0 ];

                                    x2 = levelFactor * axeRadX[ axe ];
                                    y2 = levelFactor * axeRadY[ axe ];

                                    d.push( 'L' + x2 + ',' + y2 );
                                }

                                return d.join( ' ' );
                            })
                            .attr( 'class' , 'level' );0
            }

            return this;
        } ,

        setData : function( d ) {
            var self = this;

            var o  = this._options;
            var w2 = o.centerX;
            var h2 = o.centerY;

            var inner   = o.inner;
            var radius  = o.radius;
            var radiusX = w2 - radius;
            var radiusY = h2 - radius;

            var maxValues = this._maxValues;
            var axeRadX   = this._axeRadX;
            var axeRadY   = this._axeRadY;

            var areaPoints = [ ];

            for ( var axe in maxValues ) {
                if ( !maxValues.hasOwnProperty( axe ) ) { continue; }

                areaPoints.push( [ inner * axeRadX[ axe ] , inner * axeRadY[ axe ] ].join( ',' ) );
            }

            areaPoints = areaPoints.join( ' ' );

            var clubs = this._area.selectAll( '.club' )
                                .data( d , function( _ ) { return _.isFirst; } );

            clubs.exit( )
                    .transition( )
                    .duration( 1000 )
                    .attr( 'points' , function( p ) {
                        for ( var axe in maxValues ) {
                            if ( !maxValues.hasOwnProperty( axe ) ) { continue; }

                            var elem = self._legend.select( '.' + axe.replace( ' ' , '_' ) + ' text._' + ( p.isFirst ? 0 : 1 ) );

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
                                    .attr( 'points' , areaPoints );

            clubs.attr( 'class' , function( _ ) { return 'club area _' + ( _.isFirst ? 0 : 1 ); } )
                    .transition( )
                    .duration( 1000 )
                    .attr( 'points' , function( p ) {
                        var r = [ ];

                        for ( var axe in maxValues ) {
                            if ( !maxValues.hasOwnProperty( axe ) ) { continue; }

                            var v = p[ axe ] || 0;

                            var elem = self._legend.select( '.' + axe.replace( ' ' , '_' ) + ' text._' + ( p.isFirst ? 0 : 1 ) );

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

            clubs = this._points.selectAll( '.club' )
                                .data( d , function( _ ) { return _.isFirst; } );

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
                    .append( 'svg:g' );

            var points = clubs.attr( 'class' , function( _ ) { return 'club _' + ( _.isFirst ? 0 : 1 ); } )
                                .selectAll( '.point' )
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

            return this;
        }
    };

    return Radar;
});