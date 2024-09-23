// Les produits
const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: true, name: "Pumpkin" },
];

// Fonction pour générer le tableau 
function renderProducts(filterText = "", showInStockOnly = false) {
    const tableBody = document.getElementById('productBody');
    tableBody.innerHTML = ''; // Réinitialise le contenu du tableau

    // Diviser les produits par catégorie
    const categorizedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
    }, {});

    // Parcourir les catégories
    Object.keys(categorizedProducts).forEach(category => {
        // Insérer une ligne de catégorie
        const categoryRow = document.createElement('tr');
        const categoryCell = document.createElement('td');
        categoryCell.colSpan = 2;
        categoryCell.classList.add('category');
        categoryCell.textContent = category;
        categoryRow.appendChild(categoryCell);
        tableBody.appendChild(categoryRow);

        // Insérer les produits de la catégorie
        categorizedProducts[category].forEach(product => {
            if (
                (!showInStockOnly || product.stocked) && 
                product.name.toLowerCase().includes(filterText.toLowerCase())
            ) {
                const productRow = document.createElement('tr');
                const nameCell = document.createElement('td');
                const priceCell = document.createElement('td');

                nameCell.textContent = product.name;
                priceCell.textContent = product.price;

                if (!product.stocked) {
                    nameCell.classList.add('out-of-stock');
                }

                productRow.appendChild(nameCell);
                productRow.appendChild(priceCell);
                tableBody.appendChild(productRow);
            }
        });
    });
}

// Fonction pour écouter les événements sur le champ de recherche et la case à cocher
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const inStockCheckbox = document.getElementById('inStockCheckbox');

    searchInput.addEventListener('input', () => {
        renderProducts(searchInput.value, inStockCheckbox.checked);
    });

    inStockCheckbox.addEventListener('change', () => {
        renderProducts(searchInput.value, inStockCheckbox.checked);
    });
}

// Initialiser l'affichage des produits
renderProducts();
setupEventListeners();
