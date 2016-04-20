<?php

    // configuration
    require("../includes/config.php");


    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
    render("back_end_form.php", ["title"=>"Backend"]);
    }
    else if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $input = $_POST["keyboard-input"];
        $output = convert($input);
        render("back_end_form.php", ["output" => $output,"title" => "Back End Results"]);
    }

?>
