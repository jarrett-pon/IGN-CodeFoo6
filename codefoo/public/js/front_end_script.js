
//starts functions when document is loaded
$(document).ready(function(){
    
    var startIndex = 0;
    var count = 10;
    var url = 'http://ign-apis.herokuapp.com/articles?startIndex=' + startIndex + 'count=' + count;
    $.getJSON(url, function(data){
        startIndex = data.startIndex;
        count = data.count;
        for (var i = 0; i < count; i++)
        {
            var thumbnail = data.data[i].thumbnail;
            var headline = data.data[i].headline;
            var slug = data.data[i].slug;
            var publishDate = data.data[i].publishDate;
            var subHeadline = data.data[i].subHeadline;
            if (subHeadline == "")
            {
                subHeadline = headline;
            }
            $('.headline').html(thumbnail + headline + slug + publishDate + subHeadline);
            
        }

});

/*
$(document).ready(function(){
    $('.articles').click(function(event){
        var url = 'http://ign-apis.herokuapp.com/articles?' + $('#symbol').val();
        $.getJSON(url, function(data){
        $('#price').html(data.price);
        });
        event.preventDefault();
    });
});
*/