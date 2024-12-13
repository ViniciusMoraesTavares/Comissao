const hamburguer = document.getElementById('hamburger');

hamburguer.addEventListener('click', function () {
    const aside = document.querySelector('aside');
    const main = document.getElementById('main');
    aside.classList.toggle('active');
    main.classList.toggle('ative');
});

