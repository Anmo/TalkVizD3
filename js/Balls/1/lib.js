/* global Ink, d3 */

Ink.createModule( 'CdB.UI.Balls' , '1' , [ 'Ink.UI.Common_1' , 'Ink.Dom.Element_1' , 'Ink.Dom.Event_1' ] , function( Common , Elem , Ivent ) {
    'use strict';

    //default size
    var sizes = [ 1620 , 950 ];
    var defRatio = 20;
    var maxRadio = 150;
    var minRadio = 75;
    var diameterText = 2 * Math.sqrt( 128.5 * 128.5 - 64.25 * 64.25 );

    var getValue = function( n ) { return !n ? 0 : n.Goals || n.TotalCards || n.Appearances || n.Matches || n.Total || 0; };
    var normalizeValue = function( value , minValue , maxValue ) {
        return 75 + ( value - minValue ) / ( ( maxValue - minValue ) || 1 ) * 75;
    };

    var Balls = function( selector , options ) {
        this._element = Common.elOrSelector( selector , 'Balls' );

        var opt = this._options = Ink.extendObj({
            width   : sizes[ 0 ] ,
            height  : sizes[ 1 ] ,
            nodeMax : ( sizes[ 0 ] + sizes[ 1 ] ) / defRatio ,
            imgSize : 300
        } , Elem.data( this._element ) , options || { } );

        return this.init( );
    };

    Balls.prototype = {
        d3stopEvent : function( ) {
            d3.event.preventDefault( );
            d3.event.stopPropagation( );
        } ,

        _playerId : function( d ) { return d.Person && 'p:' + d.Person.Id || ''; } ,
        _teamId   : function( d ) { return d.Person ? '' : 't:' + d.Team.Id; } ,
        _linkId   : function( d ) {
            var isPersonTeam = d.source.Person;

            var person = isPersonTeam || d.target.Person;
            var team1  = isPersonTeam ? d.target.Team : d.source.Team;
            var team2  = d.target.Team;

            return ( person ? 'p:' + person.Id : 't:' + team1.Id ) + '_t:' + ( person ? team1.Id : team2.Id );
        } ,

        _playerName : function( d ) { return d.Person.Name; } ,
        _teamName   : function( d ) { return d.Team.Name; } ,

        _playerPhoto : function( d ) { return d.Person.PhotoUri || 'http://imgs.sapo.pt/grandearea/imgs/avatar.png'; } ,
        _teamPhoto   : function( d ) { return d.Team.EmblemUri  || 'http://imgs.sapo.pt/grandearea/imgs/avatarTeam.png'; } ,

        _getType  : function( d ) { return       d.Person ? 'player'       : 'team'; } ,
        _getId    : function( d ) { return this[ d.Person ? '_playerId'    : '_teamId'    ]( d ); } ,
        _getName  : function( d ) { return this[ d.Person ? '_playerName'  : '_teamName'  ]( d ); } ,
        _getPhoto : function( d ) { return this[ d.Person ? '_playerPhoto' : '_teamPhoto' ]( d ); } ,

        _numberText : function( d ) {
            var g = d.value;
            var t = d.Matches    ? [ 'jogos'   , 'jogo' ] :
                    d.Minutes    ? [ 'minutos' , 'minuto' ] :
                    d.TotalCards ? [ 'cartões' , 'cartão' ] :
                                   [ 'golos'   , 'golo' ];

            return g + ' ' + t[ +!( g - 1 ) ];
        } ,

        _reposition : function( d ) { return 'translate(' + ( d.x || 0 ) + ',' + ( d.y || 0 ) + ') scale(' + ( d.r / this._options.nodeMax || 1 ) + ')'; } ,

        setSize : function( sizes , ratio ) {
            return this;
        } ,

        _resize : function( ) {
            this._setZoom( 1 , [ 0 , 0 ] );

            var b1 = this._element.getBoundingClientRect( );
            var b2 = this._scalable[ 0 ][ 0 ].getBoundingClientRect( );

            var w1 = b1.right  - b1.left;
            var h1 = b1.bottom - b1.top;

            var w2 = b2.right  - b2.left;
            var h2 = b2.bottom - b2.top;

            var factor = this._lNodes && this._lNodes.length;

            if ( this._lLinks && !this._lLinks.length && factor < 10 ) { factor /= 5; }
            else                                       { factor =  1; }

            var scale = Math.min( w2 ? w1 / w2 : 1 , h2 ? h1 / h2 : 1 ) * factor;

            this._setZoom( scale , [ 0 , 0 ] );

            b2 = this._scalable[ 0 ][ 0 ].getBoundingClientRect( );

            w2 = b2.right  - b2.left;
            h2 = b2.bottom - b2.top;

            var translate = [ b1.left - b2.left + w1 / 2 - w2 / 2 , b1.top - b2.top + h1 / 2 - h2 / 2 ];

            this._setZoom( scale , translate );

            return this;
        } ,

        init : function( ) {
            var self = this;
            var opt  = this._options;

            this._svg = d3.select( this._element )
                            .append( "svg:svg" )
                            .attr( "class" , "circleGraph" );

            this._scalable = this._svg
                                    .append( "svg:g" )
                                    .attr( "class" , "scalable" );

            this._g = this._scalable.append( "svg:g" )

            this._g.append( "defs" )
                    .append( "clipPath" )
                    .attr( "id" , "image-clip-path" )
                        .append( "circle" )
                        .attr( "r" , opt.imgSize / 2 );

            this.vis = this._g.append( "g" )
                            .attr( "class" , "vis" );

            this._links = this.vis.selectAll( ".link" );

            Ivent.observe( window , 'resize' , function( ) { self._force && self._force.alpha( 0.5 ) || self._resize( ); });

            return this;
        } ,

        _setZoom : function( zoom , translate ) {
            this._scalable.attr( 'transform' , 'translate(' + translate + ') scale(' + zoom + ')' );

            return this;
        } ,

        _setNodeClick : function( clickCB ) {
            var self = this;

            return function( anchor ) {
                anchor.on( 'click' , clickCB )
                        .on( 'touchstart' , function( ) { self._selectedNode = this; })
                        .on( 'mousedown'  , function( ) { self._selectedNode = this; })
                        .on( 'touchend'   , function( ) { delete self._selectedNode; })
                        .on( 'mouseup'    , function( ) { delete self._selectedNode; })
                        .call( self._force.drag )
                        .attr( 'transform' , Ink.bind( self._reposition , self ) );
            };
        } ,

        _positionNode : function( clickCB ) {
            var self = this;

            return function( anchor ) {
                anchor.on( 'mousedown.drag' , null )
                        .on( 'touchstart.drag' , null )
                        .on( 'click' , clickCB )
                        .transition( )
                        .duration( 1000 )
                        .attr( 'transform' , Ink.bind( self._reposition , self ) );
            };
        } ,

        _addNodes : function( nodes , idCB ) {
            this._dNodes = this.vis.selectAll( ".node" )
                                    .data( this._lNodes = nodes , idCB );

            return this;
        } ,

        _createNodes : function( idCB , type , getPhoto , setName ) {
            var opt     = this._options;
            var imgSize = opt.imgSize;
            var nodeMax = opt.nodeMax;

            var imgPos   = - imgSize / 2;

            var aux = this._dNodes.enter( )
                                    .append( 'g' )
                                    .attr( 'class' , typeof type === 'function' ? function( d ) { return 'node ' + type( d ); } : 'node ' + type )
                                        .append( 'a' )
                                        .attr( 'xlink:href' , idCB )
                                        .attr( 'rel' , type );

            // Outline
            aux.append( 'circle' )
                .attr( 'class' , 'outline' )
                .style( 'fill' , '#fefefe' );//2CSS

            // Image
            aux.append( "g" )
                .attr( "class" , "node-image" )
                    .append( "image" )
                    .attr( "width" , imgSize )
                    .attr( "height" , imgSize )
                    .attr( "x" , imgPos )
                    .attr( "y" , imgPos )
                    .attr( "clip-path" , 'url(#image-clip-path)' )
                    .attr( "xlink:href" , getPhoto );

            // Image
            aux.append( "rect" )
                .attr( "class" , "node-rect-name" )
                .attr( 'x'      , -150 )
                .attr( 'y'      , 50 )
                .attr( 'width'  , 300 )
                .attr( 'height' , 100 )
                .attr( "clip-path" , 'url(#image-clip-path)' );

            // Image
            aux.append( "text" )
                .attr( "class" , "node-name" )
                .style( 'text-anchor' , 'middle' )
                .text( setName )
                .each(function( n ) {
                    var self = d3.select( this );
                    var bb = this.getBBox( );

                    var scaleText = 0.8 * diameterText / bb.width;

                    if ( scaleText <= 1 ) {
                        var name = d3.select( this ).text( ).split( /^([^ ]+ [^ ]+) / );

                        if ( name.length > 1 ) {
                            self.attr( "y" , 64.25 )
                                .html( '<tspan>' + name.slice( 1 , 3 ).join( '</tspan><tspan x="0" dy="30">' ) + '</tspan>' )
                        } else {
                            self.attr( "y" , ( 2 - scaleText ) * 64.25 )
                                .attr( "transform" , 'scale(' + scaleText + ')' );
                        }
                    } else {
                        self.attr( "y" , 64.25 )
                    }
                });

            return this;
        } ,

        _updateNodes : function( updateAnchor , strokeCB , strokeWidthCB , setNumber , textFill , fillCB ) {
            var opt     = this._options;
            var imgSize = opt.imgSize;
            var nodeMax = opt.nodeMax;

            var imgScale = 1.9 * nodeMax / imgSize;

            textFill = textFill || '#444';
            fillCB   = fillCB || '#FEFEFE';

            updateAnchor( this._dNodes.select( 'a' ) );

            this._dNodes.select( '.node-image' )
                        .attr( "transform" , "scale(" + imgScale + ")" );

            this._dNodes.select( '.node-rect-name' )
                        .attr( "transform" , "scale(" + imgScale + ")" );

            this._dNodes.select( ".outline" )
                        .attr( "r" , nodeMax )
                        .style( 'fill' , fillCB )//2CSS
                        .style( 'stroke' , strokeCB )//2CSS
                        .style( 'stroke-width' , strokeWidthCB )//2CSS;

            return this;
        } ,

        _deleteNodes : function( ) {
            this._dNodes.exit( )
                        .transition( )
                        .duration( 1000 )
                        .style( 'opacity' , 0 )
                        .remove( );

            return this;
        } ,

        _addLinks : function( links , idCB ) {
            this._dLinks = this.vis.selectAll( ".link" )
                                    .data( this._lLinks = links , idCB );

            return this;
        } ,

        _createLinks : function( ) {
            this._dLinks.enter( )
                        .insert( 'path' , ':first-child' )
                        .attr( 'class' , 'link' )
                        .attr( 'd' , 'M0,0' );

            return this;
        } ,

        _updateLinks : function( pathCB ) {
            this._dLinks.transition( )
                        .style( 'stroke' , function( d ) { return d.color === '-' ? '#AAA' : d.color || '#AAA'; } )
                        .style( 'stroke-opacity' , function( d ) { return d.color === '-' ? 0 : 0.4; } )
                        .style( 'stroke-width' , function( d ) { return d.w ? d.w : d.fee ? d.fee / 5000000 : d.num || d.size && 1 || d.target.value; })
                        .style( 'marker-end' , function( d ) { return d.arrow ? 'url(#markerArrow' + d.arrow + ')' : ''; } )
                        .duration( 1000 )
                        .attr( 'd' , pathCB );

            return this;
        } ,

        _deleteLinks : function( ) {
            this._dLinks.exit( )
                        .transition( )
                        .duration( 1000 )
                        .style( 'opacity' , 0 )
                        .remove( );

            return this;
        } ,

        _defineTopForce : function( ) {
            var self = this;
            var opt  = this._options;

            var cx = opt.width / 2;
            var cy = opt.height / 2;

            var gravity = function( alpha ) {
                var b2 = self._element.getBoundingClientRect( );

                var w2 = b2.right  - b2.left;
                var h2 = b2.bottom - b2.top;

                var factor = h2 / w2;

                var ax = alpha * factor;
                var ay = alpha / factor;

                return function( d ) {
                    d.x += ( cx - d.x ) * ax;
                    d.y += ( cy - d.y ) * ay;
                };
            };

            var collide = function( alpha ) {
                var q = d3.geom.quadtree( self._lNodes );

                return function( d ) {
                    var r = d.r + opt.nodeMax + 12;
                    var nx1 = d.x - r;
                    var nx2 = d.x + r;
                    var ny1 = d.y - r;
                    var ny2 = d.y + r;

                    q.visit(function( quad , x1 , y1 , x2 , y2 ) {
                        if ( quad.point && ( quad.point !== d ) && d.other !== quad.point && d !== quad.point.other ) {
                            var x = d.x - quad.point.x;
                            var y = d.y - quad.point.y;
                            var l = Math.sqrt(x * x + y * y);
                            var r = d.r + quad.point.r + 12;

                            if ( l < r ) {
                                l = ( l - r ) / l * alpha;
                                d.x -= x *= l;
                                d.y -= y *= l;
                                quad.point.x += x;
                                quad.point.y += y;
                            }
                        }

                        return false;
                    });
                };
            };

            var resizeIt = 5;

            this._force = d3.layout.force( )
                                    .size( [ opt.width , opt.height ] )
                                    .gravity( 0 )
                                    .charge( 0.2 )
                                    .on( 'start' , function( e ) {
                                        !self._selectedNode && self._resize( );
                                    })
                                    .on( 'tick' , function( e ) {
                                        self.vis.selectAll( 'a' )
                                                    .each( gravity( 0.2 * e.alpha ) )
                                                    .each( collide( 0.5 ) )
                                                    .attr( "transform" , Ink.bind( self._reposition , self ) );

                                        !self._selectedNode && self._resize( );
                                    });

            return this;
        } ,

        _startForce : function( ) {
            this._force.nodes( this._lNodes )
                        .links( this._lLinks || [ ] )
                        .start( );

            return this;
        } ,

        _stopForce : function( ) {
            if ( !this._force ) { return this; }
            this._force.stop( );

            delete this._force;

            return this;
        } ,

        topPlayers : function( nodes , clickNode ) {
            var pack = d3.layout.pack( )
                                .size( sizes )
                                .value( getValue )
                                .sort(function( a , b ) { return b.value - a.value; });

            nodes = pack.nodes( { children : nodes } )[ 0 ].children;

            var self  = this;
            var opt   = this._options;
            var imgS  = opt.imgSize;

            return this._stopForce( )
                        ._defineTopForce( )
                        ._addLinks( [ ] , function( ) { return '';} )
                        ._deleteLinks( )
                        ._addNodes( nodes ? nodes.filter(function( p ) { return p.value; }) : [ ] , this._playerId )
                        ._createNodes( this._playerId , 'player' , this._playerPhoto , this._playerName )
                        ._updateNodes( this._setNodeClick( clickNode ) , function( d , i ) {
                            return i === 0 ? '#888' :
                                   i === 1 ? '#AAA' :
                                   i === 2 ? '#CCC' :
                                             '#FEFEFE';
                        } , '8px' , this._numberText , function( d , i ) {
                            return i === 0 ? '#FFF' : '#444';
                        } , '#FEFEFE' )
                        ._deleteNodes( )
                        ._startForce( );
        } ,

        playerAgainst : function( parent , children , clickNode , clickProfile ) {
            var self = this;
            var opt  = this._options;
            var imgS = opt.imgSize;
            var pad  = 8;

            var getId = Ink.bind( this._getId , this );

            var bcr = this._element.getBoundingClientRect( );

            var cluster = d3.layout.cluster( )
                                        .size( [ bcr.right  - bcr.left , bcr.bottom - bcr.top ] )
                                        .value( getValue );

            parent.children = children.filter(function( n ) { return getValue( n ); });
            var nodes = cluster.nodes( parent ).sort(function( a , b ) { return b.value - a.value; });

            var l = nodes.length;
            var maxValue = nodes[ l === 1 ? 0 : 1 ].value;
            var minValue = nodes[ l - 1 ].value;

            var player = nodes[ 0 ];
            player.r   = maxRadio;
            player.value = player.Total;

            var x = player.x;

            var left  = x + maxRadio;
            var right = x - maxRadio;

            for ( var i = 1; i < l; i++ ) {
                var node = nodes[ i ];

                node.r     = normalizeValue( node.value , minValue , maxValue );

                node.x = i === 1 ? x :
                         i % 2 ? ( left += 2 * node.r + pad ) - node.r :
                                 ( right -= 2 * node.r + pad ) + node.r;
            }

            var links = cluster.links( nodes );

            for ( var i = 0, k = links.length; i < k; i++ ) {
                var link = links[ i ];

                link.w = normalizeValue( link.target.value , minValue , maxValue ) / 2;
            }

            for ( var i = 1; i < 1000; i++ ) {
                setTimeout( function( ) { self._resize( ); } , i );
            }

            return this._stopForce( )
                        ._addNodes( l === 1 ? [ ] : nodes , getId )
                        ._createNodes( getId , this._getType , Ink.bind( this._getPhoto , this ) , Ink.bind( this._getName , this ) )
                        ._updateNodes( this._positionNode( clickNode ) , '#DDD' , '1.5px' , this._numberText )
                        ._deleteNodes( )
                        ._addLinks( links , this._linkId )
                        ._createLinks( )
                        ._updateLinks( d3.svg.diagonal( ) )
                        ._deleteLinks( );
        } ,

        teamAgainst : function( parent , children , clickNode , clickProfile ) {
            var self  = this;
            var opt   = this._options;
            var imgS  = opt.imgSize;
            var pad  = 8;

            var getId = Ink.bind( this._getId , this );

            var bcr = this._element.getBoundingClientRect( );

            var cluster = d3.layout.cluster( )
                                        .size( [ bcr.right  - bcr.left , bcr.bottom - bcr.top ] )
                                        .value( getValue );

            parent.children = children.filter(function( n ) { return getValue( n ); });
            var nodes = cluster.nodes( parent ).sort(function( a , b ) { return b.value - a.value; });

            var l = nodes.length;
            var maxValue = nodes[ l === 1 ? 0 : 1 ].value;
            var minValue = nodes[ l - 1 ].value;

            var team = nodes[ 0 ];
            team.r   = maxRadio;
            team.value = team.Total;

            var x = team.x;

            var left  = x + maxRadio;
            var right = x - maxRadio;

            for ( var i = 1; i < l; i++ ) {
                var node = nodes[ i ];

                node.r     = normalizeValue( node.value , minValue , maxValue );

                node.x = i === 1 ? x :
                         i % 2 ? ( left += 2 * node.r + pad ) - node.r :
                                 ( right -= 2 * node.r + pad ) + node.r;
            }

            var links = cluster.links( nodes );

            for ( var i = 0, k = links.length; i < k; i++ ) {
                var link = links[ i ];

                link.w = normalizeValue( link.target.value , minValue , maxValue ) / 2;
            }

            for ( var i = 1; i < 1000; i++ ) {
                setTimeout( function( ) { self._resize( ); } , i );
            }

            return this._stopForce( )
                        ._addNodes( l === 1 ? [ ] : nodes , getId )
                        ._createNodes( getId , this._getType , Ink.bind( this._getPhoto , this ) , Ink.bind( this._getName , this ) )
                        ._updateNodes( this._positionNode( clickNode ) , '#DDD' , '1.5px' , this._numberText )
                        ._deleteNodes( )
                        ._addLinks( links , this._linkId )
                        ._createLinks( )
                        ._updateLinks( d3.svg.diagonal( ) )
                        ._deleteLinks( );
        } ,

        topTeams : function( nodes , clickNode ) {
            var pack = d3.layout.pack( )
                                .size( sizes )
                                .value( getValue )
                                .sort(function( a , b ) { return b.value - a.value; });

            var self  = this;
            var opt   = this._options;
            var imgS  = opt.imgSize;

            return this._stopForce( )
                        ._defineTopForce( )
                        ._addLinks( [ ] , function( ) { return '';} )
                        ._deleteLinks( )
                        ._addNodes( pack.nodes( { children : nodes } )[ 0 ].children.filter(function( d ) { return d.value; }) , this._teamId )
                        ._createNodes( this._teamId , 'player' , this._teamPhoto , this._teamName , this._addDrag )
                        ._updateNodes( this._setNodeClick( clickNode ) , function( d , i ) {
                            return i === 0 ? '#888' :
                                   i === 1 ? '#AAA' :
                                   i === 2 ? '#CCC' :
                                             '#FEFEFE';
                        } , '8px' , this._numberText , function( d , i ) {
                            return i === 0 ? '#FFF' : '#444';
                        } , '#FEFEFE' )
                        ._deleteNodes( )
                        ._startForce( );
        } ,
    };

    return Balls;
});