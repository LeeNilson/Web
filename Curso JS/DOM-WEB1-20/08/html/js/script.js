        let evoluido = false;

        function evoluirPokemon() {
            const imageElement = document.getElementById('pokemonImg');
            const titulo = document.getElementById('pokemonTitulo');
            const descricao = document.getElementById('pokemonDescricao');
            const card = document.getElementById('card1');
            const botao = document.querySelector('.btn-evoluir');

            if (!evoluido) {
                imageElement.src = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/026.png';
                imageElement.alt = 'Raichu';
                titulo.textContent = 'Raichu';
                descricao.textContent = 'Evolução do Pikachu - Tipo Elétrico';
                botao.innerHTML = ' Voltar';
                card.classList.add('evoluido');
                evoluido = true;
            } else {
                imageElement.src = 'https://i.pinimg.com/736x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg';
                imageElement.alt = 'Pikachu';
                titulo.textContent = 'Pikachu';
                descricao.textContent = 'Pokémon do tipo Elétrico';
                botao.innerHTML = '⚡ Evoluir';
                card.classList.remove('evoluido');
                evoluido = false;
            }

            card.classList.add('ativo');
            setTimeout(() => {
                card.classList.remove('ativo');
            }, 500);
        }

        window.addEventListener('load', () => {
            const card = document.querySelector('.card');
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });
    