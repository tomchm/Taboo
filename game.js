/***************************************************************
* Author:      Kabir Singh
* Date:        27 September 2014
* Description: Driving javascript module to manage interactive 
*               content in mobile Taboo app 
*****************************************************************/

    /* embedded JSON data*/
    /* TODO figure out how to pull a JSON file to allow future dynamic, crowd-source cards */
    var taboo_words = '{"words":[' +
          '{"guess":"cat","fail1":"kitten","fail2":"feline","fail3":"pet","fail4":"meow" },' +
          '{"guess":"pirate","fail1":"treasure","fail2":"hook","fail4":"parrot","fail4":"booty" },' +
          '{"guess":"memory","fail1":"remember","fail2":"forget","fail3":"brain","fail4":"computer" },' +
          '{"guess":"magazine","fail1":"article","fail2":"cosmopolitan","fail3":"sports illustrated","fail4":"newspaper" },' +
          '{"guess":"spicy","fail1":"taste","fail2":"strong","fail3":"food","fail4":"hot" },' +
          '{"guess":"sleep in","fail1":"sleep","fail2":"vacation","fail3":"rest","fail4":"late" },' +
          '{"guess":"wisdom","fail1":"teeth","fail2":"knowledge","fail3":"virtue","fail4":"ancient" },' +
          '{"guess":"bitter","fail1":"sour","fail2":"taste","fail3":"beer","fail4":"lemon" },' +
          '{"guess":"dead end","fail1":"turn around","fail2":"cul de sac","fail3":"one way","fail4":"3 pt turn" },' +
          '{"guess":"coat","fail1":"jacket","fail2":"outside","fail3":"cold","fail4":"warm" },' +
          '{"guess":"bread","fail1":"sandwich","fail2":"yeast","fail3":"bakery","fail4":"flour" },' +
          '{"guess":"nervous","fail1":"tense","fail2":"wire","fail3":"past","fail4":"future" },' +
          '{"guess":"hammer","fail1":"nail","fail2":"tool","fail3":"Thor","fail4":"shark" },' +
          '{"guess":"wig","fail1":"hair","fail2":"judge","fail3":"fake","fail4":"costume" },' +
          '{"guess":"emergency","fail1":"hospital","fail2":"accident","fail3":"urgent","fail4":"ambulance" },' +
          '{"guess":"dog","fail1":"bark","fail2":"furry","fail3":"pet","fail4":"best friend" },' +
          '{"guess":"bird","fail1":"fly","fail2":"feather","fail3":"pet","fail4":"chirp" }]}';

    /* game manager obj -- in charge of overarching global variables throughout session of game */
    function Game_Manager(input_num) {
        this.num_players = input_num;
        this.scores = [0, 0];
        this.round_time = 0;
        this.wordlist;
        /* index in word list currently being used */
        this.current_word = 0;
        this.current_round = 0;
        /* team whose turn it is currently */
        this.current_team = 0;
        /* create dialogue to see if user wants to use mic?*/
        this.using_mic = 0;
        this.missed_words;
        this.guessed_words;
    }

    // based on num players dialog, create game manager if possible 
    function make_game_manager() {
        //Get the number of players and create a game manager
        var num_players = document.getElementById("Number_players").value;
        var game_manager; 
        if (!isNumber(num_players)) {
            alert("Please enter a valid number of players!");
        } else {
            if (num_players > 20) {
                alert ("Please enter a number of players less than 20.");
            } else {
                game_manager = new Game_Manager(num_players);
                populate_word_list(game_manager);
            }
        }

        //RUN!
        start_game(game_manager);
    }

    /* pull embedded json data put in word list of game manager */
    function populate_word_list(game_manager) {
        var json_data = JSON.parse(taboo_words);
        game_manager.wordlist = json_data;
    }


    /* start! */
    function start_game(game_manager) {
        //clear the page
        document.body.innerHTML = " ";
        // run timer and display in body */
        run_timer(game_manager);

    }

    /* starts timer, but continually updates round_time inside game_manager */
    /* should be renamed start_round if code for interaction is here */
    function run_timer(game_manager) {
        game_manager.round_time = 20;
        /* run every 1000 milliseconds */
        var counter = setInterval(timer, 1000);
        /* formatting for "00:20?" */
        document.body.innerHTML = game_manager.round_time;

        /* func. called every second */
        function timer() {
            if(game_manager.round_time <= 0) {
                game_manager.round_time = -1;
                clearInterval(counter);
            } else {
                game_manager.round_time--;
                /* formatting */
                document.body.innerHTML = game_manager.round_time;
            }
        }

        if(game_manager.round_time == -1) {
            /* THIS IS WHERE YOU DISABLE SHIT AND END THE ROUND */
        }
            

        
    }
    /*******************************************************/
    /*                 HELPER FUNCTIONS                    */
    /*******************************************************/

    /* print the word list */
    function print_words(game_manager) {
        for(var i = 0; i < 17; i++) {
            console.log(game_manager.wordlist.words[i].guess);
        }
    }
    /* number check function*/
    function isNumber(obj) { return !isNaN(parseFloat(obj)) }
    /* print the contents of game manager */
    function print_game_info(game_manager) {
        document.body.innerHTML = "num_players: " + game_manager.num_players + "\n scores: " + game_manager.scores[0] + " - " + game_manager.scores[1] + "\n round time: " + game_manager.round_time + "\n current word: " + game_manager.current_word + "\n current round: " + game_manager.current_round;
    }

