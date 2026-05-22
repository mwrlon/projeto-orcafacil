// FRONT END ------------------------------------------------------

// Função para rolar o carrossel

const scrollCarrossel = (direcao) => {
    const trilho = document.getElementById("carrosselTrilho");
    if (trilho) {
        const primeiroCard = trilho.querySelector("div");
        if (primeiroCard) {
            const tamanhoDoCard = primeiroCard.offsetWidth + 30; // Card + gap
            trilho.scrollLeft += (tamanhoDoCard * direcao);
        }
    }
};

// BACK-END ------------------------------------------------------

