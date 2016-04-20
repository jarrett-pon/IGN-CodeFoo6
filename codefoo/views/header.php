<!DOCTYPE html>

<html>

    <head>
        <!-- viewport to make things more responsive -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <!-- http://getbootstrap.com/ -->
        <link href="css/bootstrap.min.css" rel="stylesheet"/>

        <link href="css/styles.css" rel="stylesheet"/>

        <?php if (isset($title)): ?>
            <title>Code Foo 2016: <?= htmlspecialchars($title) ?></title>
        <?php else: ?>
            <title>Code Foo 2016</title>
        <?php endif ?>

        <!-- https://jquery.com/ -->
        <script src="js/jquery-1.11.3.min.js"></script>

        <!-- http://getbootstrap.com/ -->
        <script src="js/bootstrap.min.js"></script>

        <script src="js/scripts.js"></script>
        <script src="js/combinatrics.js"></script>

    </head>

    <body>

        <div class="container">
            <div id="top">
                <div>
                    <a href="index.php"><img alt="Code Foo 2016" src="img/logo.png" style="max-width: 100%;"/></a>
                </div>
                    <ul class="nav nav-pills">
                        <li><a href="index.php" >Introduction</a></li>
                        <li><a href="lego.php">Legos</a></li>
                        <li><a href="scrabble.php">Scrabble&trade;</a></li>
                        <li><a href="back_end.php">QWERTY</a></li>
                        <li><a href="date.php">ISO 8601</a><li>
                        <li><a href="front_end.php">Front End</a></li>
                        <li><a href="bonus.php">Bonus</a></li>
                    </ul>

            </div>

            <div id="middle">

<!-- Dark graphic by <a href="http://yanlu.de">Yannick</a> from <a href="http://www.flaticon.com/">Flaticon</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>. Made with <a href="http://logomakr.com" title="Logo Maker">Logo Maker</a> -->
