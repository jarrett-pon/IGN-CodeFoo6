<!--
<script type="text/javascript" src="js/phaser.min.js"></script>
<script type="text/javascript" src = "js/main.js"></script>

<div id='gameDiv' class="container">

</div>
-->

<!-- images for playing cards credit (even though its not necessary):
https://code.google.com/archive/p/vector-playing-cards
-->

<div class="container" id = "poker">
    <div class="jumbotron">
      <h2>Play against the Texas Hold'em AI</h2>
      <p>To play, follow the prompt! </p>
    </div>
    <div id = "poker-table">
        <div class="row">
            <div class="col-xs-1"></div>
            <div class="col-xs-2"></div>
            <div id="opp-card-1" class="col-xs-2"></div>
            <div class="col-xs-2"></div>
            <div id="opp-card-2" class="col-xs-2"></div>
            <div class="col-xs-2"></div>
            <div class="col-xs-1"></div>
        </div>
        <div class="row">
            <div class="col-xs-1" ></div>
            <div id = "card-1" class="col-xs-2"></div>
            <div id = "card-2" class="col-xs-2"></div>
            <div id = "card-3" class="col-xs-2"></div>
            <div id = "card-4" class="col-xs-2"></div>
            <div id = "card-5" class="col-xs-2"></div>
            <div class="col-xs-1" ></div>
        </div>
        <div class="row">
            <div class="col-xs-1" ></div>
            <div class="col-xs-2"></div>
            <div id = "player-card-1" class="col-xs-2"></div>
            <div class="col-xs-2"></div>
            <div id = "player-card-2" class="col-xs-2"></div>
            <div class="col-xs-2"></div>
            <div class="col-xs-1"></div>
        </div>
    </div>
    <div class="row" style="border:solid; background:#BFBEBE;">
        <div class="col-xs-1" ></div>
        <div class="col-xs-2" ><button id="bet" class="btn btn-default" type="submit"><strong>Bet</strong></button></div>
        <div class="col-xs-2" >
            <button id="raise" class="btn btn-default" type="submit">Raise</button>
            <br>
            <button id="callcheck" class="btn btn-default" type="submit">Check/Call</button>
            <br>
            <button id="fold" class="btn btn-default" type="submit">Fold</button>
            <br>
            <button id="all-in" class="btn btn-default" type="submit">All-in</button>
        </div>
        <div class="col-xs-4" >
            <div id="poker-response">
                <p>Welcome to Jarrett's Texas Hold'em. This is limit Texas Hold'em with my twist. In this version, the player always makes the first decision. There is no big or small blind only a bet or raise of 25 points. You are only allowed to raise on your turn and re-raises are only allowed once by your opponent. First player to win all the points wins the entire game. Good Luck!</p>
            </div>
        </div>
        <div class="col-xs-3" >
            <div class="cash">
                <p>Your Points:</p>
                <p id = "player-points">1000</p>
            </div>
            <div class="cash">
                <p>Opponent Points:</p>
                <p id="opp-points">1000</p>
            </div>
            <div class="cash">
                <p>Current Pot:</p>
                <p id = "pool">0</p>
            </div>
        </div>
    </div>
</div>
