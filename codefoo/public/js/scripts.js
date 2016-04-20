/**
 * scripts.js
 *
 * Global JavaScript, if any.
 */

//starts functions when document is loaded
$(document).ready(function(){

/******************************** Start of front-end problem **********************/

//Converts numbered month to 3 letter month

    function convertmonth(month)
    {
        var newmonth;
        switch (month) {
            case "01":
                newmonth = "Jan";
                break;
            case "02":
                newmonth = "Feb";
                break;
            case "03":
                newmonth = "Mar";
                break;
            case "04":
                newmonth = "Apr";
                break;
            case "05":
                newmonth = "May";
                break;
            case "06":
                newmonth = "Jun";
                break;
            case "07":
                newmonth = "Jul";
                break;
            case "08":
                newmonth = "Aug";
                break;
            case "09":
                newmonth = "Sep";
                break;
            case "10":
                newmonth = "Oct";
                break;
            case "11":
                newmonth = "Nov";
                break;
            case "12":
                newmonth = "Dec";
                break;
        }
        return newmonth;
    }
    var startIndex = 0;
    var count = 10;
    var url = 'https://ign-apis.herokuapp.com/articles?startIndex=' + startIndex + '&count=' + count + '&callback=?';

    $.getJSON(url, function(data){
        //Use for loop to iterate through all the results from api
        //In case the count or startIndex is different than what was input, take the values from actual api response
        startIndex = data.startIndex;
        count = data.count;

        //need i to index through each response in api
        //need j to make sure correct number of iterations done
        for (var i = 0, j = startIndex; j < (startIndex+count); i++, j++)
        {
            //current server requires links to be in https so parsing thumbnail link
            var thumbnail = data.data[i].thumbnail;
            var headline = data.data[i].metadata.headline;
            var slug = data.data[i].metadata.slug;

            //Since url is not included in output of api, one has to be created.
            //url follows this format: ign.com/articles/year/month/day/slug
            //To get the date, need to parse the publishDate...
            var publishDate = data.data[i].metadata.publishDate;
            var date = publishDate.split('-');
            var year = date[0];
            var month = date[1];
            var date_day = date[2].split('T');
            var day = date_day[0];

            var subHeadline = data.data[i].metadata.subHeadline;
            if (subHeadline == null)
            {
                subHeadline = headline;
            }
            var link = 'http://www.ign.com/articles/' + year + '/' + month + '/' + day + '/' + slug;

            month = convertmonth(month);

            $('.playlist').append("<a class='playlist-item' style='background-image:linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + thumbnail + ");' href='"
                + link + "'><div class='layer'><span class = 'details'><span class='object'>"
                + headline + "</span><span class='title'>"
                + subHeadline + "</span><span class = 'duration'>"
                + month + "<br>" + year + "</span></span></div></a>");
        }
        $(".playlist .playlist-item:last-child").addClass("no-border");
        $('.playlist').append("<span id= 'more'> SEE MORE ARTICLES </span>");


    });
    $('.videos').click(function(){
        if ( $('.articles').hasClass('active') )
        {
            /*switch active class */
            $('.articles').removeClass('active');
            $('.videos').addClass('active');
            /*Articles had active last, so we need to empty playlist and then show a videos playlist */
            $('.playlist').empty();
            startIndex = 0;
            count = 10;
            var url = 'https://ign-apis.herokuapp.com/videos?startIndex=' + startIndex + '&count=' + count + '&callback=?';
            $.getJSON(url, function(data){
                //Use for loop to iterate through all the results from api
                //In case the count or startIndex is different than what was input, take the values from actual api response
                startIndex = data.startIndex;
                count = data.count;

                //need i to index through each response in api
                //need j to make sure correct number of iterations done
                for (var i = 0, j = startIndex; j < (startIndex+count); i++, j++)
                {
                    //current server requires links to be in https so parsing thumbnail link
                    var thumbnail = data.data[i].thumbnail;
                    var headline = data.data[i].metadata.title;
                    var duration = data.data[i].metadata.duration;

                    var seconds = duration % 60;
                    if (duration < 60)
                    {
                        if (seconds < 10)
                        {
                            var time = '0:0' + seconds;
                        }
                        else {
                            var time = '0:' + seconds;
                        }
                    }
                    else
                    {
                        var minutes = (duration-seconds)/60;
                        if (seconds < 10)
                        {
                            var time = minutes+ ':0' + seconds;
                        }
                        else {
                            var time = minutes + ':' + seconds;
                        }
                    }



                    //URL provided in videos api
                    var  link = data.data[i].metadata.url;
                    var subHeadline = data.data[i].metadata.longTitle;
                    if (subHeadline == null)
                    {
                        subHeadline = headline;
                    }
                    $('.playlist').append("<a class='playlist-item' style='background-image:linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("
                        + thumbnail + ");' href='"
                        + link + "'><div class='layer'><span class = 'details'><span class='object'>"
                        + headline + "</span><span class='title'>"
                        + subHeadline + "</span><span class = 'duration'>"
                        + time + "</span></span></div></a>");
                }
                $(".playlist .playlist-item:last-child").addClass("no-border");
                $('.playlist').append("<span id = 'more'> SEE MORE VIDEOS </span>");
            });
        }

    });

    $('.articles').click(function(){

        if ( $('.videos').hasClass('active') )
        {
            /*switch active class */
            $('.videos').removeClass('active');
            $('.articles').addClass('active');
            /*Articles had active last, so we need to empty playlist and then show a videos playlist */
            $('.playlist').empty();
            startIndex = 0;
            count = 10;
            var url = 'https://ign-apis.herokuapp.com/articles?startIndex=' + startIndex + '&count=' + count + '&callback=?';
            $.getJSON(url, function(data){
                //Use for loop to iterate through all the results from api
                //In case the count or startIndex is different than what was input, take the values from actual api response
                startIndex = data.startIndex;
                count = data.count;

                //need i to index through each response in api
                //need j to make sure correct number of iterations done
                for (var i = 0, j = startIndex; j < (startIndex+count); i++, j++)
                {
                    //current server requires links to be in https so parsing thumbnail link
                    var thumbnail = data.data[i].thumbnail;
                    var headline = data.data[i].metadata.headline;
                    var slug = data.data[i].metadata.slug;

                    //Since url is not included in output of api, one has to be created.
                    //url follows this format: ign.com/articles/year/month/day/slug
                    //To get the date, need to parse the publishDate...
                    var publishDate = data.data[i].metadata.publishDate;
                    var date = publishDate.split('-');
                    var year = date[0];
                    var month = date[1];
                    var date_day = date[2].split('T');
                    var day = date_day[0];

                    var subHeadline = data.data[i].metadata.subHeadline;
                    if (subHeadline == null)
                    {
                        subHeadline = headline;
                    }
                    var link = 'http://www.ign.com/articles/' + year + '/' + month + '/' + day + '/' + slug;

                    month = convertmonth(month);

                    $('.playlist').append("<a class='playlist-item' style='background-image:linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + thumbnail + ");' href='"
                        + link + "'><div class='layer'><span class = 'details'><span class='object'>"
                        + headline + "</span><span class='title'>"
                        + subHeadline + "</span><span class = 'duration'>"
                        + month + "<br>" + year + "</span></span></div></a>");
                }
                $(".playlist .playlist-item:last-child").addClass("no-border");
                $('.playlist').append("<span id = 'more'> SEE MORE ARTICLES </span>");
            });
        }

    });

    $(".playlist").on("click","#more", function() {
        if ( $('.videos').hasClass('active') )
        {
            $(".playlist-item").removeClass("no-border");
            $('#more').remove();
            startIndex += 10;
            count = 10;
            var url = 'https://ign-apis.herokuapp.com/videos?startIndex=' + startIndex + '&count=' + count + '&callback=?';
            $.getJSON(url, function(data){
                //Use for loop to iterate through all the results from api
                //In case the count or startIndex is different than what was input, take the values from actual api response
                startIndex = data.startIndex;
                count = data.count;

                //need i to index through each response in api
                //need j to make sure correct number of iterations done
                for (var i = 0, j = startIndex; j < (startIndex+count); i++, j++)
                {
                    //current server requires links to be in https so parsing thumbnail link
                    var thumbnail = data.data[i].thumbnail;
                    var headline = data.data[i].metadata.title;
                    var duration = data.data[i].metadata.duration;

                    var seconds = duration % 60;
                    if (duration < 60)
                    {
                        if (seconds < 10)
                        {
                            var time = '0:0' + seconds;
                        }
                        else {
                            var time = '0:' + seconds;
                        }
                    }
                    else
                    {
                        var minutes = (duration-seconds)/60;
                        if (seconds < 10)
                        {
                            var time = minutes+ ':0' + seconds;
                        }
                        else {
                            var time = minutes + ':' + seconds;
                        }
                    }

                    //URL provided in videos api
                    var  link = data.data[i].metadata.url;
                    var subHeadline = data.data[i].metadata.longTitle;
                    if (subHeadline == null)
                    {
                        subHeadline = headline;
                    }
                    $('.playlist').append("<a class='playlist-item' style='background-image:linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("
                        + thumbnail + ");' href='"
                        + link + "'><div class='layer'><span class = 'details'><span class='object'>"
                        + headline + "</span><span class='title'>"
                        + subHeadline + "</span><span class = 'duration'>"
                        + time + "</span></span></div></a>");
                }
                $(".playlist .playlist-item:last-child").addClass("no-border");
                $('.playlist').append("<span id = 'more'> SEE MORE ARTICLES </span>");
            });
        }
        else if ( $('.articles').hasClass('active') )
        {
            $(".playlist-item").removeClass("no-border");
            $('#more').remove();
            startIndex += 10;
            count = 10;
            var url = 'https://ign-apis.herokuapp.com/articles?startIndex=' + startIndex + '&count=' + count + '&callback=?';
            $.getJSON(url, function(data){
                //Use for loop to iterate through all the results from api
                //In case the count or startIndex is different than what was input, take the values from actual api response
                startIndex = data.startIndex;
                count = data.count;

                //need i to index through each response in api
                //need j to make sure correct number of iterations done
                for (var i = 0, j = startIndex; j < (startIndex+count); i++, j++)
                {
                    //current server requires links to be in https so parsing thumbnail link
                    var thumbnail = data.data[i].thumbnail;
                    var headline = data.data[i].metadata.headline;
                    var slug = data.data[i].metadata.slug;

                    //Since url is not included in output of api, one has to be created.
                    //url follows this format: ign.com/articles/year/month/day/slug
                    //To get the date, need to parse the publishDate...
                    var publishDate = data.data[i].metadata.publishDate;
                    var date = publishDate.split('-');
                    var year = date[0];
                    var month = date[1];
                    var date_day = date[2].split('T');
                    var day = date_day[0];

                    var subHeadline = data.data[i].metadata.subHeadline;
                    if (subHeadline == null)
                    {
                        subHeadline = headline;
                    }
                    var link = 'http://www.ign.com/articles/' + year + '/' + month + '/' + day + '/' + slug;

                    month = convertmonth(month);

                    $('.playlist').append("<a class='playlist-item' style='background-image:linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + thumbnail + ");' href='"
                        + link + "'><div class='layer'><span class = 'details'><span class='object'>"
                        + headline + "</span><span class='title'>"
                        + subHeadline + "</span><span class = 'duration'>"
                        + month + "<br>" + year + "</span></span></div></a>");
                }
                $(".playlist .playlist-item:last-child").addClass("no-border");
                $('.playlist').append("<span id = 'more'> SEE MORE ARTICLES </span>");
            });
        }
    });

