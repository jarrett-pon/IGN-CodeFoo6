<?php
    /**
     * helpers.php
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

    //For QWERTY backend
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

    //FOR ISO 8601 backend

    //converts month to corresponding 2-digit month
    function convertmonth($month)
    {
        $month = strtolower($month);
        $output = "";
        switch ($month)
        {
            case "jan":
            case "january":
                $output = "01";
                break;
            case "feb":
            case "february":
                $output = "02";
                break;
            case "mar":
            case "march":
                $output = "03";
                break;
            case "apr":
            case "april":
                $output = "04";
                break;
            case "may":
                $output = "05";
                break;
            case "jun":
            case "june":
                $output = "06";
                break;
            case "jul":
            case "july":
                $output = "07";
                break;
            case "aug":
            case "august":
                $output = "08";
                break;
            case "sep":
            case "september":
                $output ="09";
                break;
            case "oct":
            case "october":
                $output="10";
                break;
            case "nov":
            case "november":
                $output="11";
                break;
            case "dec":
            case "december":
                $output ="12";
                break;
        }
        return $output;
    }
    //converts date to ISO 8601
    function convertdate($date)
    {
        //variables for date
        $output = "";
        $day = "DD";
        $month = "MM";
        $year = "YYYY";
        $hour = "hh";
        $minute = "mm";
        $second = "ss";
        $tzd = "TZD"; //time zone designator

        //For [20/03/2016]
        if ( preg_match("/([0-2]\d|3[0-1])\/(0[1-9]|1[1-2])\/(\d{4})/", $date, $matches) )
        {
            $day = "$matches[1]";
            $month = "$matches[2]";
            $year = "$matches[3]";
        }
        //For [3/20/2016] find the day,month,year
        if ( preg_match("/([1-9]|1[0-2])\/([0-2]\d|3[0-1])\/(\d{4})/", $date, $matches) )
        {
            $day = "$matches[2]";
            $month = "$matches[1]";
            $year = "$matches[3]";
        }
        // For [16:05:07] to find hour,minute,second **** it's assumed the hour will be prepended with 0 *****
        // Additionally, this is purposely put behind [4:05:07 PM], because this could match [4:05:07 PM].
        if ( preg_match("/(0[1-9]|1\d|2[0-4]):([0-5]\d):([0-5]\d)/", $date, $matches))
        {
            $hour = "$matches[1]";
            $minute = "$matches[2]";
            $second = "$matches[3]";
        }
        //For [4:05 PM] find hour,minute
        //This function is placed here before [4:05:07 PM] for good reason.
        if ( preg_match("/([1-9]|1[0-2]):([0-5]\d) (PM|AM)/", $date, $matches))
        {
            //if PM need to convert to military time (except for 12:mm:ss PM)
            if($matches[3] == "PM" && $matches[1] < 12)
            {
                $matches[1] += 12;
            }
            //Once PM is converted, any hour less than 10 needs 0 prepend
            if($matches[1] < 10)
            {
                $matches[1] = "0$matches[1]";
            }
            // 12:mm:ss AM, hh = 00
            if($matches[1]==12 && $matches[3] == "AM")
            {
                $matches[1] = "00";
            }
            $hour = "$matches[1]";
            $minute = "$matches[2]";
        }
        //For [4:05:07 PM] find hour,minute,second
        if ( preg_match("/([1-9]|1[0-2]):([0-5]\d):([0-5]\d) (PM|AM)/", $date, $matches))
        {
            //if PM need to convert to military time (except for 12:mm:ss PM)
            if($matches[4] == "PM" && $matches[1] < 12)
            {
                $matches[1] += 12;
            }
            //Once PM is converted, any hour less than 10 needs 0 prepend
            if($matches[1] < 10)
            {
                $matches[1] = "0$matches[1]";
            }
            // 12:mm:ss AM, hh = 00
            if($matches[1]==12 && $matches[4] == "AM")
            {
                $matches[1] = "00";
            }
            $hour = "$matches[1]";
            $minute = "$matches[2]";
            $second = "$matches[3]";
        }
        //For [Sunday, March 20, 2016], [Sunday, MAR 20, 2016], find day,month,year
        if( preg_match("/(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?) ([0-2]\d|3[0-1]), (\d{4})/i", $date, $matches))
        {
            $matches[1] = convertmonth($matches[1]);
            $day = "$matches[3]";
            $month = "$matches[1]";
            $year = "$matches[4]";
        }
        // For [Sunday 20th of March 2016], find day, month, year
        if ( preg_match("/([1-9]|[1-2]\d|3[0-1])[snrt][tdh] of (Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?) (\d{4})/i", $date, $matches))
        {
            $matches[2] = convertmonth($matches[2]);
            $day = "$matches[1]";
            $month = "$matches[2]";
            $year = "$matches[4]";
        }
        // For [20 Mar 2016], find day, month ,year
        if ( preg_match("/([1-9]|[1-2]\d|3[0-1]) (Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?) (\d{4})/i", $date, $matches))
        {
            $matches[2] = convertmonth($matches[2]);
            $day = "$matches[1]";
            $month = "$matches[2]";
            $year = "$matches[4]";
        }
        // For [20160320], find day, month, year
        if ( preg_match("/(\d{4})(0[1-9]|1[0-2])([0-2]\d|3[0-1])/", $date, $matches))
        {
            $day = "$matches[3]";
            $month = "$matches[2]";
            $year = "$matches[1]";
        }
        // For [2016.03.20], find day, month, year
        if ( preg_match("/(\d{4}).(0[1-9]|1[0-2]).([0-2]\d|3[0-1])/", $date, $matches))
        {
            $day = "$matches[3]";
            $month = "$matches[2]";
            $year = "$matches[1]";
        }
        // For [March 20]
        if ( preg_match("/(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?) ([0-2]\d|3[0-1])/i", $date, $matches))
        {
            $matches[1] = convertmonth($matches[1]);
            $day = "$matches[3]";
            $month = "$matches[1]";
        }
        // For [March, 2016]
        if ( preg_match("/(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?), (\d{4})/i", $date, $matches))
        {
            $matches[1] = convertmonth($matches[1]);
            $year = "$matches[3]";
            $month = "$matches[1]";
        }
        //For GMT, at this point in time only works for GMT time zone.
        if ( preg_match("/GMT/", $date, $matches))
        {
            $tzd = "+00:00";
        }
        //For [-08:00] There is a wide range of TZD including +8:45,+14:00
        // Since there are so many types, find the pattern which leads with - or + and then (number up to 24):(number up to 60) numbers after. No other pattern is like this on the list.
        if ( preg_match("/([-|+])(0[1-9]|1\d|2[0-4]):([0-5]\d)/", $date, $matches))
        {
            $tzd = "$matches[1]$matches[2]:$matches[3]";
        }
        // For [-0800] Same as previous if statement, but without :
        if ( preg_match("/([-|+])(0[1-9]|1\d|2[0-4])([0-5]\d)/", $date, $matches))
        {
            $tzd = "$matches[1]$matches[2]:$matches[3]";
        }
        // LAST ONE for [2016-20-03] This is wrong order in terms of month and day, need to switch back
        if ( preg_match("/(\d{4})-([0-2]\d|3[0-1])-(0[1-9]|1[1-2])/", $date, $matches) )
        {
            $day = "$matches[2]";
            $month = "$matches[3]";
            $year = "$matches[1]";
        }
        //check for if month is only one digit long and append 0
        if (strlen($month) == 1)
        {
            $month = "0".$month;
        }
        $output = $year."-".$month."-".$day."T".$hour.":".$minute.":".$second.$tzd;
        //Determine if there was an error.
        if ($output ==  "YYYY-MM-DDThh:mm:ssTZD")
        {
            return "You did not input one of the allowed formats.";
        }
        else
        {
            return $output;
        }

    }

?>

