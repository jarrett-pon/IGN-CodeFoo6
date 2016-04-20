<?php

    // configuration
    require("../includes/config.php");


    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
    render("date_form.php", ["title"=>"ISO 8601"]);
    }
    else if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $date = "";
        $date = $_POST["date"];
        $outputdate = convertdate($date);
        render("date_form.php", ["outputdate"=>$outputdate, "title" => "ISO 8601 Results"]);
    }

?>