/************************* End of Front-end problem *********************************/

/***************************Stat of poker game **************************************/

    //Set Initial variables
    var playerpoints = 1000;
    var opppoints=1000;
    var playerbet = 0;
    var oppbet = 0;
    var pool = 0;

    var playercard1=[];
    var playercard2=[];
    var oppcard1=[];
    var oppcard2=[];
    var card1=[];
    var card2=[];
    var card3=[];
    var card4=[];
    var card5=[];
    var bet = true;
    var raise = false;
    var callcheck = false;
    var allin = false;
    var fold = false;

    //pointvalue of the player's hands
    var playerhand = 0;
    var opphand = 0;

    //Stage 0 - first get cards, stage 1: 3 cards show, stage 2: 4th card, stage 3: 5th card
    var stage = 0;

    var response = "";

    //Create Deck
    var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    var suits = ['c','s','d','h'];
    var deck = [];

    for (var i = 0; i < numbers.length; i++)
    {
        for (var j = 0; j < suits.length; j++)
        {
            deck.push([numbers[i],suits[j]]);
        }
    }

    //function to get location of card img
    function findcardimg(card){
        var cardname = card.join("");
        return "img/cards/" + cardname + ".png";
    }

    //shuffle deck function, using fisher-yates  shuffle algorithm
    function shuffle(deck, size){
        // Start from the last element and swap one by one.
        //don't need to run for first element (or last card)
        for (var i = size-1; i > 0; i--)
        {
            // Pick a random index from 0 to i (need to add 1)
            var j = Math.floor((Math.random() * (i+1) ));
            //swap elements
            var temp = deck[j];
            deck[j] = deck[i];
            deck[i] = temp;
        }
    }
    /*
    for (x in deck)
    {
        console.log(deck[x]);
    }
    */

    //function to determine best hand
    function checkhand(c1, c2, c3, c4, c5, c6, c7)
    {
        //Need combinations of all pokerhands (14)
        //using js from https://github.com/dankogai/js-combinatorics
        //the Combinatorics.combination function creates a generator which generates combinations
        cmb = Combinatorics.combination([c1,c2,c3,c4,c5,c6,c7], 5);

        //array we push to from generator
        var hands = [];
        while( hand = cmb.next())
        {
            //Now we will find point value of each hand and make an object where the key is the poitns and value is the array
            var pointvalue = 0;
            //then we will create a new array that will determine the unique number of card numbers
            //For example, if unique = 5, all 5 numbers are unique possible straight,flush,high card only
            //unique = 4: one pair only, unique = 3: two pairs or one triple, unique = 2: quads
            function cardorder(hand) {
                var a = [], b = [], prev;
                //first we will sort the hand by card number
                hand.sort(function(c,d){return c[0] > d[0];});

                for ( var i = 0; i < hand.length; i++ ) {
                    if ( hand[i][0] !== prev )
                    {
                        a.push(hand[i][0]);
                        b.push(1);
                    }
                    else
                    {
                        b[b.length-1]++;
                    }
                    prev = hand[i][0];
                }
                //returns an array with two array
                //first array returns card numbers only without repeats
                //second array returns the counts for those card numbers
                return [a, b];
            }

            var result = cardorder(hand);
            //the length of either function will give the unique number
            //having both of these arrays will help with determining which cardnumber is the pair/triple/quad

            //Unique cardnumbers = 5, Can be straight flush, flush, straight, or high card
            if(result[0].length == 5)
            {
                //check for straight
                if( (hand[0][0] == hand[1][0] - 1 && hand[1][0] == hand[2][0] - 1 && hand[2][0] == hand[3][0] - 1 && hand[3][0] == hand[4][0] - 1) || (hand[0][0] == 1 && hand[1][0] == 10 && hand[2][0] == 11 && hand[3][0] == 12 && hand[4][0] == 13))
                {
                    //check for straight flush
                    if( hand[0][1] == hand[1][1] && hand[0][1] == hand[2][1] && hand[0][1] == hand[3][1] && hand[0][1] == hand[4][1])
                    {
                        //check if royal flush
                        if(hand[0][0] == 1)
                        {
                            //point values are determined by strength of hand, 900 is maximum for royal flush
                            pointvalue = 90000;
                            hands.push({"pointvalue":pointvalue, "hand":hand});
                        }
                        else
                        {
                            //800 points for straight flush + value of highest card
                            pointvalue = 80000 + hand[4][0];
                            hands.push({"pointvalue":pointvalue, "hand":hand});
                        }
                    }
                    else
                    {
                        //record points for straight, check if ace high straight
                        if(hand[0][0] == 1)
                        {
                            pointvalue = 40014;
                            hands.push({"pointvalue":pointvalue, "hand":hand});
                        }
                        else
                        {
                            //points for straight + value of highcard
                            pointvalue = 40000 + hand[4][0];
                            hands.push({"pointvalue":pointvalue, "hand":hand});
                        }
                    }
                }
                //check for flush alone
                else if ( hand[0][1] == hand[1][1] && hand[0][1] == hand[2][1] && hand[0][1] == hand[3][1] && hand[0][1] == hand[4][1])
                {
                    //check for ace high flush
                    if (hand[0][0] == 1)
                    {
                        //points for ace high flush
                        pointvalue = 50014;
                        hands.push({"pointvalue":pointvalue, "hand":hand});
                    }
                    else
                    {
                        //points for highcard
                        pointvalue = 50000 + hand[4][0];
                        hands.push({"pointvalue":pointvalue, "hand":hand});
                    }
                }
                //must be high card only
                else
                {
                    //if highcard is ace
                    if(hand[0][0] == 1)
                    {
                        pointvalue = 14;
                        hands.push({"pointvalue":pointvalue, "hand":hand});
                    }
                    else
                    {
                        pointvalue = hand[4][0];
                        hands.push({"pointvalue":pointvalue, "hand":hand});
                    }
                }

            }
            //Unique cardnumbers = 4, only one pair exists
            if(result[0].length==4)
            {
                //to find cardnumber of pair, find where it is in results[0]
                var position=null;

                for(var i = 0; i < result[1].length; i++)
                {
                    if(result[1][i] == 2)
                    {
                        position = i;
                    }
                }
                //if pair is ace
                if(result[0][position] == 1)
                {
                    pointvalue = 10014;
                    hands.push({"pointvalue":pointvalue,"hand":hand});
                }
                else
                {
                    //pointvalue for pair + cardnumber of pair
                    pointvalue = 10000 + result[0][position];
                    hands.push({"pointvalue":pointvalue,"hand":hand});
                }
            }
            //unique cardnumbers = 3, either two pairs one three of a kind
            if(result[0].length == 3)
            {
                //if triple or two pair, find position in results[0]
                var position1=null;
                var position2=null;

                for(var i = 0; i < result[1].length; i++)
                {
                    //if its a triple set position1
                    if(result[1][i] == 3)
                    {
                        position1 = i;
                    }
                    if(result[1][i] == 2)
                    {
                        //if its two pairs check if position1 is set
                        //if yes, that means first pair is already found
                        if (position1 !==null) //needs extra = because 0 and null being the same
                        {
                            position2 = i;
                        }
                        //if not first pair not found yet
                        else
                        {
                            position1 = i;
                        }
                    }
                }
                //if position2 was filled, its a two pair
                if (position2 !==null) //needs extra = because 0 and null being the same
                {
                    //its in acesnding order, so position2 has better pair
                    //two pair point value + cardnumber of the higher pair

                    //if higher pair is ace
                    if(result[0][position2] == 1)
                    {
                        pointvalue = 21400 + result[0][position1];
                        hands.push({"pointvalue":pointvalue,"hand":hand});
                    }
                    else
                    {
                        pointvalue = 20000 + (result[0][position2] * 100) + result[0][position1];
                        hands.push({"pointvalue":pointvalue,"hand":hand});
                    }
                }
                //position2 is empty, must be a triple
                else
                {
                    //if trip aces
                    if(result[0][position1] == 1)
                    {
                        pointvalue = 30014;
                        hands.push({"pointvalue":pointvalue,"hand":hand});
                    }
                    else
                    {
                        //pointvalue for triple + cardnumber of the triple
                        pointvalue = 30000 + result[0][position1];
                        hands.push({"pointvalue":pointvalue,"hand":hand});
                    }
                }
            }
            //unique cardnumber = 2: only quad or fullhouse possible
            if(result[0].length == 2)
            {
                //fullhouses can't tie, so don't have to worry about that like the two pair
                //use position
                var position3 = null;
                var position4 = null;

                for(var i = 0; i < result[1].length; i++)
                {
                    //If theres a triple, must be fullhouse (with this unique number)
                    if(result[1][i] == 3)
                    {
                        position3 = i;
                    }
                    if(result[1][i] == 4)
                    {
                        position4 = i;
                    }
                }
                //if its a fullhouse
                if (position3 !== null)
                {
                    //if trips part of full house are aces
                    if(result[0][position3] == 1)
                    {
                        pointvalue = 60014;
                        hands.push({"pointvalue":pointvalue,"hand":hand});
                    }
                    else
                    {
                        //pointvalue for fullhouse + triple cardvalue
                        pointvalue = 60000 + result[0][position3];
                        hands.push({"pointvalue":pointvalue,"hand":hand});
                    }
                }
                //otherwise must be quad
                else
                {
                    //if quad aces
                    if(result[0][position4] == 1)
                    {
                        pointvalue = 70014;
                        hands.push({"pointvalue":pointvalue,"hand":hand});
                    }
                    else
                    {
                        pointvalue = 70000 + result[0][position4];
                        hands.push({"pointvalue":pointvalue,"hand":hand});
                    }
                }

            }
        }
        //sort descending by pointvalue and return that top pointvalue to get best hands

        hands.sort(function(a,b){return b.pointvalue - a.pointvalue;});
        return hands[0].pointvalue;
    }

    //function to give a pointvalue for starting hand. (different point value system) !!!!Part of AI
    function checkstart(c1, c2)
    {
        //if both cards are a high pair
        if ( c1[0] == c2[0] && (c1[0] == 1 || c1[0] == 10 || c1[0] == 11 || c1[0] == 12 || c1[0] == 13))
        {
            return 700;
        }
        //cards are a low pair
        else if ( c1[0] == c2[0] )
        {
            return 600;
        }
        //Both face cards and same suits
        else if ( c1[1] == c2[1] && (c1[0] == 1 || c1[0] == 10 || c1[0] == 11 || c1[0] == 12 || c1[0] == 13) && (c2[0] == 1 || c2[0] == 10 || c2[0] == 11 || c2[0] == 12 || c2[0] == 13) )
        {
            return 500;
        }
        //are they both face cards
        else if ( (c1[0] == 1 || c1[0] == 10 || c1[0] == 11 || c1[0] == 12 || c1[0] == 13) && (c2[0] == 1 || c2[0] == 10 || c2[0] == 11 || c2[0] == 12 || c2[0] == 13) )
        {
            return 400;
        }
        //one face card and suited
        else if ( c1[1] == c2[1] && ((c1[0] == 1 || c1[0] == 10 || c1[0] == 11 || c1[0] == 12 || c1[0] == 13) || (c2[0] == 1 || c2[0] == 10 || c2[0] == 11 || c2[0] == 12 || c2[0] == 13)) )
        {
            return 300;
        }
        //is one a face card
        else if ((c1[0] == 1 || c1[0] == 10 || c1[0] == 11 || c1[0] == 12 || c1[0] == 13) || (c2[0] == 1 || c2[0] == 10 || c2[0] == 11 || c2[0] == 12 || c2[0] == 13) )
        {
            return 200;
        }
        //low card same suit
        else if ( c1[1] == c2[1] )
        {
            return 100;
        }
        //unpaired, non suited low card (this version doesn't consider straight potential)
        else
        {
            return 0;
        }
    }

    //function to determine the hands, determine the winner, and announce the winner
    function findwinner()
    {
        //No matter what point in game, show all cards
        $('#card-1').empty();
        $('#card-2').empty();
        $('#card-3').empty();
        $('#card-4').empty();
        $('#card-5').empty();
        $('#card-1').append("<img src='" + findcardimg(card1) + "' alt='Playing card'>");
        $('#card-2').append("<img src='" + findcardimg(card2) + "' alt='Playing card'>");
        $('#card-3').append("<img src='" + findcardimg(card3) + "' alt='Playing card'>");
        $('#card-4').append("<img src='" + findcardimg(card4) + "' alt='Playing card'>");
        $('#card-5').append("<img src='" + findcardimg(card5) + "' alt='Playing card'>");
        $('#opp-card-1').empty();
        $('#opp-card-1').append("<img src='" + findcardimg(oppcard1) + "' alt='Playing card'>");
        $('#opp-card-2').empty();
        $('#opp-card-2').append("<img src='" + findcardimg(oppcard2) + "' alt='Playing card'>");
        //Display who won.
        $('#poker-response p').empty();
        if(playerhand > opphand)
        {
            $('#poker-response p').append("You win this hand and gained " + pool + " points! ");
            playerpoints += pool;
            pool = 0;
        }
        else if(playerhand < opphand)
        {
            $('#poker-response p').append("You lost this hand and your opponent gained " + pool + " points! ");
            opppoints += pool;
            pool = 0;
        }
        //Things get complicated on a tie...
        else
        {
            //If we find an ace, going to change it to 14, this will change the value in deck, at end of findwinner() we will change it back...
            if( playercard1[0] == 1)
            {
                playercard1[0] = 14;
            }
            if( playercard2[0] == 1)
            {
                playercard2[0] = 14;
            }
            if( oppcard1[0] == 1)
            {
                oppcard1[0] = 14;
            }
            if( oppcard2[0] == 1)
            {
                oppcard2[0] = 14;
            }

            //find what the table has
            var tablehand = checkhand(card1,card2,card3,card4,card5,0,0);
            //if tablehand == playerhand == opphand, table has best hand and we can look for high card
            if( tablehand == playerhand)
            {
                //if playerhand has the high card
                if( (playercard1[0] > playercard2[0] && oppcard1[0] > oppcard2[0] && playercard1[0] > oppcard1[0]) || ( playercard2[0] > playercard1[0] && oppcard1[0] > oppcard2[0] && playercard2[0] > oppcard1[0]) || ( playercard1[0] > playercard2[0] && oppcard2[0] > oppcard1[0] && playercard1[0] > oppcard2[0]) || ( playercard2[0] > playercard1[0] && oppcard2[0] > oppcard1[0] && playercard2[0] > oppcard2[0]) )
                {
                    $('#poker-response p').append("You win this hand with a high card and gained "+ pool + " points! ");
                    playerpoints += pool;
                    pool = 0;
                }
                else if( (playercard1[0] > playercard2[0] && oppcard1[0] > oppcard2[0] && playercard1[0] < oppcard1[0]) || ( playercard2[0] > playercard1[0] && oppcard1[0] > oppcard2[0] && playercard2[0] < oppcard1[0]) || ( playercard1[0] > playercard2[0] && oppcard2[0] > oppcard1[0] && playercard1[0] < oppcard2[0]) || ( playercard2[0] > playercard1[0] && oppcard2[0] > oppcard1[0] && playercard2[0] < oppcard2[0]) )
                {
                    $('#poker-response p').append("You lost this hand against a high card and your opponenet gained  " + pool + " points! ");
                    opppoints += pool;
                    pool = 0;
                }
                else
                {
                    $('#poker-response p').append("You tied this hand with the same high card! ");
                    opppoints += (pool/2);
                    playerpoints += (pool/2);
                    pool = 0;
                }

            }
            //If table doesn't have best hand:
            //If there is a tie, we can look at high card to determine winner
            //No high card for: four of a kind, stright, flushes, fullhouses.
            else if ( playerhand > 40000)
            {
                $('#poker-response p').append("You tied this hand! (No high card in this case) ");
                opppoints += (pool/2);
                playerpoints += (pool/2);
                pool = 0;
            }
            //In any of these situations high card can be determined by what card we don't have
            //We know what card we don't have because the last two numbers of point number tells us what
            //card we do have!

            //impossible to tie on quad unless its on the table which is already covered
            //only trips scenario possible is pair on the table and each player has the other card
            //similar with same single pair scenario. either both have same pocket pairs (tie) or share a card with table (and thats the best hands)
            //Similar to two pair scenario. the only non-tie scenario is if one pair on board and second, same pair is made like a single pair is made.
            else if( playerhand > 10000 && playerhand < 40000 )
            {
                if( (playercard1[0] == oppcard1[0] && playercard2[0] > oppcard2[0]) || (playercard1[0] == oppcard2[0] && playercard2[0] > oppcard1[0]) || (playercard2[0] == oppcard2[0] && playercard1[0] > oppcard1[0]) || (playercard2[0] == oppcard1[0] && playercard1[0] > oppcard2[0]) )
                {
                    $('#poker-response p').append("You win this hand with a high card and gained "+ pool + " points! ");
                    playerpoints += pool;
                    pool = 0;
                }
                else if( (playercard1[0] == oppcard1[0] && playercard2[0] < oppcard2[0]) || (playercard1[0] == oppcard2[0] && playercard2[0] < oppcard1[0]) || (playercard2[0] == oppcard2[0] && playercard1[0] < oppcard1[0]) || (playercard2[0] == oppcard1[0] && playercard1[0] < oppcard2[0]) )
                {
                    $('#poker-response p').append("You lost this hand against a high card and your opponent gained "+ pool + " points! ");
                    opppoints += pool;
                    pool = 0;
                }
                else
                {
                    $('#poker-response p').append("You tied this hand with the same high card! ");
                    opppoints += (pool/2);
                    playerpoints += (pool/2);
                    pool = 0;
                }
            }
            //Shouldn't get to this point but if it does...
            else
            {
                $('#poker-response p').append("You tied this hand! (May not actually be tie... but we couldn't figure out.) ");
                opppoints += (pool/2);
                playerpoints += (pool/2);
                pool = 0;
            }
            //since js passes values by reference, need to change aces back to 1 if any were changed to 14
            if( playercard1[0] == 14)
            {
                playercard1[0] = 1;
            }
            if( playercard2[0] == 14)
            {
                playercard2[0] = 1;
            }
            if( oppcard1[0] == 14)
            {
                oppcard1[0] = 1;
            }
            if( oppcard2[0] == 14)
            {
                oppcard2[0] = 1;
            }

        }

        //update point totals
        $('#player-points').text(playerpoints);
        $('#opp-points').text(opppoints);
        $('#pool').text(pool);

        //Display what hand the player got
        if(playerhand == 90000)
        {
            $('#poker-response p').append("WHOA! You got a ROYAL FLUSH! ");
        }
        else if(playerhand > 80000)
        {
            $('#poker-response p').append("You got a straight flush. ");
        }
        else if(playerhand > 70000)
        {
            $('#poker-response p').append("You got a four of a kind. ");
        }
        else if(playerhand > 60000)
        {
            $('#poker-response p').append("You got a full house. ");
        }
        else if(playerhand > 50000)
        {
            $('#poker-response p').append("You got a flush. ");
        }
        else if(playerhand > 40000)
        {
            $('#poker-response p').append("You got a straight. ");
        }
        else if(playerhand > 30000)
        {
            $('#poker-response p').append("You got a three of a kind. ");
        }
        else if(playerhand > 20000)
        {
            $('#poker-response p').append("You got a two pair. ");
        }
        else if(playerhand > 10000)
        {
            $('#poker-response p').append("You got a pair. ");
        }
        else
        {
            $('#poker-response p').append("You have a high card. ");
        }

        //Display what the opp got
        if(opphand == 90000)
        {
            $('#poker-response p').append("WHOA! You got beat by a ROYAL FLUSH! ");
        }
        else if(opphand > 80000)
        {
            $('#poker-response p').append("Your opponent got a straight flush. ");
        }
        else if(opphand > 70000)
        {
            $('#poker-response p').append("Your opponent got a four of a kind. ");
        }
        else if(opphand > 60000)
        {
            $('#poker-response p').append("Your opponent got a full house. ");
        }
        else if(opphand > 50000)
        {
            $('#poker-response p').append("Your opponent got a flush. ");
        }
        else if(opphand > 40000)
        {
            $('#poker-response p').append("Your opponent got a straight. ");
        }
        else if(opphand > 30000)
        {
            $('#poker-response p').append("Your opponent got a three of a kind. ");
        }
        else if(opphand > 20000)
        {
            $('#poker-response p').append("Your oppponent got a two pair. ");
        }
        else if(opphand > 10000)
        {
            $('#poker-response p').append("Your opponent got a pair. ");
        }
        else
        {
            $('#poker-response p').append("Your opponent has a high card. ");
        }

        if(playerpoints <= 0)
        {
            $('#poker-response p').append("You ran out of points, you lose!");
            bet = false;
            raise = false;
            callcheck = false;
            allin=false;
            fold=false;
        }
        else if(opppoints <= 0)
        {
            $('#poker-response p').append("Your opponent ran out of points, you win!");
            bet = false;
            raise = false;
            callcheck = false;
            allin=false;
            fold=false;
        }
        else
        {
            bet = true;
            raise = false;
            callcheck = false;
            allin=false;
            fold=false;
            $('#poker-response p').append("No one has won all the points yet, click bet to play next hand.");
        }
    }

    //function to check the response of opp AI
    function oppcheck(playerinput)
    {
        //For my AI, no choice is 100%, a random number generator is used
        //My responses are dependent on "chance".
        //For a better hand, the AI will be more aggressive. A bad hand, more likely to fold.
        //The actual player can therefore not "know" what the AI has based on response.
        //Besides throwing off the player, it is used as a bluff chance as well.
        //I found resources to determine what are good responses, but for this version I am using my own intuition...
        //Side note: AI does not cheat, only responds based on the stage (and what is avaiable)
        var randnum = Math.floor((Math.random() * 100) + 1); //num 1 to 100
        //depending on stage, AI provides different response
        //for now AI responds same with raise and callcheck, future version may diverse the answer
        if ( stage == 0 )
        {

            //Get pointvalue of starting hand
            var starthandval = checkstart(oppcard1,oppcard2);
            //In this version, player can only raise one time in any stage, and thats at the beginning
            if (playerinput == "raise")
            {
                //for a high pair (no fold, high raise)
                if(starthandval == 700)
                {
                    //79% chance to raise
                    if( randnum < 80 )
                    {
                        return "raise";
                    }
                    //6% chance to check
                    else if( randnum < 86)
                    {
                        return "callcheck";
                    }
                    //15% to go allin
                    else
                    {
                        return "allin";
                    }
                }
                //for pair or 2 face cards/same suit
                else if(starthandval > 499)
                {
                    if( randnum < 80 )
                    {
                        return "raise";
                    }
                    else if( randnum < 90)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //either both face card or one face card but suited
                else if(starthandval > 299)
                {
                    if( randnum < 65 )
                    {
                        return "raise";
                    }
                    else if( randnum < 95)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //one face card
                else if(starthandval == 200)
                {
                    if( randnum < 40 )
                    {
                        return "raise";
                    }
                    else if( randnum < 90)
                    {
                        return "callcheck";
                    }
                    else if (randnum < 97)
                    {
                        return "fold";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //suited low cards
                else if(starthandval == 100)
                {
                    if( randnum < 10 )
                    {
                        return "raise";
                    }
                    else if( randnum < 70)
                    {
                        return "callcheck";
                    }
                    else if (randnum < 98)
                    {
                        return "fold";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //unsuited, different low cards
                else
                {
                    if( randnum < 5 )
                    {
                        return "raise";
                    }
                    else if( randnum < 65)
                    {
                        return "callcheck";
                    }
                    else if (randnum < 99)
                    {
                        return "fold";
                    }
                    else
                    {
                        return "allin";
                    }
                }
            }
            //same percents as raise, except in this case the opp won't fold
            else if (playerinput == "callcheck")
            {
                //for a high pair (no fold, high raise)
                if(starthandval == 700)
                {
                    //79% chance to raise
                    if( randnum < 80 )
                    {
                        return "raise";
                    }
                    //6% chance to check
                    else if( randnum < 86)
                    {
                        return "callcheck";
                    }
                    //15% to go allin
                    else
                    {
                        return "allin";
                    }
                }
                //for pair or 2 face cards/same suit
                else if(starthandval > 499)
                {
                    if( randnum < 80 )
                    {
                        return "raise";
                    }
                    else if( randnum < 90)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //either both face card or one face card but suited
                else if(starthandval > 299)
                {
                    if( randnum < 65 )
                    {
                        return "raise";
                    }
                    else if( randnum < 95)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //one face card
                else if(starthandval == 200)
                {
                    if( randnum < 40 )
                    {
                        return "raise";
                    }
                    else if( randnum < 97)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //suited low cards
                else if(starthandval == 100)
                {
                    if( randnum < 10 )
                    {
                        return "raise";
                    }
                    else if( randnum < 98)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //unsuited, different low cards
                else
                {
                    if( randnum < 5 )
                    {
                        return "raise";
                    }
                    else if( randnum < 99)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
            }
            //if player goes all in early on (only fold or call)
            else if (playerinput == "allin")
            {
                //for a high pair (no fold, high raise)
                if(starthandval == 700)
                {
                    //79% chance to raise
                    if( randnum < 90 )
                    {
                        return "callcheck";
                    }
                    //15% to go allin
                    else
                    {
                        return "fold";
                    }
                }
                //for pair or 2 face cards/same suit
                else if(starthandval > 499)
                {
                    if( randnum < 85 )
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
                //either both face card or one face card but suited
                else if(starthandval > 299)
                {
                    if( randnum < 65 )
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
                //one face card
                else if(starthandval == 200)
                {
                    if( randnum < 35 )
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
                //suited low cards
                else if(starthandval == 100)
                {
                    if( randnum < 10 )
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
                //unsuited, different low cards
                else
                {
                    if( randnum < 5 )
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
            }
        }
        //After this we will use checkhand (adding zeros where no cards are avaiable)
        //We will be more aggressive early stages and less agressive later stages.
        else if (stage == 1)
        {
            var stage1val = checkhand(oppcard1,oppcard2,card1,card2,card3,0,0);
            //This version we are just doing responses on general hands. Since the point system does give more information than that can be more detailed
            if (playerinput == "raise")
            {
                //for full-house or better high-chance to win, but don't want to scare with all-in
                if(stage1val > 60000)
                {
                    //64% chance to raise
                    if( randnum < 70 )
                    {
                        return "raise";
                    }
                    //5% chance to check
                    else if( randnum < 75)
                    {
                        return "callcheck";
                    }
                    //26% to go allin
                    else
                    {
                        return "allin";
                    }
                }
                //for flush/straight the other player may get one later on, so more aggressive with all-in
                else if(stage1val > 40000)
                {
                    if( randnum < 60 )
                    {
                        return "raise";
                    }
                    else if( randnum < 65)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //trips or 2 pair, still a good hand at this point. should be agressive but don't want to scare them
                else if(stage1val > 20000)
                {
                    if( randnum < 80 )
                    {
                        return "raise";
                    }
                    else if( randnum < 85)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //one pair okay hand, better than nothing
                else if(stage1val > 10000)
                {
                    if( randnum < 25 )
                    {
                        return "raise";
                    }
                    else if( randnum < 96)
                    {
                        return "callcheck";
                    }
                    else if (randnum < 98)
                    {
                        return "fold";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //just a highcard, still early so fold chance not that high
                else
                {
                    if( randnum < 10 )
                    {
                        return "raise";
                    }
                    else if( randnum < 95)
                    {
                        return "callcheck";
                    }
                    else if (randnum < 99)
                    {
                        return "fold";
                    }
                    else
                    {
                        return "allin";
                    }
                }
            }
            else if (playerinput == "callcheck")
            {
                //for full-house or better high-chance to win, but don't want to scare with all-in
                if(stage1val > 60000)
                {
                    //64% chance to raise
                    if( randnum < 70 )
                    {
                        return "raise";
                    }
                    //5% chance to check
                    else if( randnum < 75)
                    {
                        return "callcheck";
                    }
                    //26% to go allin
                    else
                    {
                        return "allin";
                    }
                }
                //for flush/straight the other player may get one later on, so more aggressive with all-in
                else if(stage1val > 40000)
                {
                    if( randnum < 60 )
                    {
                        return "raise";
                    }
                    else if( randnum < 65)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //trips or 2 pair, still a good hand at this point. should be agressive but don't want to scare them
                else if(stage1val > 20000)
                {
                    if( randnum < 80 )
                    {
                        return "raise";
                    }
                    else if( randnum < 85)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //one pair okay hand, better than nothing
                else if(stage1val > 10000)
                {
                    if( randnum < 25 )
                    {
                        return "raise";
                    }
                    else if( randnum < 97)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //just a highcard, still early so fold chance not that high
                else
                {
                    if( randnum < 10 )
                    {
                        return "raise";
                    }
                    else if( randnum < 98)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
            }
            //if opponent goes all in
            else if (playerinput == "allin")
            {
                //for straight or better, call the all in hands down this early.
                if(stage1val > 40000)
                {
                    return "callcheck";
                }
                //trips or 2 pair, very low fold chance
                else if(stage1val > 20000)
                {
                    if( randnum < 99)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
                //one pair okay hand, low call chance, but still need to have a chance to do it so opponent doesn't abuse all in
                else if(stage1val > 10000)
                {
                    if( randnum < 15)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
                //just a highcard, still give SOME chance to call
                else
                {
                    if( randnum < 6)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
            }
        }
        //at stage 2 and 3, same response, can make detailed later version
        else if( stage == 2 || stage == 3)
        {
            var stage2val = checkhand(oppcard1,oppcard2,card1,card2,card3,card4,0);
            var stage3val = checkhand(oppcard1,oppcard2,card1,card2,card3,card4,card5);

            if (playerinput == "raise")
            {
                //for full-house or better high-chance to win, still don't want to scare away, but higher chance for all in than before
                if( (stage == 2 && stage2val > 60000) || (stage == 3 && stage3val > 60000) )
                {
                    //60% chance to raise
                    if( randnum < 61 )
                    {
                        return "raise";
                    }
                    //5% chance to check
                    else if( randnum < 66)
                    {
                        return "callcheck";
                    }
                    //35% to go allin
                    else
                    {
                        return "allin";
                    }
                }
                //for flush/straight, same as above a little less aggressive
                else if((stage == 2 && stage2val > 40000) || (stage == 3 && stage3val > 40000))
                {
                    if( randnum < 70 )
                    {
                        return "raise";
                    }
                    else if( randnum < 75)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //trips or 2 pair, still good at the end, all in not necessary as much.
                else if((stage == 2 && stage2val > 20000) || (stage == 3 && stage3val > 20000))
                {
                    if( randnum < 85 )
                    {
                        return "raise";
                    }
                    else if( randnum < 90)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //one pair okay hand, not very good at this point (still have allin for bluff chance)
                else if((stage == 2 && stage2val > 10000) || (stage == 3 && stage3val > 10000))
                {
                    if( randnum <  15)
                    {
                        return "raise";
                    }
                    else if( randnum < 45)
                    {
                        return "callcheck";
                    }
                    else if (randnum < 90)
                    {
                        return "fold";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //just a highcard, raise and all in just for bluff
                else
                {
                    if( randnum < 10 )
                    {
                        return "raise";
                    }
                    else if( randnum < 35)
                    {
                        return "callcheck";
                    }
                    else if (randnum < 90)
                    {
                        return "fold";
                    }
                    else
                    {
                        return "allin";
                    }
                }
            }
            else if (playerinput == "callcheck")
            {
                //for full-house or better high-chance to win, still don't want to scare away, but higher chance for all in than before
                if((stage == 2 && stage2val > 60000) || (stage == 3 && stage3val > 60000))
                {
                    //60% chance to raise
                    if( randnum < 61 )
                    {
                        return "raise";
                    }
                    //5% chance to check
                    else if( randnum < 66)
                    {
                        return "callcheck";
                    }
                    //35% to go allin
                    else
                    {
                        return "allin";
                    }
                }
                //for flush/straight, same as above a little less aggressive
                else if((stage == 2 && stage2val > 40000) || (stage == 3 && stage3val > 40000))
                {
                    if( randnum < 70 )
                    {
                        return "raise";
                    }
                    else if( randnum < 75)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //trips or 2 pair, still good at the end, all in not necessary as much.
                else if((stage == 2 && stage2val > 20000) || (stage == 3 && stage3val > 20000))
                {
                    if( randnum < 85 )
                    {
                        return "raise";
                    }
                    else if( randnum < 90)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //one pair okay hand, not very good at this point (still have allin for bluff chance)
                else if((stage == 2 && stage2val > 10000) || (stage == 3 && stage3val > 10000))
                {
                    if( randnum <  15)
                    {
                        return "raise";
                    }
                    else if( randnum < 90)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
                //just a highcard, raise and all in just for bluff
                else
                {
                    if( randnum < 10 )
                    {
                        return "raise";
                    }
                    else if( randnum < 90)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "allin";
                    }
                }
            }
            //if opponent goes all in
            else if (playerinput == "allin")
            {
                //for fullhouse or better have to call all in
                if((stage == 2 && stage2val > 60000) || (stage == 3 && stage3val > 60000))
                {
                    return "callcheck";
                }
                //for flush and straight, could be chance opponenet has higher, so chance of fold.
                else if((stage == 2 && stage2val > 40000) || (stage == 3 && stage3val > 40000))
                {
                    if( randnum < 90)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
                //two pair and trips are still good hand, higher chance to fold tho
                else if((stage == 2 && stage2val > 20000) || (stage == 3 && stage3val > 20000))
                {
                    if( randnum < 60)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
                //pair or high card here, very small chance to call all in. Leave some chance to call bluff
                else
                {
                    if( randnum < 6)
                    {
                        return "callcheck";
                    }
                    else
                    {
                        return "fold";
                    }
                }
            }
        }
    }

    //Only function for bet is to start the round.
    $('#bet').on('click', function() {
        //Initialize Round
        if ( bet == true )
        {

            //Empty the poke table
            $('#player-card-1').empty();
            $('#player-card-2').empty();
            $('#opp-card-1').empty();
            $('#opp-card-2').empty();
            $('#card-1').empty();
            $('#card-2').empty();
            $('#card-3').empty();
            $('#card-4').empty();
            $('#card-5').empty();
            //Betting phase over
            bet = false;
            //Restart stage to beginning of game
            stage = 0;
            //Equal blinds set at 25 points each and pool to 0
            playerbet = 25;
            oppbet = 25;
            pool = 0;
            //update points for both playerpoints and display
            playerpoints -= playerbet;
            opppoints -= oppbet;
            $('#player-points').text(playerpoints);
            $('#opp-points').text(opppoints);
            //Set and display the pot
            pool = playerbet + oppbet;
            $('#pool').text(pool);
            //Tell player what going on in prompt
            $('#poker-response p').text("You and your opponent automatically bet 25 points at the beginning of each round. Each raise is worth 25 additional points. ");
            //shuffle deck
            shuffle(deck,52);
            //first two cards to the player and display on table
            playercard1 = deck[0];
            $('#player-card-1').append("<img src='" + findcardimg(playercard1) + "' alt='Playing card'>");
            playercard2 = deck[1];
            $('#player-card-2').append("<img src='" + findcardimg(playercard2) + "' alt='Playing card'>");
            //next two cards to opponent and show the back of his cards
            oppcard1 = deck[2];
            oppcard2 = deck[3];
            $('#opp-card-1').append("<img src='img/cards/back.png' alt='Playing card'>");
            $('#opp-card-2').append("<img src='img/cards/back.png' alt='Playing card'>");
            //next five cards set
            card1 = deck[4];
            card2 = deck[5];
            card3 = deck[6];
            card4 = deck[7];
            card5 = deck[8];
            //Determine the best hand for both decks. Don't worry we won't let AI cheat and see this.
            playerhand = checkhand(card1,card2,card3,card4,card5,playercard1,playercard2);
            opphand = checkhand(card1,card2,card3,card4,card5,oppcard1,oppcard2);
            //set flags true for poker actions, time to play!
            callcheck = true;
            allin = true;
            fold = true;
            //if playerpoints is 0, then they are all in, check winner.
            if ( playerpoints == 0)
            {
                findwinner();
            }
            else
            {
                raise = true;
            }
        }
    });

    //Raise function to raise !!!(safe guards will make sure raise is even possible)!!!
    $('#raise').on('click', function(){
        //Must be in a game to raise...
        if ( raise == true )
        {
            //make sure opponent can raise if not, they are allin
            if (opppoints == 0)
            {
                findwinner();
            }
            //check response of opp
            response = oppcheck("raise");
            //if opp decides to fold
            if(response == "fold")
            {
                //Annoucne the hand win
                $('#poker-response p').text("The opponent has folded. You win this hand and gained "+ pool +" points! ");
                playerpoints += pool;
                $('#player-points').text(playerpoints);
                //set actions to false (hand over)
                raise = false;
                callcheck = false;
                allin = false;
                fold = false;
                //determine if player won the whole game
                if (opppoints == 0)
                {
                    $('#poker-response p').append("The opponent has no points left, you win!");
                    bet = false;
                }
                else
                {
                    bet = true;
                }
            }
            //if opp calls raise !!!(oppcheck will make sure opp can raise)!!!
            else if(response == "callcheck")
            {
                //raise player bet, subtract from player points and add to pot
                //in this version, playerbet and oppbet are at a static 25...
                playerpoints -= playerbet;
                opppoints -= oppbet;
                $('#player-points').text(playerpoints);
                $('#opp-points').text(opppoints);
                //Set and display the pot
                pool += (playerbet + oppbet);
                $('#pool').text(pool);

                //Respond according to stage of hand we're in
                if (stage == 0)
                {
                    //show response
                    $('#poker-response p').text("The opponent has called your raise. Here is the flop. You can now raise, check, or go all-in.");
                    $('#card-1').empty();
                    $('#card-1').append("<img src='" + findcardimg(card1) + "' alt='Playing card'>");
                    $('#card-2').empty();
                    $('#card-2').append("<img src='" + findcardimg(card2) + "' alt='Playing card'>");
                    $('#card-3').empty();
                    $('#card-3').append("<img src='" + findcardimg(card3) + "' alt='Playing card'>");
                    //if playerpoints is 0, must be all in, call find winner
                    if ( playerpoints == 0 )
                    {
                        findwinner();
                    }
                    //advange stage
                    stage = 1;
                }
                else if ( stage == 1)
                {
                    //show response
                    $('#poker-response p').text("The opponent has called your raise. Here is the turn. You can now raise, check, or go all-in.");
                    $('#card-4').empty();
                    $('#card-4').append("<img src='" + findcardimg(card4) + "' alt='Playing card'>");
                    //if playerpoints is 0, must be all in, call find winner
                    if ( playerpoints == 0 )
                    {
                        findwinner();
                    }
                    stage = 2;
                }
                else if (stage == 2)
                {
                    //show response
                    $('#poker-response p').text("The opponent has called your raise. Here is the river. You can now raise, check, or go all-in.");
                    $('#card-5').empty();
                    $('#card-5').append("<img src='" + findcardimg(card5) + "' alt='Playing card'>");
                    //if playerpoints is 0, must be all in, call find winner
                    if ( playerpoints == 0 )
                    {
                        findwinner();
                    }
                    stage = 3;
                }
                else if (stage == 3)
                {
                    //end hand, show oppoents hand
                    $('#opp-card-1').empty();
                    $('#opp-card-1').append("<img src='" + findcardimg(oppcard1) + "' alt='Playing card'>");
                    $('#opp-card-2').empty();
                    $('#opp-card-2').append("<img src='" + findcardimg(oppcard2) + "' alt='Playing card'>");
                    //determine hand winner
                    findwinner();

                }
            }
            // !!! opp will know if this is okay !!!
            else if (response == "raise")
            {
                $('#poker-response p').text("The opponent has re-raised your raise. Per the rules, you cannot re-raise again. You can now check, go all-in or fold.");
                raise = false;
            }
            else if( response == "allin")
            {
                $('#poker-response p').text("The opponent has gone all-in. You can now call or fold.");
                raise = false;
                allin = false;
            }
        }
    });

    $('#callcheck').on('click', function() {
        //If this is the players first check on his turn
        if ( callcheck == true && raise == true && allin == true )
        {
            //make sure opponent didn't lose all money to blind, if so they are allin
            if ( opppoints == 0)
            {
                findwinner();
            }
            response = oppcheck("callcheck");
            //if opp also checks
            if(response == "callcheck")
            {
                //depending on the stage, there is a different game action
                if (stage == 0)
                {
                    $('#poker-response p').text("The opponent has also checked. Here is the flop. You can now raise, check, or go all-in.");
                    $('#card-1').empty();
                    $('#card-1').append("<img src='" + findcardimg(card1) + "' alt='Playing card'>");
                    $('#card-2').empty();
                    $('#card-2').append("<img src='" + findcardimg(card2) + "' alt='Playing card'>");
                    $('#card-3').empty();
                    $('#card-3').append("<img src='" + findcardimg(card3) + "' alt='Playing card'>");
                    stage = 1;
                }
                else if ( stage == 1)
                {
                    $('#poker-response p').text("The opponent has also checked. Here is the turn. You can now raise, check, or go all-in.");
                    $('#card-4').empty();
                    $('#card-4').append("<img src='" + findcardimg(card4) + "' alt='Playing card'>");
                    stage = 2;
                }
                else if (stage == 2)
                {
                    $('#poker-response p').text("The opponent has also checked. Here is the river. You can now raise, check, or go all-in.");
                    $('#card-5').empty();
                    $('#card-5').append("<img src='" + findcardimg(card5) + "' alt='Playing card'>");
                    stage = 3;
                }
                else if (stage == 3)
                {
                    $('#opp-card-1').empty();
                    $('#opp-card-1').append("<img src='" + findcardimg(oppcard1) + "' alt='Playing card'>");
                    $('#opp-card-2').empty();
                    $('#opp-card-2').append("<img src='" + findcardimg(oppcard2) + "' alt='Playing card'>");
                    findwinner();
                }
            }
            else if(response == "raise")
            {
                $('#poker-response p').text("The opponent has raised your check. Per the rules, you cannot re-raise. You can now check, go all-in or fold.");
                raise = false;
            }
            else if(response =="allin")
            {
                $('#poker-response p').text("The opponent has gone all in, you can call or fold.");
                raise = false;
                allin = false;
            }
        }
        //Player checked on a raise by opponenet (only one re-raise allowed and that is by the oppenent)
        else if (callcheck == true && raise == false && allin == true)
        {
            //points/pot are updated here, not in oppcheck function
            //in this version, playerbet and oppbet are at a static 25...
            playerpoints -= playerbet;
            opppoints -= oppbet;
            $('#player-points').text(playerpoints);
            $('#opp-points').text(opppoints);
            //Set and display the pot
            pool += (playerbet + oppbet);
            $('#pool').text(pool);

            if (stage == 0)
            {
                $('#poker-response p').text("You have called the re-raise. Here is the flop. You can now raise, check, or go all-in.");
                $('#card-1').empty();
                $('#card-1').append("<img src='" + findcardimg(card1) + "' alt='Playing card'>");
                $('#card-2').empty();
                $('#card-2').append("<img src='" + findcardimg(card2) + "' alt='Playing card'>");
                $('#card-3').empty();
                $('#card-3').append("<img src='" + findcardimg(card3) + "' alt='Playing card'>");
                raise = true;
                stage = 1;
            }
            else if ( stage == 1)
            {
                $('#poker-response p').text("You have called the re-raise. Here is the turn. You can now raise, check, or go all-in.");
                $('#card-4').empty();
                $('#card-4').append("<img src='" + findcardimg(card4) + "' alt='Playing card'>");
                raise = true;
                stage = 2;
            }
            else if (stage == 2)
            {
                $('#poker-response p').text("You have called the re-raise. Here is the river. You can now raise, check, or go all-in.");
                $('#card-5').empty();
                $('#card-5').append("<img src='" + findcardimg(card5) + "' alt='Playing card'>");
                raise = true;
                stage = 3;
            }
            else if (stage == 3)
            {
                $('#opp-card-1').empty();
                $('#opp-card-1').append("<img src='" + findcardimg(oppcard1) + "' alt='Playing card'>");
                $('#opp-card-2').empty();
                $('#opp-card-2').append("<img src='" + findcardimg(oppcard2) + "' alt='Playing card'>");
                findwinner();
            }
        }
        //if opp goes all-in and player calls
        else if (callcheck == true && raise == false && allin == false )
        {
            //on an all in, find who has more points and update points/pool
            if ( playerpoints > opppoints)
            {
                pool += (2*opppoints);
                playerpoints -= opppoints;
                opppoints = 0;
            }
            //if opp has more points, this also works for tie in points
            else
            {
                pool += (2*playerpoints);
                opppoints -= playerpoints;
                playerpoints = 0;
            }
            findwinner();
        }

    });
    //Whenver player folds
    $('#fold').on('click', function(){
        if ( fold == true)
        {
            //Give pot to opponent
            $('#poker-response p').text("You have folded. The opponent has gained " + pool + " points. ");
            opppoints += pool;
            $('#opp-points').text(opppoints);
            raise = false;
            callcheck = false;
            allin = false;
            fold = false;
            bet = true;
        }
    });
    //When player calls all-in
    $('#all-in').on('click',function(){
        if ( allin == true )
        {
            //make sure opponent has points to go allin, otherwise they are already all in
            if (opppoints == 0)
            {
                findwinner();
            }
            response = oppcheck("allin");
            if(response == "fold")
            {
                //Annoucne the hand win
                $('#poker-response p').text("The opponent has folded. You win this hand and gained "+ pool +" points! ");
                playerpoints += pool;
                $('#player-points').text(playerpoints);
                //set actions to false (hand over)
                raise = false;
                callcheck = false;
                allin = false;
                fold = false;
                //determine if player won the whole game
                if (opppoints == 0)
                {
                    $('#poker-response p').append("The opponent has no points left, you win!");
                    bet = false;
                }
                else
                {
                    bet = true;
                }
            }
            //opponent calls all-in
            else if(response == "callcheck")
            {
                //on an all in, find who has more points and update points/pool
                if ( playerpoints > opppoints)
                {
                    pool += (2*opppoints);
                    playerpoints -= opppoints;
                    opppoints = 0;
                }
                //if opp has more points, this also works for tie in points
                else
                {
                    pool += (2*playerpoints);
                    opppoints -= playerpoints;
                    playerpoints = 0;
                }
                findwinner();
            }
        }
    });
});
