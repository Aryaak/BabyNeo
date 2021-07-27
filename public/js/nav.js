const navButton = document.getElementById('nav-button');
const navSm = document.getElementById('nav-sm');
const navs = Array.from(document.getElementsByClassName('nav-link') );
const smnavs = Array.from(document.getElementsByClassName('nav-sm-link') );
const shape = document.getElementsByClassName('shape')[0];

// Navigation in medium/small device
navButton.addEventListener('click', function(){
    navSm.style.display = "block";
})

navSm.addEventListener('click', function(){
    navSm.style.display = "none";

})

function goToByScroll(id) {
    $('html,body').animate({ scrollTop: $("#" + id).offset().top }, 'fast');
    navs.forEach((elm) => {
    })
    sessionStorage.setItem('id', id);
}

function goToPage(page, id){
    sessionStorage.setItem('id', id);
    window.location.href = './' + page + '.html'
}

function scrollPage(){
    setTimeout(function(){
        id = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : 'countdwon';
        goToByScroll(id);
    
    }, 0)
}

scrollPage();

window.onscroll = function () { scrollFunction() };

var navbar = document.getElementsByTagName("nav")[0];
var scrollButton = document.getElementById('scroll-btn');

// Get the navbar

// Get the offset position of the navbar
var sticky = navbar.offsetTop;


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        navbar.classList.add('sticky');
        scrollButton.style.display = 'block'
        shape.style.display = 'block'
    } else {
        navbar.classList.remove('sticky');
        scrollButton.style.display = 'none'
        shape.style.display = 'none'
    }
}

function topFunction() {
    $('html,body').animate({ scrollTop: 0 }, 'fast');
}

$(document).scroll(function () {
    $('.section').each(function () {
        if ($(this).position().top - 100 <= $(document).scrollTop() && ($(this).position().top + $(this).outerHeight()) > $(document).scrollTop()) {
                let activeNav = document.getElementsByClassName($(this).attr('id') + '-link')[0];
                let activeSmNav = document.getElementsByClassName($(this).attr('id') + '-sm-link')[0];
                navs.forEach(function (nav) {
                    nav.classList.remove('active');
                })
                smnavs.forEach(function (nav) {
                    nav.classList.remove('active');
                })

                activeNav.classList.add('active');
                activeSmNav.classList.add('active');

        }
    });
});