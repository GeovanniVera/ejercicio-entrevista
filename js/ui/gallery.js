export function inicializarGaleria() {
    const names = [
        './img/banner.png',
        './img/banner2.png',
        './img/banner3.png',
    ];

    let index = 0;

    const imagenActual = document.getElementById('galery-img');
    imagenActual.src = names[index];

    const cambiarImagen = (nuevoIndex) => {
        imagenActual.classList.add('slide-right');

        setTimeout(() => {
            index = nuevoIndex;
            imagenActual.src = names[index];
        }, 300);


        imagenActual.addEventListener('animationend', () => {
            imagenActual.classList.remove('slide-right');
        },{once : true})

    }

    setInterval(() => {
        const nuevoIndex = (index + 1) % names.length;
        cambiarImagen(nuevoIndex);
    },3000);

}
