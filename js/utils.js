
document.addEventListener('DOMContentLoaded', (event) => {
    const isMobile = (width, mobileWidth) => { return width <= mobileWidth }

    // FLOATING PHONE BUTTON AND ONANDOFF
    timerPlus("5e2713a553994f0017c86f01");

    const d = new Date();
    const currentHour = d.getHours(); //note 0-23
    const cta = document.getElementsByClassName("callPhone");
    const width = document.body.scrollWidth;
    const mobileWidth = 900; //max mobile width
    const sunday = 0;
    const friday = 5;
    const openH = 9;
    const closeH = 18;

    const holidayH = 13;
    const isHoliday = false;

    const closeOnFriday = 13;

    function isOpen() {
        return (currentHour >= openH && currentHour < closeH && isMobile(width, mobileWidth) && d.getDay() >= sunday && d.getDay() < friday)
    }

    switch (d.getDay()) {
        case 6:
            cta[0].style.display = 'none';
            break;
        case 5:
            if ((openH < currentHour && currentHour < closeOnFriday) && isMobile(width, mobileWidth)) {
                cta[0].style.display = 'block'
            } else {
                cta[0].style.display = 'none'
            }
            break;
        // case 1: //Yom Hazikaron
        //     cta[0].style.display = 'none';
        //     break;
        default:
            if (isOpen()) {
                cta[0].style.display = 'block'
            } else {
                cta[0].style.display = 'none'
            }
            if (isHoliday && currentHour >= holidayH) {
                cta[0].style.display = 'none'
            }
            break;
    }
    // FLOATING PHONE BUTTON AND ONANDOFF END



    // SHOW CTA BUTTON ON MOBILE
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 500 && $(window).width() < 1080) {
            $("#stripForm-container").fadeIn("slow");
            clearTimeout($.data(this, "scrollTimer"));
        } else {
            clearTimeout($.data(this, "scrollTimer"));
            $("#stripForm-container").fadeOut("slow");
        }
    });
    // SHOW CTA BUTTON ON MOBILE END

    window.smoothScroll = function (target) {
        var scrollContainer = target;
        do { //find scroll container
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) return;
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop == 0);

        var targetY = 0;
        do { //find the top of target relatively to the container
            if (target == scrollContainer) break;
            targetY += target.offsetTop;
        } while (target = target.offsetParent);

        scroll = function (c, a, b, i) {
            i++; if (i > 30) return;
            c.scrollTop = a + (b - a) / 30 * i;
            setTimeout(function () { scroll(c, a, b, i); }, 20);
        }
        // start scrolling
        scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    }
});

// tabbed