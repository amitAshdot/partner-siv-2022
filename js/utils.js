
document.addEventListener('DOMContentLoaded', (event) => {
    // -----START IS ON SCREEN-----
    // Helper function from: http://stackoverflow.com/a/7557433/274826
    const isElementInViewport = el => {
        const pixFromElementTop = 1;
        // special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        let rect = el.getBoundingClientRect();
        return (
            (rect.top + pixFromElementTop <= 0 && rect.bottom >= 0) ||
            (rect.bottom + pixFromElementTop >=
                (window.innerHeight || document.documentElement.clientHeight) &&
                rect.top + pixFromElementTop <=
                (window.innerHeight || document.documentElement.clientHeight)) ||
            (rect.top + pixFromElementTop >= 0 &&
                rect.bottom + pixFromElementTop <=
                (window.innerHeight || document.documentElement.clientHeight))
        );
    };
    // Detect request animation frame
    let scroll =
        window.requestAnimationFrame ||
        // IE Fallback
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    let elementsToShow = document.querySelectorAll(".show-on-scroll");

    const loop = () => {
        Array.prototype.forEach.call(elementsToShow, function (element) {
            if (isElementInViewport(element)) {
                element.classList.add("is-visible");
            } else {
                element.classList.remove("is-visible");
            }
        });
        scroll(loop);
    };

    // Call the loop for the first time
    loop();

    // -----END IS ON SCREEN-----


    const isMobile = (width, mobileWidth) => { return width <= mobileWidth }

    //----- FLOATING PHONE BUTTON AND ONANDOFF -----
    timerPlus("5fad386cfad89e001730c668");

    const d = new Date();
    const currentHour = d.getHours(); //note 0-23
    const cta = document.getElementsByClassName("callPhone-fixed");
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
        // if (scrollTop > 500 && $(window).width() < 1080) {
        if (scrollTop > 500) {
            $("#stripForm-container").fadeIn();
            clearTimeout($.data(this, "scrollTimer"));
        } else {
            clearTimeout($.data(this, "scrollTimer"));
            $("#stripForm-container").fadeOut();
        }
    });
    //------ SHOW CTA BUTTON ON MOBILE END -----

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
    let phoneNumberInput = document.getElementById("Phone_1");
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
        let flag = false, firstName = document.getElementById("firstName"), input_10 = document.getElementById("input_10")
        Phone_1 = document.getElementById("Phone_1"),
            email = document.getElementById("email"), message = document.getElementById("message");
        if (input_10.value === "") {
            input_10.classList.add("error");
            flag = true;
        }
        if (firstName.value.length < 2) {
            firstName.classList.add("error");
            flag = true;
        }
        if (validateEmail(email.value) === false) {
            email.classList.add("error");
            flag = true;
        }
        if (validatePhone(Phone_1.value) === false) {
            Phone_1.classList.add("error");
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
            var form = document.querySelector('#top');
            var data = serialize(form);
            e.preventDefault();
            // var data = $(this).serialize();
            // $.ajax({
            //     type: "GET",
            //     url: 'https://syatacrm.co.il/API9/mgrqispi94.dll?appname=Syata&prgname=Get_Leads_receiving_web&WD=Sderot&projectId=SD&key=googleisp1lead',
            //     data: data,
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
            return true

        } else {
            return false
        }
    }
    $('#top').submit(submitForm)
    // -----END EMAIL VALIDATION-----



    // ----- GET URL PARAMS -----
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Give the URL parameters variable names
    // var source = getParameterByName('utm_source');
    // var medium = getParameterByName('utm_medium');
    var campaign = getParameterByName('utm_campaign');
    var term = getParameterByName('utm_term');
    var campaignID = getParameterByName('campaignID');

    // Put the variable names into the hidden fields in the form.
    // document.getElementsByName("utm_source").value = source;
    // document.getElementsByName("utm_medium").value = medium;
    document.getElementById("utm_campaign").value = campaign;
    document.getElementById("utm_term").value = term;
    document.getElementById("campaignID").value = campaignID;
    // ----- GET URL PARAMS END -----


    // // ----- _ouibounce -----
    // var _ouibounce = ouibounce(document.getElementById('ouibounce-modal'), {
    //     aggressive: true, //Making this true makes ouibounce not to obey "once per visitor" rule
    // });
    //     // ----- _ouibounce END -----



    /*!
    * Serialize all form data into a query string
    * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
    * @param  {Node}   form The form to serialize
    * @return {String}      The serialized form data
    */
    var serialize = function (form) {
        // Setup our serialized data
        var serialized = [];
        // Loop through each field in the form
        for (var i = 0; i < form.elements.length; i++) {
            var field = form.elements[i];
            // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
            if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
            // If a multi-select, get all selections
            if (field.type === 'select-multiple') {
                for (var n = 0; n < field.options.length; n++) {
                    if (!field.options[n].selected) continue;
                    serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
                }
            }
            // Convert field data to a query string
            else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
            }
        }
        return serialized.join('&');
    }
});

