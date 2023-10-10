const slideshowContainer = document.getElementById('slideshow-container');

async function loadImagesFromDirectory() {
    const directoryPath = 'assets/img/gallery/';
    
    try {
        const response = await fetch(directoryPath);
        const data = await response.text();
        const fileNames = data.match(/href="([^"]+\.(jpg|jpeg|png|gif))"/g).map(match => match.match(/"([^"]+\.(jpg|jpeg|png|gif))"/)[1]);

        fileNames.forEach(fileName => {
            const image = new Image();
            image.src = directoryPath + fileName;
            image.alt = fileName;
            slideshowContainer.appendChild(image);
        });

        let currentImageIndex = 0;

        function showImage(index) {
            const images = slideshowContainer.querySelectorAll('img');
            images.forEach((image, i) => {
                if (i === index) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            });
        }

        showImage(currentImageIndex);

        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % fileNames.length;
            showImage(currentImageIndex);
        }, 3000); // Altere o intervalo de troca de imagem (em milissegundos) conforme desejado
    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
    }
}

loadImagesFromDirectory();
