<div class="container">
    <div class="jumbotron">
        <h2>Convert to QWERTY</h2>
        <p>If aliens have replaced your keyboard with a AZERTY keyboard, look no further. Type in the text box below as if you were using a QWERTY keyboard with your AZERTY keyboard. Once finished, submit and the program will convert your AZERTY input to QWERTY.</p>
        <p>If your h key happens to be stuck, use + (which is in its usual spot!) as an escape key of sorts. Prelude the h or H with + and only the character preluded with + will output. Also left curly brace or { doesn't work due to the AZERTY keyboard. To display { then type in +^ according to the AZERTY keyboard. Lastly the tilde or ~ doesn't work on AZERTY keyboard either. To display ~ then type in +<?=chr(178)?> according to the AZERTY keyboard. To make sure you have the specific <a href="http://www.ign.com/code-foo/2016/qwerty-azerty.jpg">AZERTY key board check here.</a></p>
    </div>

    <form action="back_end.php" method="post">
        <fieldset>
            <div class="form-group">
                <textarea class = "form-control textarea" name="keyboard-input" placeholder="Type text with AZERTY key board here." rows="5"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-default" type="submit">Convert to QWERTY</button>
            </div>
        </fieldset>
    </form>
    <?php if(!empty($output)): ?>
        <h2>Results</h2>
        <p>Here are the results from the program:</p>
        <p style="background-color: white; text-align:left; padding: 15px 5px;"> <?= $output ?> </p>
    <?php endif ?>
</div>
