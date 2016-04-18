<?php

    require("../includes/config.php");

    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        render("scrabble_form.php",["title"=>"Best Scrabble Word","warning"=>"filler"]);
    }

    else if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if ($_POST["dictionary"] == "Ign List")
        {
            $dictionary = file("../includes/cfwords.txt", FILE_IGNORE_NEW_LINES);
        }
        else if($_POST["dictionary"] == "OSPD")
        {
            $dictionary = file("../includes/ospd.txt", FILE_IGNORE_NEW_LINES);
        }
        else if($_POST["dictionary"] == "Enable")
        {
            $dictionary = file("../includes/enable.txt", FILE_IGNORE_NEW_LINES);
        }


        $letters = strtolower($_POST["letters"]);
        if (!ctype_alpha($letters))
        {
            $warning = "badinput";
            render("scrabble_form.php", ["title" => "Bad input", "warning"=>$warning]);
        }
        foreach($dictionary as $word)
        {
            $result = check($word, $letters);
            if($result == true)
            {
                $picked[] = $word;
            }
        }

        // if no words are found, give the bad news
        if(empty($picked))
        {
            //let user know that nothing is found
            $warning = "empty";
            render("scrabble_form.php", ["title" => "Bad luck", "warning"=>$warning]);
        }
        else
        {
            $warning = "filler";
        }

        $ordered = order($picked);
        arsort($ordered);

        $results = intval($_POST["results"]);
        if($results > count($ordered))
        {
            $results = count($ordered);
        }

        $i = 1;
        $data = array();

        foreach($ordered as $key => $value)
        {
            $data[$key] = $value;
            if($i == $results)
            {
                break;
            }
            $i++;
        }
        render("scrabble_form.php", ["data" => $data, "title" => "Scrabble Results", "warning"=>$warning]);
    }
?>
