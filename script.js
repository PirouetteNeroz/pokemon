const url = 'https://api.cardtrader.com/api/v2/products/export';
const token = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJjYXJkdHJhZGVyLXByb2R1Y3Rpb24iLCJzdWIiOiJhcHA6MTM5MzgiLCJhdWQiOiJhcHA6MTM5MzgiLCJleHAiOjQ4OTU0MDQ3MjMsImp0aSI6ImJlZjQzYjNkLTk0MDktNDc2OC1hNjlmLTg5Y2M0Yzk5ZDI4NSIsImlhdCI6MTczOTczMTEyMywibmFtZSI6Ik5lcm96YnJpY2tzIEFwcCAyMDI1MDIwODE3NDkxOSJ9.setF5FzZ_scWRYIl8zTXCBP8p6ymRc0FnF2lHKZFjj5Asi7j_ZqGiOZKMbrr3e49DXwYTXtbGlyLldRz1J-flejaqXBj-EaYPiiPZ9ouWl0wl44cinNB-IKM22haLcbsHncTeiC3rK_mpoGX8lk5qAIyjhJn8UV5xx1l03hINwQd3a6FvIDb14GFgcXbalRWA13PrWCcDk7D0b_8L2RX7FAeIsfspsCSotF5M8RtWxqbxyum01cfNSpbfYgnrnHMXrCmcsRHPBHtHkPnoHMfi7ZA-x7XKKp6wFmOQ7iz3Tj6-wGMCdUA4N5Zt3hVgeZkKBNb-7Pwrvzn6wdwaWnUqQ';

async function fetchCards() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des cartes');
        }

        const data = await response.json();
        const cardsContainer = document.getElementById('cards-container');

        // Vérifier si la réponse contient des produits
        if (data && data.products) {
            data.products.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                
                // Créer le contenu de chaque carte
                cardElement.innerHTML = `
                    <img src="${card.image_url}" alt="${card.name}">
                    <p>${card.name}</p>
                    <p>Prix: ${card.price} €</p>
                    <button class="add-to-cart" data-id="${card.id}" data-name="${card.name}" data-price="${card.price}">Ajouter au panier</button>
                `;
                
                // Ajouter la carte au conteneur
                cardsContainer.appendChild(cardElement);
            });

            // Ajouter des écouteurs d'événements pour les boutons "Ajouter au panier"
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', addToCart);
            });

            updateCart();
        } else {
            console.error('Aucune carte trouvée dans les données');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des cartes:', error);
    }
}

// Appeler la fonction pour afficher les cartes
fetchCards();
