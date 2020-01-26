jsonData = {
    0: {
        name: 'Alexis Sanchez',
        text: 'This is the followup text',
        src: 'img/firebase.png',
        photo: 'img/Gambo.jpg'
    },
    1: {
        name: 'Uj Love',
        text: 'I don\t know what you\'re up to but imma kill you.',
        src: 'img/lag8.jpg',
        photo: 'img/Gambo.jpg'
    },
    2: {
        name: 'Sarah Kingsley',
        text: 'all I need is you.',
        src: 'img/HOME3.png',
        photo: 'Gambo.jpg'
    },
    3: {
        name: 'Clarence Shot',
        text: 'Stray dogs are hard to chain',
        src: 'img/home4.png',
        photo: 'img/Gambo.jpg'
    },
    4: {
        name: 'Clarence Shot',
        text: 'Stray dogs are hard to chain',
        src: 'img/lag11.jpg',
        photo: 'img/Gambo.jpg'
    },
    5: {
        name: 'Clarence Shot',
        text: 'Stray dogs are hard to chain',
        src: 'img/lag6.jpg',
        photo: 'img/Gambo.jpg'
    }
}

todayJsonData = {
    0: {
        name: 'Alexis Sanchez',
        text: 'This is the followup text',
        src: '',
        photo: 'img/Gambo.jpg'
    },
    1: {
        name: 'Uj Love',
        text: 'I don\t know what you\'re up to but imma kill you.',
        src: 'img/lag8.jpg',
        photo: 'img/Dami.jpg'
    },
    2: {
        name: 'Sarah Kingsley',
        text: 'all I need is you.',
        src: 'img/HOME3.png',
        photo: 'img/tosin.jpg'
    },
    3: {
        name: 'Clarence Shot',
        text: 'Stray dogs are hard to chain',
        src: 'img/home4.png',
        photo: ''
    },
    4: {
        name: 'Clarence Shot',
        text: 'Stray dogs are hard to chain',
        src: 'img/lag11.jpg',
        photo: 'img/1.jpg'
    },
    5: {
        name: 'Clarence Shot',
        text: 'Stray dogs are hard to chain',
        src: 'img/lag6.jpg',
        photo: 'img/4.jpg'
    }
}



reformatJsonData = function (thisJsonData) {
    $.each(thisJsonData, function (k, v) {
        if (v.photo == '') {
            thisJsonData[k].photo = 'img/untitled.png'
        }
        if (v.src == '') {
            thisJsonData[k].src = 'img/untitled.png'
        }
    });
    return thisJsonData;
}

jsonData = reformatJsonData(jsonData);
todayJsonData = reformatJsonData(todayJsonData);

currentJsonData = jsonData;
var fromToday = function () {
    $('.today-scr *').remove();
    $.each(todayJsonData, function (k, v) {

        $('.today-scr').append(
            $('<div />').attr({
                'id': "card-tod" + k,
                'class': "card",
                'position': k
            }).on('click', function () {
                currentJsonData = todayJsonData;
                position = k;
                player.display();
            }).append(
                $('<div />')
                    .addClass("pic-hole")
                    .append(
                        $('<div />')
                            .addClass("holder")
                            .append(
                                $('<img />').attr('src', v.src)
                            ).append(
                                $('<div />')
                                    .addClass("time")
                                    .html('2h')
                            )
                    ).append(
                        $('<div />')
                            .addClass("small-circle")
                            .append(
                                $('<img />')
                                    .attr('src', v.photo)
                            )
                    )
            ).append(
                $('<div />')
                    .addClass("name")
                    .html(v.name)
            )
        )
    })
}

fromToday();


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
position = 0;
player = (function () {
    var defaultTimeout = 1000;
    main = $('.left-box');
    size = Object.keys(currentJsonData).length;

    $.fn.widthAnimatorEngine = function(){
        x= 0,
        time = 900,
        y= time;
        curr = $(this);
        animatorEngine = setInterval(function() {
            x = x <= 50 ? x+0.25 : clearInterval(animatorEngine);
            curr.css('width', x+'em');
            x=x+0.5;
        }, 10);

        animatorOutEngine = setInterval(function() {
            if(y <= time && y > 0){
                y--;
            } else if(y <= 0){
                clearInterval(animatorOutEngine);
            }
            console.log(y);
            if(y < 10){
                curr.css('width', y + 'em');
            }
        }, 10);
        return this;
    }

    var displayData = function (pos) {
        //start
        $('.auth-info').remove();
        $('.showNext, .showPrev').remove();
        if (pos == 'next') {
            position++;
        }
        if (pos == 'prev') {
            position--;
        }
        currentData = currentJsonData[position];
        text = currentJsonData[position].text;
        name = currentJsonData[position].name;
        photo = currentJsonData[position].photo;
        $('.left-box *').hide();
        $('.left-box').append(
            $('<img />').attr({
                'src': currentJsonData[position].src,
                'class': 'showing'
            })
        ).append(
            $('<div />').addClass('showNext').on('click', function () {
                if (position == size - 1) {
                    readjust();
                } else {
                    displayData('next');
                }
            }),
            $('<div />').addClass('showPrev').on('click', function () {
                if (position == 0) {
                    readjust('neutral');
                } else {
                    displayData('prev')
                }
            })
        ).append(
            $('<div />').addClass('auth-info').append(
                $('<div />').addClass('small-circle').append(
                    $('<img />').attr('src', photo)
                ),
                $('<div />').addClass('name-text').append(
                    $('<div />').append(name),
                    $('<div />').append(text)
                )
            ).widthAnimatorEngine()
        );
        showTimer();
        //start the timer.
        //stop
    }

    var showTimer = function () {
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
            $('.main-meter').css('width', rate + 'em');
            $('.left-box').on('mousedown mouseup', function (event) {
                if (event.type === 'mousedown') {
                    held = true;
                    clearInterval(timerInt);
                }
            });
            if (rate > 50) {
                clearInterval(timerInt);
                //pick next media file;
                if (position != size - 1) {
                    //show that the update has been viewed.

                    //
                    $('.showing').addClass('shown').removeClass('showing');
                    $('.shown').remove();
                    displayData('next');

                } else {
                    readjust();
                }
            }
        }, 10);
    };
    var readjust = function (hashValue = 'done') {
        $('.showing').addClass('shown').removeClass('showing');
        $('.shown').remove();
        $('.left-box *').show();
        $('.timer-box').remove();
        $('.showNext, .showPrev').remove();
        $('.auth-info').remove();
        if (hashValue == 'done') {
            $('.catch')
                .html('You\'re all caught up. Come back later for more.')
                .unbind('click');
        }

    }
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

$('div.catch').on('click', function () {
    player.display();
});
