var popped = 0;
var c1, c2;
var counter = 0;

/**
 * Check flipped cards
 */
var checkFlipped = function(f_card) {
    //if zero cards are flipped
    if(popped == 0) {
        c1 = f_card;
        popped ++;
    }
    else
        if(popped == 1) {
            c2 = f_card;
            popped ++;
    }

    // if 2 cards are flipped
        if(popped == 2) {
            setTimeout(function(){
                if(c1.attr("type") == c2.attr("type")) {
                    c1.css( "opacity", "0.6");
                    c1.unbind('click');
                    c2.css("opacity", "0.6");
                    c2.unbind('click');
                    popped = 0;
                    counter -= 2;

                    // check if all are flipped
                    if(counter == 0) {
                        // show success alert
                        $('.success').show();
                        //disable cards click
                        $('.cards').off("click");
                        $('.cards').css("opacity", "0.4");
                        //body overflow hidden
                        $('body').css('overflow', 'hidden');
                    }
                }

                //flip cards back
                else {
                    c1.css( "opacity", "0");
                    c2.css("opacity", "0");
                    popped = 0;
                }
            }, 2000);
    }
};


/**
 * On Card Flip
 */
var flip = function() {
    if($(this).css( "opacity" ) == 0) {

        $(this).css( "opacity", "1");
        //$(this).animate({
        //    opacity: "1"
        //},500);

    }

    checkFlipped($(this));
};

$( document ).ready(function() {
    var cards = $('.card');
    counter = cards.length;
    $.each( cards, function( index, value ){
        $(this).click(flip);
    });
});


