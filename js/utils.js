
document.addEventListener('DOMContentLoaded', (event) => {
    const isMobile = (width, mobileWidth) => { return width <= mobileWidth }

    //----- FLOATING PHONE BUTTON AND ONANDOFF -----
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
    //----- FLOATING PHONE BUTTON AND ONANDOFF END -----



    //------ SHOW CTA BUTTON ON MOBILE ------
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
    //------ SHOW CTA BUTTON ON MOBILE END -----

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


    // -----START isCustomerExist-----
    $('.divhidden').hide();
    $('#input_10').change(function () {
        if ($(this).val() == 'current') {
            $('.divhidden').show();
        } else {
            $('.divhidden').hide();
        }
    });
    // -----END isCustomerExist-----

    // -----START EMAIL VALIDATION-----
    const isNumberKey = (evt) => {
        let charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
    let phoneNumberInput = document.getElementById("mobilephone");
    phoneNumberInput.onkeypress = isNumberKey

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePhone = (phone) => {
        // const re = /^[0-9]{10}$/;
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

        return re.test(String(phone));
    }

    const validateForm = () => {
        let flag = false, lastName = document.getElementById("lastname"), input_10 = document.getElementById("input_10")
        phone = document.getElementById("mobilephone"),
            email = document.getElementById("email"), message = document.getElementById("message");
        debugger
        if (input_10.value === "") {
            input_10.classList.add("error");
            flag = true;
        }
        if (lastName.value.length < 2) {
            lastName.classList.add("error");
            flag = true;
        }
        if (validateEmail(email.value) === false) {
            email.classList.add("error");
            flag = true;
        }
        if (validatePhone(phone.value) === false) {
            phone.classList.add("error");
            flag = true;
        }
        if (flag) {
            message.innerHTML = "אנא מלא/י את כל השדות";
            message.classList.add("error");
        }
        return flag ? false : true;
    }
    const submitForm = (e) => {
        e.preventDefault();
        if (validateForm()) {
            var data = $(this).serialize();
            if (validateForm()) {

                // $("#myForm").submit(function (e) {
                e.preventDefault();
                // var data = $(this).serialize();
                debugger
                console.log(data)
                // $.ajax({
                //     type: "GET",
                //     url:
                //         "https://syatacrm.co.il/API9/mgrqispi94.dll?appname=Syata&prgname=Get_Leads_receiving_web&WD=Sderot&projectId=SD&key=googleTV2lead",
                //     data: data
                // });
                // });

                $.ajax({
                    type: "POST",
                    url: './mail.php',
                    data: data,
                    success: function (mail) {
                        alert('הפרטים נשלחו בהצלחה');
                        // window.location.href = 'thankyou.html';
                    }
                });
            }

            return true
        } else {
            return false
        }
    }

    document.getElementById("top").addEventListener("submit", submitForm);
    // -----END EMAIL VALIDATION-----
});

// tabbed