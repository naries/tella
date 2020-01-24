jsonData = {
    0: {
        name: 'Alexis Sanchez',
        text: 'This is the followup text',
        src: 'img/firebase.png'
    },
    1: {
        name: 'Uj Love',
        text: 'I don\t know what you\'re up to but imma kill you.',
        src: 'img/lag8.jpg'
    },
    2: {
        name: 'Sarah Kingsley',
        text: 'all I need is you.',
        src: 'img/HOME3.png'
    },
    3: {
        name: 'Clarence Shot',
        text: 'Stray dogs are hard to chain',
        src: 'img/home4.png'
    },
    4: {
        name: 'Clarence Shot',
        text: 'Stray dogs are hard to chain',
        src: 'img/lag11.jpg'
    },
    5: {
        name: 'Clarence Shot',
        text: 'Stray dogs are hard to chain',
        src: 'img/lag6.jpg'
    }
}

$.fn.generate = function (key) {
    scr = $('<div />').addClass('scrollable-card added');

    if (key == 1) {
        scr.html('today');
    }
    else if (key === 2) {
        scr.html('yesterday');
    }
    else if (key === 3) {
        scr.html('viewed');
    }
    $(this).append(scr);
    return this;
}
$('.title').on('click', function () {
    $('.scrollable-card').hide();
    $('.title').hide();
    if ($(this).hasClass('today')) {
        exact = 1;
    } else if ($(this).hasClass('yesterday')) {
        exact = 2;
    } else if ($(this).hasClass('viewed')) {
        exact = 3;
    }
    var hidden = true;
    var heading = $(this).text();
    toAppend = $('<div />')
        .addClass('title')
        .text(heading).on('click', function () {
            $(this).remove();
            $('.title').show();
            $('.scrollable-card').show();
            $('.scrollable-card.added').remove();
        });

    $('.right-box')
        .append(toAppend)
        .generate(exact);
});

player = (function() {
    var defaultTimeout = 1000;
    main = $('.left-box');
    position = 0;
    size = Object.keys(jsonData).length;
    var displayData = function (pos) {
        //start
        if (pos == 'next') {
            position ++;
        }
        currentData = jsonData[position];
        $('.left-box *').hide();
        $('.left-box').append(
            $('<img />').attr({
                'src': jsonData[position].src,
                'class': 'showing'
            })
        );
        showTimer();
        //start the timer.
        //stop
    }

    var showTimer = function() {
        rate = 0.05;
        main.append(
            $('<div />')
            .addClass('timer-box')
            .append(
                $('<div />')
                .addClass('main-meter')
            )
        );
        count = 0;
        var timerInt = setInterval(function () {
            var held = false;
            rate = rate + 0.05;
            $('.main-meter').css('width', rate +'em');
            $('.left-box').on('mousedown mouseup', function (event) {
                if(event.type === 'mousedown') {
                    held = true;
                    clearInterval(timerInt);
                } else {
                    held = false;                
                }
            });
            if (rate > 50) { 
                clearInterval(timerInt);
                //pick next media file;
                if(position != size - 1) {
                    //show that the update has been viewed.
                    
                    //
                    $('.showing').addClass('shown').removeClass('showing');
                    $('.shown').remove();
                    displayData('next');
                    
                } else {
                    $('.showing').addClass('shown').removeClass('showing');
                    $('.shown').remove();
                    $('.left-box *').show();
                    $('.timer-box').remove();
                    $('.catch')
                    .html('You\'re all caught up')
                    .unbind('click');
                }
            }
        }, 10);
    };

    var halt = function () {
        //stop the transition.
        //save elasped time
        //save data position
    }

    var restart = function () {
        //call the saved time
    }

    return {
        display: displayData
    }
})(jQuery);

$('div.catch').on('click', function() {
    player.display();
});
