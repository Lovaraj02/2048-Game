window.addEventListener('scroll', function() {
    var scrollLine = document.querySelector('.scroll-line');
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPosition = window.scrollY;

    var scrollPercentage = (scrollPosition / scrollHeight) * 100;
    scrollLine.style.width = scrollPercentage + '%';
});
