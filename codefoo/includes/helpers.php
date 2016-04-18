<?php

    /**
     * helpers.php
     *
     * Computer Science 50
     * Problem Set 7
     *
     * Helper functions.
     */

    require_once("config.php");

    /**
     * Apologizes to user with message.
     */
    function apologize($message)
    {
        render("apology.php", ["message" => $message]);
    }

    /**
     * Facilitates debugging by dumping contents of argument(s)
     * to browser.
     */
    function dump()
    {
        $arguments = func_get_args();
        require("../views/dump.php");
        exit;
    }

    /**
     * Redirects user to location, which can be a URL or
     * a relative path on the local host.
     *
     * http://stackoverflow.com/a/25643550/5156190
     *
     * Because this function outputs an HTTP header, it
     * must be called before caller outputs any HTML.
     */

    function redirect($location)
    {
        if (headers_sent($file, $line))
        {
            trigger_error("HTTP headers already sent at {$file}:{$line}", E_USER_ERROR);
        }
        header("Location: {$location}");
        exit;
    }

    /**
     * Renders view, passing in values.
     */
    function render($view, $values = [])
    {
        // if view exists, render it
        if (file_exists("../views/{$view}"))
        {
            // extract variables into local scope
            extract($values);

            // render view (between header and footer)
            require("../views/header.php");
            require("../views/{$view}");
            require("../views/footer.php");
            exit;
        }

        // else err
        else
        {
            trigger_error("Invalid view: {$view}", E_USER_ERROR);
        }
    }

    /**
     * Function for scrabble
     */

    function order($picked)
    {
        foreach($picked as $word)
        {
            $points = 0;

            $split_word = str_split($word);

            foreach($split_word as $letter)
            {
                if($letter == 'a' || $letter == 'e' || $letter == 'i' || $letter == 'o' || $letter == 'u' || $letter == 'l' || $letter == 'n' || $letter == 's' || $letter == 't' || $letter == 'r')
                {
                    $points += 1;
                }
                else if($letter == 'd' || $letter == 'g')
                {
                    $points += 2;
                }
                else if($letter == 'b' || $letter == 'c' || $letter == 'm' || $letter == 'p')
                {
                    $points += 3;
                }
                else if($letter == 'f' || $letter == 'h' || $letter == 'v' || $letter == 'w' || $letter == 'y')
                {
                    $points += 4;
                }
                else if($letter == 'k')
                {
                    $points += 5;
                }
                else if($letter == 'j' || $letter == 'x')
                {
                    $points += 8;
                }
                else if($letter == 'q' || $letter == 'z')
                {
                    $points += 10;
                }
            }

            $pointed[$word] = $points;
        }
        arsort($pointed);
        return $pointed;
    }

    /**
     * Function for scrabble
     */

    function check($word, $letters)
    {

        $split_word = str_split($word);
        sort($split_word);

        for($i=0; $i<strlen($word); $i++)
        {
            if($i == 0)
            {
                $position = strpos($letters,$split_word[$i]);
                if($position === false)
                {
                    return false;
                }
            }

            else if($split_word[$i] == $split_word[$i-1])
            {
                $position = strpos($letters,$split_word[$i],$position+1);
                if($position === false)
                {
                    return false;
                }

            }
            else
            {
                $position = strpos($letters,$split_word[$i]);
                if($position === false)
                {
                    return false;
                }
            }
        }
        return true;
    }

    /**
    * Function for backend, keyboard Problem
    **/

    function convert($input)
    {
        $split_input = str_split($input);
        $output = "";

        for($i=0;$i<strlen($input);$i++)
        {
            //If statment for stick h, {, and ~

            //For stick h, let user know that prelude h with + like an escape character
            //Any h or H without + will be ignored
            if ($split_input[$i] == "+" && $split_input[$i + 1] == "h")
            {
                $output .= "h";
            }
            else if($split_input[$i] == "+" && $split_input[$i + 1] == "H")
            {
                $output .= "H";
            }
            else if($split_input[$i] == "+" && $split_input[$i + 1] == "^")
            {
                $output .= "{";
                $i++;
            }
            else if ($split_input[$i] == "+" && $split_input[$i + 1] == chr(178))
            {
                $output .= "~";
                $i++;
            }
            else
            {
                switch($split_input[$i])
                {
                    case "h":
                        $output .= "";
                        break;
                    case "H":
                        $output .= "";
                        break;
                    case "a":
                        $output .= "q";
                        break;
                    case "A":
                        $output .="Q";
                        break;
                    case "z":
                        $output .= "w";
                        break;
                    case "Z":
                        $output .= "W";
                        break;
                    case "q":
                        $output .= "a";
                        break;
                    case "Q":
                        $output .= "A";
                        break;
                    case "m":
                        $output .= ";";
                        break;
                    case "M":
                        $output .= ":";
                        break;
                    case chr(249):
                        $output .= "'";
                        break;
                    case "%":
                        $output .= "\"";
                        break;
                    case chr(181):
                        $output .= "|";
                        break;
                    case "*":
                        $output .= "\\";
                        break;
                    case "w":
                        $output .= "z";
                        break;
                    case "W":
                        $output .="Z";
                        break;
                    case ",":
                        $output .= "m";
                        break;
                    case "?":
                        $output .= "M";
                        break;
                    case ";":
                        $output .= ",";
                        break;
                    case ".":
                        $output .= "<";
                        break;
                    case ":":
                        $output .= ".";
                        break;
                    case "/":
                        $output .= ">";
                        break;
                    case chr(167):
                        $output .= "?";
                        break;
                    case "^":
                        $output .= "[";
                        break;
                    case chr(163):
                        $output .= "}";
                        break;
                    case "$":
                        $output .= "]";
                        break;
                    case chr(178):
                        $output .= "`";
                        break;
                    case chr(38):
                        $output .= "1";
                        break;
                    case "1":
                        $output .= "!";
                        break;
                    case chr(233):
                        $output .= "2";
                        break;
                    case "2":
                        $output .= "@";
                        break;
                    case "\"":
                        $output .= "3";
                        break;
                    case "3":
                        $output .= "#";
                        break;
                    case "'":
                        $output .= "4";
                        break;
                    case "4":
                        $output .= "$";
                        break;
                    case "(":
                        $output .= "5";
                        break;
                    case "5":
                        $output .= "%";
                        break;
                    case "-":
                        $output .= "6";
                        break;
                    case "6":
                        $output .= "^";
                        break;
                    case chr(232):
                        $output .= "7";
                        break;
                    case "7":
                        $output .= "&";
                        break;
                    case "_":
                        $output .= "8";
                        break;
                    case "8":
                        $output .= "*";
                        break;
                    case chr(231):
                        $output .= "9";
                        break;
                    case "9";
                        $output .= "(";
                        break;
                    case chr(224):
                        $output .= "0";
                        break;
                    case "0":
                        $output .= ")";
                        break;
                    case ")":
                        $output .= "-";
                        break;
                    case chr(186):
                        $output .= "_";
                        break;
                    default:
                        $output .= $split_input[$i];
                }
            }
        }

        return $output;
    }
?>
