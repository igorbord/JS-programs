'use strict'
window.onload = () => {
    // Header

    const header = document.querySelector('.header')
    const titleScroll = document.querySelector('#titleScroll')
    const sectionTitle = document.querySelector('section[class="title"]')

    // header fixed
    addEventListener('scroll', function (event) {
        if (window.pageYOffset > sectionTitle.scrollHeight - 51) {
            header.classList.add('header__fixed')
        } else {
            header.classList.remove('header__fixed')
        }
    })


    // scroll for navigation menu
    header.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            event.preventDefault()

            const sectionScroll = document.querySelector(`section[class$="${event.target.hash.slice(1)}"]`)

            scrollWebsite(sectionScroll.offsetTop, 300)
        }
    })

    titleScroll.addEventListener('click', function () {
        scrollWebsite(sectionTitle.scrollHeight, 200)
    })



    function scrollWebsite(y, time) {
        let height = window.pageYOffset
        let stepHeight = Math.round(Math.abs(y - height) / (time / 10))

        if (height < y) {
            let scrollAnimation = setInterval(() => {
                if (height >= y - 50) {
                    window.scrollTo(0, y - 50)
                    clearInterval(scrollAnimation)
                } else {
                    window.scrollTo(0, height)
                    height += stepHeight
                }
            }, 10);
        } else if (height > y) {
            let scrollAnimation = setInterval(() => {
                if (height <= y - 50) {
                    window.scrollTo(0, y - 50)
                    clearInterval(scrollAnimation)
                } else {
                    window.scrollTo(0, height)
                    height -= stepHeight
                }
            }, 10);
        }
    }




    // поле формы book__date
    const bookDate = document.querySelector('#bookDate')
    const bookDateInput = document.querySelector('#bookDateInput')
    bookDate.onchange = function () {
        bookDateInput.textContent = `${this.value.slice(5, 7)}/${this.value.slice(8, 10)}`
        bookDateInput.style.color = '#000'
    }

    // поле формы book__time
    const bookTime = document.querySelector('#bookTime')
    const bookTimeInput = document.querySelector('#bookTimeInput')
    bookTime.oninput = function () {
        bookTimeInput.textContent = `${this.value.slice(0, 2)}:${this.value.slice(3, 5)}`
        bookTimeInput.style.color = '#000'
    }

    // Slider
    const galerieSlider = document.querySelector('.galerie__slider')
    const galerieSlides = document.querySelectorAll('.galerie__slide')
    const sliderControl = document.querySelector('#sliderControl')

    setSliderHeight()
    addEventListener('resize', setSliderHeight)

    function setSliderHeight() {
        let max = 0
        for (let slide of galerieSlides) {
            if (max < slide.scrollHeight) {
                max = slide.scrollHeight
            }
        }
        galerieSlider.style.height = max + 'px'
    }

    sliderControl.innerHTML = '<div class="activeSlide" data-slide="0"></div>'
    for (let i = 1; i < galerieSlides.length; i++) {
        galerieSlides[i].hidden = true
        sliderControl.innerHTML += `<div data-slide=${i}></div>`
    }

    let oldSlide = 0

    sliderControl.onclick = function (event) {
        if (event.target.dataset.slide !== undefined)
            if (event.target.className !== 'activeSlide') {

                galerieSlides[oldSlide].querySelector('.galerie__img__rectangle').classList.add('slide__old__left')
                galerieSlides[oldSlide].querySelector('.galerie__text').classList.add('slide__old__right')

                clearOldSlide(oldSlide)

                sliderControl.children[oldSlide].classList.remove('activeSlide')

                const newSlideNumber = +event.target.dataset.slide
                showNewSlide(newSlideNumber)

                sliderControl.children[newSlideNumber].classList.add('activeSlide')

                oldSlide = newSlideNumber
            }
    }
    function showNewSlide(newSlide) {

        setTimeout(function () {
            galerieSlides[newSlide].hidden = false
            galerieSlides[newSlide].classList.add('slider__new__slide')
        }, 500)
    }

    function clearOldSlide(oldSlide) {
        galerieSlides[oldSlide].querySelector('.galerie__img__rectangle').addEventListener('animationend', function () {
            galerieSlides[oldSlide].hidden = true
            galerieSlides[oldSlide].querySelector('.galerie__img__rectangle').classList.remove('slide__old__left')
            galerieSlides[oldSlide].querySelector('.galerie__text').classList.remove('slide__old__right')
        })
    }

    // Menu book
    const menuPagesControl = document.querySelector('.menu__pages-control')
    const menuBook = document.querySelector('.menu__book')


    for (let resetPage of menuBook.children) {
        resetPage.hidden = true
    }
    let oldPage = menuBook.children[0]
    oldPage.hidden = false

    menuBook.style.height = menuBook.children[0].scrollHeight + 'px'

    let flagActivateBtn = true

    menuPagesControl.addEventListener('click', function (event) {
        event.preventDefault()

        if (event.target.dataset.page !== oldPage.dataset.page && flagActivateBtn) {
            for (let pages of menuBook.children) {
                if (pages.dataset.page === event.target.dataset.page) {
                    flagActivateBtn = false

                    pages.classList.remove('menu__page__new')

                    oldPage.classList.add('menu__page__old')


                    oldPage.addEventListener('animationend', clearOldPage(oldPage))

                    oldPage = pages
                    showNewPage(pages)
                    break
                }
            }
        }
    })

    function clearOldPage(oldPage) {
        return function clearOldPageAnimationListener() {
            oldPage.classList.remove('menu__page__old')
            oldPage.hidden = true
            oldPage.removeEventListener('animationend', clearOldPageAnimationListener)
        }
    }

    function showNewPage(page) {
        setTimeout(function () {
            page.classList.add('menu__page__new')
            page.addEventListener('animationend', function () {
                page.classList.remove('menu__page__new')
            })
            page.hidden = false

            resizeBookHeight()

        }, 100)
    }

    function resizeBookHeight() {
        let page = oldPage
        let setHeightMenu = setInterval(() => {
            if (menuBook.clientHeight < page.scrollHeight && menuBook.clientHeight + 6 < page.scrollHeight) {
                menuBook.style.height = menuBook.clientHeight + 10 + 'px'
            } else if (menuBook.clientHeight > page.scrollHeight && menuBook.clientHeight - 6 > page.scrollHeight) {
                menuBook.style.height = menuBook.clientHeight - 10 + 'px'
            } else {
                clearInterval(setHeightMenu)
                flagActivateBtn = true
            }
        }, 20);

    }

    addEventListener('resize', resizeBookHeight)

    // Burger menu

    function getWidthScroll() {
        const div = document.createElement('div')
        div.style.overflowY = 'scroll'
        div.style.width = '50px'
        div.style.height = '50px'
        document.body.append(div)
        const scrollWidth = div.offsetWidth - div.clientWidth
        div.remove()
        return scrollWidth
    }

    const burgerMenuBtn = document.querySelector('.header__burger-menu-btn')
    burgerMenuBtn.addEventListener('click', function () {
        const menuNav = document.querySelector('.header__nav__container')
        burgerMenuBtn.classList.toggle('active-burger-menu')
        menuNav.classList.add('menu__burger-deactive')

        if (burgerMenuBtn.classList.contains('active-burger-menu')) {
            document.body.style.overflow = 'hidden'
            if (header.classList.contains('header__fixed')) {
                burgerMenuBtn.style.right = parseInt(getComputedStyle(burgerMenuBtn).right) + getWidthScroll() + 'px'
            }
            document.body.style.paddingRight = getWidthScroll() + 'px'
            menuNav.classList.add('menu__burger-active')
        } else {
            menuNav.classList.remove('menu__burger-active')
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = 0
            if (header.classList.contains('header__fixed')) {
                burgerMenuBtn.style.right = parseInt(getComputedStyle(burgerMenuBtn).right) - getWidthScroll() + 'px'
            }
        }
        let i = 1
        header.addEventListener('click', clickMenu)
        function clickMenu(event) {
            if (event.target.tagName === 'A') {
                menuNav.classList.remove('menu__burger-active')
                burgerMenuBtn.classList.remove('active-burger-menu')
                document.body.style.overflow = 'auto'
                document.body.style.paddingRight = 0
                if (header.classList.contains('header__fixed')) {
                    burgerMenuBtn.style.right = parseInt(getComputedStyle(burgerMenuBtn).right) - getWidthScroll() + 'px'
                }
                header.removeEventListener('click', clickMenu)
            }
        }
    })

    // bookTableTitle
    const bookTableTitleBtn = document.querySelector('#bookTable')
    const bookTableTitleCloseBtn = document.querySelector('#bookTableTitleCloseBtn')
    bookTableTitleBtn.addEventListener('click', function () {
        const bookTableTitle = document.querySelector('.bookTableTitle')
        bookTableTitle.hidden = false

        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = getWidthScroll() + 'px'
    })
    bookTableTitleCloseBtn.addEventListener('click', function () {
        const bookTableTitle = document.querySelector('.bookTableTitle')
        const bookTableTitleContainer = document.querySelector('.bookTableTitle__container')

        bookTableTitleContainer.classList.add('bookTableTitle-closed')

        bookTableTitleContainer.addEventListener('animationend', closeBookTableTitle)
        function closeBookTableTitle() {
            bookTableTitle.hidden = true
            bookTableTitleContainer.classList.remove('bookTableTitle-closed')
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = 0
            
        bookTableTitleContainer.removeEventListener('animationend', closeBookTableTitle)
        }

    })
}

