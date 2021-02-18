function RunLazyLoad() {
    new LazyLoad({
        elements_selector: ".lazy"
    });
}


let backButton = document.getElementById("back-to-top");
window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
        backButton.classList.add("active");
    }
    else {
        backButton.classList.remove("active");
    }
});

backButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

let sidenav = document.querySelector(".side-nav-container");
function hideMenu(sidenav) {
    sidenav.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
    RunLazyLoad();
    function getNextSiblings(elem) {
        var sibs = [];
        while (elem = elem.nextSibling) {
            if (elem.nodeType === 3) continue; // text node
            sibs.push(elem);
        }
        return sibs;
    }
    function getPreviousSiblings(elem) {
        var sibs = [];
        while (elem = elem.previousSibling) {
            if (elem.nodeType === 3) continue; // text node
            sibs.push(elem);
        }
        return sibs;
    }

    var menuPlusIcon = document.querySelectorAll(".menu-plus-icon");
    for (var i = 0; i < menuPlusIcon.length; i++) {
        menuPlusIcon[i].addEventListener("click", function () {
            var prevsideNavItemsSiblings = getPreviousSiblings(this.parentElement);
            var nextsideNavItemsSiblings = getNextSiblings(this.parentElement);
            for (let j = 0; j < prevsideNavItemsSiblings.length; j++) {
                prevsideNavItemsSiblings[j].classList.remove("active");
            }
            for (let k = 0; k < nextsideNavItemsSiblings.length; k++) {
                nextsideNavItemsSiblings[k].classList.remove("active");
            }

            this.parentElement.classList.toggle("active");
        });
    }

    let openDataActions = document.querySelectorAll('[data-action="open"]');

    for (let i = 0; i < openDataActions.length; i++) {
        openDataActions[i].addEventListener("click", function (e) {
            e.preventDefault();
            var prevsideNavItemsSiblings = getPreviousSiblings(this.parentElement);
            var nextsideNavItemsSiblings = getNextSiblings(this.parentElement);
            for (let j = 0; j < prevsideNavItemsSiblings.length; j++) {
                prevsideNavItemsSiblings[j].classList.remove("active");
            }
            for (let k = 0; k < nextsideNavItemsSiblings.length; k++) {
                nextsideNavItemsSiblings[k].classList.remove("active");
            }

            this.parentElement.classList.toggle("active");
        })
    }


    var sideMenuOpenButton = document.querySelector(".side-menu-open");
    sideMenuOpenButton.addEventListener("click", function (e) {
        e.stopPropagation();
        sidenav.classList.add("active");
    });


    var sideMenuCloseButton = document.querySelector(".side-menu-close");
    sideMenuCloseButton.addEventListener("click", function () {
        hideMenu(sidenav);
    });
});