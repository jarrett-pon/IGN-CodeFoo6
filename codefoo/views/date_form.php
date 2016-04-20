<div class="container">
    <form action="date.php" method="post">
        <div class="jumbotron">
            <h2>Convert to ISO 8601</h2>
            <p>Have a date that conforms to <a href="http://www.ign.com/code-foo/2016/dates.txt">one of these formats</a> and need to convert it to ISO 8601? Look no further! Input your date you need and this program will generate the corresponding date in ISO 8601. Note: The format will be displayed in this form specifically: YYYY-MM-DDThh:mm:ssTZD, if there are missing parts to the full form, placeholders will be in place.</p>
        </div>
        <fieldset>
            <div class="form-group">
                <input autocomplete="off" autofocus class="form-control" name="date" placeholder="Date" type="text"/>
            </div>
            <div class="form-group">
                <button class="btn btn-default" type="submit">Convert to ISO 8601</button>
            </div>
        </fieldset>
    </form>
    <?php if(!empty($outputdate)): ?>
        <h2>Results</h2>
        <p>Here are the results from the ISO 8601 program:</p>
        <p style="background-color: white; text-align:left; padding: 15px 5px; margin-bottom:50px;"> <?= $outputdate ?> </p>
    <?php endif ?>
</div>
