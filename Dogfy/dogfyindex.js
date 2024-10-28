document.getElementById('fetchButton').addEventListener('click', (event) => {
    event.preventDefault();

    // Função para buscar dados de uma página específica
    const fetchPage = (pageNumber) => {
        return fetch(`https://dogapi.dog/api/v2/breeds?page[number]=${pageNumber}`)
            .then(response => response.json())
            .then(data => data.data)
            .catch(error => {
                console.error(`Erro ao buscar a página ${pageNumber}:`, error);
                return [];
            });
    };

    const totalPages = 29;

    const pagePromises = [];
    for (let i = 1; i <= totalPages; i++) {
        pagePromises.push(fetchPage(i));
    }

    // Buscar dados de todas as páginas e combinar resultados
    Promise.all(pagePromises)
        .then(results => {
            const combinedBreeds = results.flat();
            console.log('Dados combinados:', combinedBreeds);

            const ids = combinedBreeds.map(breed => breed.id);
            console.log('IDs disponíveis:', ids);

            const randomId = ids[Math.floor(Math.random() * ids.length)];
            console.log('ID selecionado:', randomId);
            
            const breed = combinedBreeds.find(breed => breed.id === randomId);
            const resultParagraph = document.getElementById('result');

            if (breed) {
                resultParagraph.innerHTML = `
                <p id="nome"><strong>Nome:</strong> ${breed.attributes.name}</p>
                <p id="descricao"><strong>Descrição:</strong> ${breed.attributes.description}</p>
                <p id="tmax"><strong>Tempo de vida máximo:</strong> ${breed.attributes.life.max} anos</p>
                <p id="tmin"><strong>Tempo de vida mínimo:</strong> ${breed.attributes.life.min} anos</p>
                `;
            } else {
                resultParagraph.innerHTML = `
                    <p>Raça não encontrada.</p>
                `;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
        });
});