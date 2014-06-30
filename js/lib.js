Ink.setPath( 'Ink' , 'http://rawgit.com/Anmo/Ink/develop/src/js/Ink/' );
Ink.setPath( 'CdB.UI' , '/TalkVizD3/js/' );

Ink.requireModules( [ 'Ink.Dom.Css_1' , 'Ink.Dom.Event_1' ,  'Ink.Dom.Element_1' ,  'Ink.Util.Router_1' , 'CdB.UI.Radar_1'  , 'CdB.UI.Balls_1' ] ,
            function(          Css    ,          Ivent    ,           Elem       ,            Router    ,         Radar     ,         Balls    ) {
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

    var numSlides = 12;
    var numCodes  = 16;
    var numDemos  = 8;

    var main;
    var num;

    var init_2;
    var init_3;
    var init_4;
    var init_5;
    var init_6;
    var init_7;
    var init_8;

    var funcDemo4;
    var funcDemo5;
    var funcDemo6;

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

    var data8 = [
        [{"Goals":217,"Rank":1,"Position":1,"Team":{"Id":12436,"Name":"Brasil","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54795.png"}},{"Goals":131,"Rank":2,"Position":2,"Team":{"Id":10871,"Name":"Alemanha Ocidental","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54742.png"}},{"Goals":128,"Rank":3,"Position":3,"Team":{"Id":7171,"Name":"Itália","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55175.png"}},{"Goals":126,"Rank":4,"Position":4,"Team":{"Id":8620,"Name":"Argentina","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55574.png"}},{"Goals":104,"Rank":5,"Position":5,"Team":{"Id":7163,"Name":"França","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55167.png"}},{"Goals":92,"Rank":6,"Position":6,"Team":{"Id":7190,"Name":"Espanha","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55194.png"}},{"Goals":87,"Rank":7,"Position":7,"Team":{"Id":7167,"Name":"Hungria","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55171.png"}},{"Goals":81,"Rank":8,"Position":8,"Team":{"Id":7165,"Name":"Alemanha","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55169.png"}},{"Goals":81,"Rank":8,"Position":9,"Team":{"Id":7180,"Name":"Holanda","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55184.png"}},{"Goals":80,"Rank":10,"Position":10,"Team":{"Id":7768,"Name":"Uruguai","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55400.png"}},{"Goals":79,"Rank":11,"Position":11,"Team":{"Id":7159,"Name":"Inglaterra","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55163.png"}},{"Goals":74,"Rank":12,"Position":12,"Team":{"Id":7191,"Name":"Suécia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55195.png"}},{"Goals":60,"Rank":13,"Position":13,"Team":{"Id":10938,"Name":"Jugoslávia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54744.png"}},{"Goals":56,"Rank":14,"Position":14,"Team":{"Id":7676,"Name":"México","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55368.png"}},{"Goals":53,"Rank":15,"Position":15,"Team":{"Id":10860,"Name":"União Soviética","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54740.png"}},{"Goals":49,"Rank":16,"Position":16,"Team":{"Id":7152,"Name":"Bélgica","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55156.png"}},{"Goals":44,"Rank":17,"Position":17,"Team":{"Id":7183,"Name":"Polónia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55187.png"}},{"Goals":44,"Rank":17,"Position":18,"Team":{"Id":10866,"Name":"Checoslovaquia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54741.png"}},{"Goals":43,"Rank":19,"Position":19,"Team":{"Id":7149,"Name":"Áustria","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55153.png"}},{"Goals":42,"Rank":20,"Position":20,"Team":{"Id":7192,"Name":"Suíça","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55196.png"}},{"Goals":41,"Rank":21,"Position":21,"Team":{"Id":7184,"Name":"Portugal","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55188.png"}},{"Goals":39,"Rank":22,"Position":22,"Team":{"Id":7762,"Name":"Chile","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55397.png"}},{"Goals":36,"Rank":23,"Position":23,"Team":{"Id":16171,"Name":"Estados Unidos","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54990.png"}},{"Goals":31,"Rank":24,"Position":24,"Team":{"Id":16313,"Name":"Coreia do Sul","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55008.png"}},{"Goals":30,"Rank":25,"Position":25,"Team":{"Id":7803,"Name":"Paraguai","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55420.png"}},{"Goals":27,"Rank":26,"Position":26,"Team":{"Id":7158,"Name":"Dinamarca","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55162.png"}},{"Goals":25,"Rank":27,"Position":27,"Team":{"Id":7187,"Name":"Escócia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55191.png"}},{"Goals":23,"Rank":28,"Position":28,"Team":{"Id":7842,"Name":"Colômbia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55444.png"}},{"Goals":21,"Rank":29,"Position":29,"Team":{"Id":7155,"Name":"Croácia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55159.png"}},{"Goals":19,"Rank":30,"Position":30,"Team":{"Id":7827,"Name":"Peru","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55435.png"}},{"Goals":18,"Rank":31,"Position":31,"Team":{"Id":7293,"Name":"Nigéria","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55262.png"}},{"Goals":18,"Rank":31,"Position":32,"Team":{"Id":7298,"Name":"Camarões","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55267.png"}},{"Goals":16,"Rank":33,"Position":33,"Team":{"Id":17098,"Name":"Costa Rica","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55108.png"}},{"Goals":15,"Rank":34,"Position":34,"Team":{"Id":7185,"Name":"Roménia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55189.png"}},{"Goals":13,"Rank":35,"Position":35,"Team":{"Id":7310,"Name":"Costa do Marfim","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55279.png"}},{"Goals":13,"Rank":35,"Position":36,"Team":{"Id":7181,"Name":"Irlanda do Norte","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55185.png"}},{"Goals":12,"Rank":37,"Position":37,"Team":{"Id":7146,"Name":"Rússia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55150.png"}},{"Goals":12,"Rank":37,"Position":38,"Team":{"Id":7285,"Name":"Marrocos","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55254.png"}},{"Goals":12,"Rank":37,"Position":39,"Team":{"Id":7321,"Name":"Gana","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55290.png"}},{"Goals":11,"Rank":40,"Position":40,"Team":{"Id":15268,"Name":"Austrália","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54880.png"}}] ,
        [{"Goals":16,"Rank":1,"Position":1,"Person":{"Id":210,"Name":"Ronaldo","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/159.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":15,"Rank":2,"Position":2,"Person":{"Id":173732,"Name":"G. Müller","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":14,"Rank":3,"Position":3,"Person":{"Id":171176,"Name":"G. Batistuta","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M55766.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":14,"Rank":4,"Position":4,"Person":{"Id":6046,"Name":"M. Klose","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/40.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":313,"Name":"Lazio","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/1245.png"}},{"Goals":13,"Rank":5,"Position":5,"Person":{"Id":89440,"Name":"J. Fontaine","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57800.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":13,"Rank":5,"Position":6,"Person":{"Id":90120,"Name":"Eusébio","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/People/M54556.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":12,"Rank":7,"Position":7,"Person":{"Id":89847,"Name":"G. Lineker","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M56060.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":12,"Rank":8,"Position":8,"Person":{"Id":172045,"Name":"T. Cubillas","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57468.jpg","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{}},{"Goals":12,"Rank":9,"Position":9,"Person":{"Id":171711,"Name":"Pele","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{}},{"Goals":11,"Rank":10,"Position":10,"Person":{"Id":90742,"Name":"S. Kocsis","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M58129.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":11,"Rank":11,"Position":11,"Person":{"Id":90464,"Name":"Rob Rensenbrink","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":11,"Rank":12,"Position":12,"Person":{"Id":89701,"Name":"R. Baggio","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57868.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":10,"Rank":13,"Position":13,"Person":{"Id":170458,"Name":"H. Rahn","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57303.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":10,"Rank":14,"Position":14,"Person":{"Id":89924,"Name":"G. Lato","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57945.jpg","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{}},{"Goals":10,"Rank":14,"Position":15,"Person":{"Id":98,"Name":"David Villa","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/338.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":6,"Name":"Atl. Madrid","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/2020.png"}},{"Goals":9,"Rank":16,"Position":16,"Person":{"Id":585,"Name":"C. Vieri","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M55942.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":9,"Rank":16,"Position":17,"Person":{"Id":6111,"Name":"T. Müller","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/38215.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":85,"Name":"Bayern M.","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/961.png"}},{"Goals":9,"Rank":16,"Position":18,"Person":{"Id":13908,"Name":"Rivaldo","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/4645.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{}},{"Goals":9,"Rank":16,"Position":19,"Person":{"Id":89342,"Name":"H. Stoichkov","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57766.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":9,"Rank":21,"Position":23,"Person":{"Id":89740,"Name":"P. Rossi","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57883.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":7,"Rank":37,"Position":37,"Person":{"Id":89742,"Name":"S. Schillaci","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57884.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":36,"Position":36,"Person":{"Id":89902,"Name":"L. Matthäus","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M56066.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{}},{"Goals":7,"Rank":40,"Position":40,"Person":{"Id":89996,"Name":"A. Szarmach","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57964.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":33,"Position":33,"Person":{"Id":90025,"Name":"R. Völler","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M56080.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":25,"Position":26,"Person":{"Id":90126,"Name":"O. Salenko","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M56086.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":7,"Rank":38,"Position":39,"Person":{"Id":90756,"Name":"G. Sárosi","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M58131.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":7,"Rank":38,"Position":38,"Person":{"Id":90761,"Name":"L. Tichy","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":34,"Position":34,"Person":{"Id":90810,"Name":"Hierro","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M58144.jpg","Position":{"Id":3,"Name":"Defesa","Initials":"D"}},"Team":{}},{"Goals":9,"Rank":24,"Position":24,"Person":{"Id":170456,"Name":"U. Seeler","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":25,"Position":25,"Person":{"Id":171166,"Name":"G. Stábile","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57358.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":28,"Position":30,"Person":{"Id":171527,"Name":"O. Miguez","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57390.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":9,"Rank":16,"Position":20,"Person":{"Id":171661,"Name":"Vavá","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":28,"Position":29,"Person":{"Id":171676,"Name":"Leônidas","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57416.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":28,"Position":31,"Person":{"Id":172881,"Name":"O. Nejedlý","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M55822.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":9,"Rank":21,"Position":21,"Person":{"Id":173731,"Name":"K. Rummenigge","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57535.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":9,"Rank":21,"Position":22,"Person":{"Id":174184,"Name":"Jairzinho","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":25,"Position":27,"Person":{"Id":174191,"Name":"Ademir","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57571.jpg","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":28,"Position":28,"Person":{"Id":174194,"Name":"Careca","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M55853.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{}},{"Goals":8,"Rank":34,"Position":35,"Person":{"Id":175016,"Name":"D. Maradona","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M55876.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{}},{"Goals":8,"Rank":28,"Position":32,"Person":{"Id":207040,"Name":"J. Neeskens","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/people/M57632.jpg","Position":{}},"Team":{}}] ,
        [{"Goals":10,"Rank":1,"Position":1,"Team":{"Id":7180,"Name":"Holanda","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55184.png"}},{"Goals":9,"Rank":2,"Position":2,"Team":{"Id":7842,"Name":"Colômbia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55444.png"}},{"Goals":8,"Rank":3,"Position":3,"Team":{"Id":7163,"Name":"França","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55167.png"}},{"Goals":7,"Rank":4,"Position":4,"Team":{"Id":12436,"Name":"Brasil","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54795.png"}},{"Goals":6,"Rank":5,"Position":5,"Team":{"Id":7165,"Name":"Alemanha","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55169.png"}},{"Goals":6,"Rank":5,"Position":6,"Team":{"Id":7155,"Name":"Croácia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55159.png"}},{"Goals":5,"Rank":7,"Position":7,"Team":{"Id":7286,"Name":"Argélia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55255.png"}},{"Goals":5,"Rank":7,"Position":8,"Team":{"Id":7762,"Name":"Chile","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55397.png"}},{"Goals":4,"Rank":9,"Position":9,"Team":{"Id":7768,"Name":"Uruguai","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55400.png"}},{"Goals":4,"Rank":9,"Position":10,"Team":{"Id":7676,"Name":"México","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55368.png"}},{"Goals":4,"Rank":9,"Position":11,"Team":{"Id":17098,"Name":"Costa Rica","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55108.png"}},{"Goals":4,"Rank":9,"Position":12,"Team":{"Id":7190,"Name":"Espanha","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55194.png"}},{"Goals":4,"Rank":9,"Position":13,"Team":{"Id":7192,"Name":"Suíça","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55196.png"}},{"Goals":3,"Rank":14,"Position":14,"Team":{"Id":7152,"Name":"Bélgica","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55156.png"}},{"Goals":3,"Rank":14,"Position":15,"Team":{"Id":15268,"Name":"Austrália","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54880.png"}},{"Goals":3,"Rank":14,"Position":16,"Team":{"Id":11270,"Name":"Equador","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54749.png"}},{"Goals":3,"Rank":14,"Position":17,"Team":{"Id":16313,"Name":"Coreia do Sul","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55008.png"}},{"Goals":3,"Rank":14,"Position":18,"Team":{"Id":7321,"Name":"Gana","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55290.png"}},{"Goals":3,"Rank":14,"Position":19,"Team":{"Id":8620,"Name":"Argentina","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55574.png"}},{"Goals":2,"Rank":20,"Position":20,"Team":{"Id":16171,"Name":"Estados Unidos","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54990.png"}},{"Goals":2,"Rank":20,"Position":21,"Team":{"Id":7166,"Name":"Grécia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55170.png"}},{"Goals":2,"Rank":20,"Position":22,"Team":{"Id":7171,"Name":"Itália","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55175.png"}},{"Goals":2,"Rank":20,"Position":23,"Team":{"Id":7184,"Name":"Portugal","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55188.png"}},{"Goals":2,"Rank":20,"Position":24,"Team":{"Id":7310,"Name":"Costa do Marfim","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55279.png"}},{"Goals":1,"Rank":25,"Position":25,"Team":{"Id":7146,"Name":"Rússia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55150.png"}},{"Goals":1,"Rank":25,"Position":26,"Team":{"Id":7293,"Name":"Nigéria","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55262.png"}},{"Goals":1,"Rank":25,"Position":27,"Team":{"Id":7298,"Name":"Camarões","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55267.png"}},{"Goals":1,"Rank":25,"Position":28,"Team":{"Id":7153,"Name":"Bósnia","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55157.png"}},{"Goals":1,"Rank":25,"Position":29,"Team":{"Id":7159,"Name":"Inglaterra","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55163.png"}},{"Goals":1,"Rank":25,"Position":30,"Team":{"Id":7635,"Name":"Honduras","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55356.png"}},{"Goals":1,"Rank":25,"Position":31,"Team":{"Id":7704,"Name":"Japão","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55377.png"}},{"Goals":0,"Rank":32,"Position":32,"Team":{"Id":9130,"Name":"Irão","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55631.png"}}] ,
        [{"Goals":5,"Rank":1,"Position":1,"Person":{"Id":32858,"Name":"Neymar","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/102697.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":3,"Name":"Barcelona","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/2017.png"}},{"Goals":4,"Rank":2,"Position":2,"Person":{"Id":193,"Name":"Benzema","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/1595.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":2,"Name":"Real Madrid","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/2016.png"}},{"Goals":4,"Rank":2,"Position":3,"Person":{"Id":6111,"Name":"T. Müller","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/38215.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":85,"Name":"Bayern M.","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/961.png"}},{"Goals":3,"Rank":4,"Position":4,"Person":{"Id":3449,"Name":"James Rodríguez","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/72408.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":395,"Name":"Monaco","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/885.png"}},{"Goals":3,"Rank":4,"Position":5,"Person":{"Id":179,"Name":"A. Robben","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/32.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":85,"Name":"Bayern M.","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/961.png"}},{"Goals":3,"Rank":4,"Position":6,"Person":{"Id":1717,"Name":"R. van Persie","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/49.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":26,"Name":"Man. United","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/662.png"}},{"Goals":3,"Rank":4,"Position":7,"Person":{"Id":107555,"Name":"E. Valencia","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/People/M58265.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":11270,"Name":"Equador","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M54749.png"}},{"Goals":2,"Rank":8,"Position":8,"Person":{"Id":42653,"Name":"Jackson Martínez","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/22504.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":47,"Name":"FC Porto","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/1678.png"}},{"Goals":2,"Rank":8,"Position":9,"Person":{"Id":52704,"Name":"M. Jedinak","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/17515.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":7085,"Name":"Crystal Palace","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/679.png"}},{"Goals":2,"Rank":8,"Position":10,"Person":{"Id":10202,"Name":"J. Cuadrado","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/61414.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":360,"Name":"Fiorentina","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/1259.png"}},{"Goals":2,"Rank":8,"Position":11,"Person":{"Id":10303,"Name":"E. Cavani","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/5920.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":203,"Name":"PSG","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/886.png"}},{"Goals":2,"Rank":8,"Position":12,"Person":{"Id":2004,"Name":"L. Suárez","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/2290.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":27,"Name":"Liverpool","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/663.png"}},{"Goals":2,"Rank":8,"Position":13,"Person":{"Id":2546,"Name":"T. Cahill","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/709.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":2825,"Name":"New York RB","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/6571.png"}},{"Goals":2,"Rank":8,"Position":14,"Person":{"Id":2305,"Name":"C. Dempsey","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/664.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":5699,"Name":"Seattle Sounders","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/13024.png"}},{"Goals":2,"Rank":8,"Position":15,"Person":{"Id":2697,"Name":"G. Samaras","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/2862.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":114,"Name":"Celtic","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/1898.png"}},{"Goals":2,"Rank":8,"Position":16,"Person":{"Id":309,"Name":"Messi","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/119.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":3,"Name":"Barcelona","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/2017.png"}},{"Goals":2,"Rank":8,"Position":17,"Person":{"Id":86,"Name":"S. Feghouli","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/39454.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":1,"Name":"Valência","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/Teams/M16681.png"}},{"Goals":2,"Rank":8,"Position":18,"Person":{"Id":142,"Name":"Xabi Alonso","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/332.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":2,"Name":"Real Madrid","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/2016.png"}},{"Goals":1,"Rank":25,"Position":33,"Person":{"Id":2528,"Name":"M. Fellaini","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/13519.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":26,"Name":"Man. United","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/662.png"}},{"Goals":1,"Rank":25,"Position":39,"Person":{"Id":2772,"Name":"P. Odemwingie","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/2074.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":42,"Name":"Stoke City","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/690.png"}},{"Goals":1,"Rank":25,"Position":40,"Person":{"Id":3432,"Name":"Varela","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/18093.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":47,"Name":"FC Porto","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/1678.png"}},{"Goals":2,"Rank":8,"Position":20,"Person":{"Id":5245,"Name":"M. Mandzukic","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/20303.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":85,"Name":"Bayern M.","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/961.png"}},{"Goals":1,"Rank":25,"Position":38,"Person":{"Id":5246,"Name":"I. Olić","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/377.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":384,"Name":"Wolfsburg","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/968.png"}},{"Goals":2,"Rank":8,"Position":21,"Person":{"Id":5388,"Name":"W. Bony","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/59705.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":46,"Name":"Swansea","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/738.png"}},{"Goals":1,"Rank":25,"Position":36,"Person":{"Id":5709,"Name":"Fred","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/155.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":686,"Name":"Fluminense","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/312.png"}},{"Goals":1,"Rank":25,"Position":37,"Person":{"Id":5890,"Name":"M. Valbuena","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/1532.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":82,"Name":"Marselha","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/890.png"}},{"Goals":2,"Rank":8,"Position":19,"Person":{"Id":5893,"Name":"A. Ayew","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/20572.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":82,"Name":"Marselha","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/890.png"}},{"Goals":1,"Rank":25,"Position":35,"Person":{"Id":8951,"Name":"Fernandinho","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/19655.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":36,"Name":"Man. City","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/676.png"}},{"Goals":2,"Rank":8,"Position":22,"Person":{"Id":9811,"Name":"Y. Gervinho","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/13760.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":94,"Name":"Roma","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/1241.png"}},{"Goals":1,"Rank":25,"Position":32,"Person":{"Id":9916,"Name":"M. Götze","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/85098.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":85,"Name":"Bayern M.","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/961.png"}},{"Goals":2,"Rank":8,"Position":23,"Person":{"Id":9926,"Name":"I. Perišić","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/13756.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":384,"Name":"Wolfsburg","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/968.png"}},{"Goals":1,"Rank":25,"Position":34,"Person":{"Id":10193,"Name":"P. Armero","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/22373.png","Position":{"Id":3,"Name":"Defesa","Initials":"D"}},"Team":{"Id":40,"Name":"West Ham","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/684.png"}},{"Goals":1,"Rank":25,"Position":29,"Person":{"Id":31305,"Name":"Oscar","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/57860.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":25,"Name":"Chelsea","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/661.png"}},{"Goals":2,"Rank":8,"Position":24,"Person":{"Id":92515,"Name":"M. Depay","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/161289.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":227,"Name":"PSV","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/1517.png"}},{"Goals":1,"Rank":25,"Position":30,"Person":{"Id":95294,"Name":"A. Djabou","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/People/M58277.png","Position":{"Id":4,"Name":"Médio","Initials":"M"}},"Team":{"Id":1907,"Name":"Club Africain","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/3479.png"}},{"Goals":1,"Rank":25,"Position":31,"Person":{"Id":117275,"Name":"D. Origi","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/GSM_215344.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":139,"Name":"Lille","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/895.png"}},{"Goals":1,"Rank":25,"Position":25,"Person":{"Id":117894,"Name":"Keun-Ho Lee","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/10705.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":16313,"Name":"Coreia do Sul","EmblemUri":"http://desporto_stats.imgs.sapo.pt/3/teams/M55008.png"}},{"Goals":1,"Rank":25,"Position":27,"Person":{"Id":121508,"Name":"Quintero","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/People/M42899.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":47,"Name":"FC Porto","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/1678.png"}},{"Goals":1,"Rank":25,"Position":26,"Person":{"Id":132781,"Name":"Ó. Duarte","PhotoUri":"http://desporto_stats.imgs.sapo.pt/9/People/42671.png","Position":{"Id":3,"Name":"Defesa","Initials":"D"}},"Team":{"Id":182,"Name":"Club Brugge","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/219.png"}},{"Goals":1,"Rank":25,"Position":28,"Person":{"Id":150030,"Name":"Slimani","PhotoUri":"http://desporto_stats.imgs.sapo.pt/3/People/M44014.png","Position":{"Id":5,"Name":"Avançado","Initials":"A"}},"Team":{"Id":49,"Name":"Sporting","EmblemUri":"http://desporto_stats.imgs.sapo.pt/9/Teams/1680.png"}}]
    ];

    var slide2code = {
        5  : 1 ,
        6  : 4 ,
        7  : 7 ,
        8  : 10 ,
        9  : 15 ,
        10 : 16
    };

    var code2slide = {
        1  : 5 ,
        2  : 5 ,
        3  : 5 ,
        4  : 6 ,
        5  : 6 ,
        6  : 6 ,
        7  : 7 ,
        8  : 7 ,
        9  : 7 ,
        10 : 8 ,
        11 : 8 ,
        12 : 8 ,
        13 : 8 ,
        14 : 8 ,
        15 : 9 ,
        16 : 10
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
        15 : 7 ,
        16 : 8
    };

    var demo2code = {
        1 : 7 ,
        2 : 8 ,
        3 : 9 ,
        4 : 10 ,
        5 : 13 ,
        6 : 14 ,
        7 : 15 ,
        8 : 16
    };

    var demo2slide = {
        1 : 7 ,
        2 : 7 ,
        3 : 7 ,
        4 : 8 ,
        5 : 8 ,
        6 : 8 ,
        7 : 9 ,
        8 : 10
    };

    var fail = function( ) { this.setPath( ( main || 'slide' ) + 's/' , true ); };

    window.router = new Router({
        params  : {
            num : '\\d+'
        } ,
        //baseURL : '/TalkVizD3/' ,
        //mode    : 'path' ,
        onFail  : fail ,
        paths   : [{
            path  : 'slides' ,
            init  : function( ) {
                for ( var i = 1; i <= numSlides; i++ ) {
                    allSlides.innerHTML += '<iframe frameborder="0" scrolling="no" seamless class="all-15" src="/TalkVizD3/#slide/' + i + '/"></iframe>';
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

                    if ( num === 2 ) {
                        proj1.src = 'http://noticias.sapo.pt/maquinadotempo/grafo.php#date=2013-06-23&entityID=34157&interval=1A&nodeStep=2';
                        proj2.src = 'http://grandearea.desporto.sapo.pt/TodosMundiais/Estatisticas/TopSelecoes/Eficiencia/';
                    }
                } ,
                exit  : function( _num ) {
                    Css.removeClassName( slides , '_' + _num );

                    if ( num === 2 ) {
                        proj1.removeAttribute( 'src' );
                        proj2.removeAttribute( 'src' );
                    }
                }
            }]
        } , {
            path  : 'codes' ,
            init  : function( ) {
                for ( var i = 1; i <= numCodes; i++ ) {
                    allCodes.innerHTML += '<iframe frameborder="0" scrolling="no" seamless class="all-20" src="/TalkVizD3/#code/' + i + '/"></iframe>';
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
                    allDemos.innerHTML += '<iframe frameborder="0" scrolling="no" seamless class="all-25" src="/TalkVizD3/#demo/' + i + '/"></iframe>';
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
                                                        .data( [ { Id : 2 , value : 'W' } ,
                                                                { Id : 1 , value : 'O' } , 
                                                                { Id : 3 , value : 'R' } , 
                                                                { Id : 5 , value : 'L' } , 
                                                                { Id : 4 , value : 'D' } ] ,
                                                        function( d ) { return d.Id; });

                                dataElem.text(function( d ) { return d.value; });
                            });

                            break;
                        case '3':
                            if ( init_3 ) { break; }
                            init_3 = true;

                            Ivent.observe( button_demo_3 , 'click' , function( ) {
                                var d3Elem = d3.select( '#demo_3' );

                                var dataElem = d3Elem.selectAll( '.demo_3' )
                                                        .data( [ ] , function( d ) { return d.Id; })
                                                        .exit( )
                                                        .remove( );
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

                            var radar = new Radar( '#demo_7' );
                            radar.setAxis({
                                Jogos               : 180 ,
                                'Golos Sofridos'    : 290 ,
                                'Cartões Vermelhos' : 23 ,
                                'Duplo Amarelos'    : 30 ,
                                'Cartões Amarelos'  : 509 ,
                                'Golos Marcados'    : 400
                            });

                            setTimeout( function( ) { radar._resize( ); } , 0 );

                            Ivent.observe( button_demo_7_1 , 'click' , function( ) {
                                radar.setData([ ]);
                            });

                            Ivent.observe( button_demo_7_2 , 'click' , function( ) {
                                var l = data7.length;

                                var data = data7.slice( 0 , Infinity );

                                var j = Math.floor( Math.random( ) * l );
                                var k = Math.floor( Math.random( ) * l );

                                radar.setData( data.filter(function( e , i ){ return ( e.isFirst = i === j ) || i === k; }).sort(function( ) { return Math.random( ); }) );
                            });

                            break;
                        case '8':
                            if ( init_8 ) { break; }
                            init_8 = true;

                            var balls = new Balls( '#demo_8' );

                            setTimeout( function( ) { balls._resize( ); } , 0 );

                            Ivent.observe( button_demo_8_1 , 'click' , function( ) {
                                balls.topPlayers([ ]);
                            });

                            Ivent.observe( button_demo_8_2 , 'click' , function( ) {
                                var j = Math.floor( Math.random( ) * data8.length );

                                var data = data8.filter(function( e , i ){ return i === j; })[ 0 ];

                                balls[ data[ 0 ].Person ? 'topPlayers' : 'topTeams' ]( data );
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
                                                    .data( [ { Id : 2 , value : 'H' } ,
                                                            { Id : 1 , value : 'E' } , 
                                                            { Id : 3 , value : 'L' } , 
                                                            { Id : 5 , value : 'L' } , 
                                                            { Id : 4 , value : 'O' } ] ,
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
                if ( main === 'slides' || main === 'codes' || main === 'demos' ) {
                    path = [ main.replace( /s$/ , '' ) , 1 , '' ].join( '/' );
                } else if ( main === 'slide' ) {
                    if ( !( num in slide2code ) ) { return ; }

                    path = [ 'code' , slide2code[ num ] , '' ].join( '/' );
                } else if ( main === 'code' ) {
                    if ( !( num in code2demo ) ) { return ; }

                    path = [ 'demo' , code2demo[ num ] , '' ].join( '/' );
                } else {
                    if ( !( num in demo2slide ) ) { return ; }

                    path = [ 'slide' , demo2slide[ num ] , '' ].join( '/' );
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
