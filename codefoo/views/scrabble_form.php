<div class="container">
      <div class="jumbotron">
        <h2>Best Scrabble&trade; Word!</h2>
        <p>Welcome to the scrabble&trade; word program that will find words for you given a list of letters. To use this program enter the list of letters you have, select which dictionary you want to pull words from, and select how many results you wish to display! Results will display by top points. Additionally you can choose from three different dictionaries. The IGN dictionary is the list given in Code Foo 2016. OSPD is the official scrabble player's dictionary and Enable is an extended dictionary. For more information on <a href="http://www.puzzlers.org/dokuwiki/doku.php?id=solving%3awordlists%3aabout%3astart">OSPD and Enable.</a></p>
      </div>

    <form action="scrabble.php" method="post">
        <div id="scrabble">
            <div class="form-group">
                <input autocomplete="off" autofocus class="form-control" name="letters" placeholder="Letters" type="text"/>
            </div>
            <br>
            <br>
            <div class="form-group">
                <label for="sel1">Results to display:</label>
                <input type="number" class="form-control" name="results" min="1" max="10" value="1">
            </div>
            <div class="form-group">
                <label for="sel2">Dictionary to use:</label>
                    <select name="dictionary" class="form-control">
                        <option>Ign List</option>
                        <option>OSPD</option>
                        <option>Enable</option>
                    </select>
            </div>
            <div class="form-group">
                <button id="findwords"class="btn btn-default" type="submit">Find words!</button>
            </div>
        </div>
    </form>
    <?php if($warning == "empty"): ?>
        <br>
        <h3> Sorry! With your inputted letters and selected dictionary, no words were found.</h3>
    <?php endif ?>
    <?php if($warning == "badinput"): ?>
        <br>
        <h3> Please enter only enter letters!</h3>
    <?php endif ?>

    <?php if(!empty($data)): ?>
        <h2>Results</h2>
        <p>Here are the results from the program:</p>
        <table class="table">
          <thead>
            <tr>
              <th>Word</th>
              <th>Points Value</th>
            </tr>
          </thead>

          <tbody>

          <?php foreach($data as $key => $value): ?>

              <tr>
                  <td><?= $key ?></td>
                  <td><?= $value ?></td>
              </tr>

          <?php endforeach ?>

          </tbody>
        </table>
    <?php endif ?>
</div>
