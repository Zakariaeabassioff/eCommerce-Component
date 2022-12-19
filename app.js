//Selectionner les éléments du DOM
const menu = document.querySelector('.menu-content ');
const cartSummary = document.querySelector('.cart-summary');
const total = document.querySelector('.amount.allTotal');
const tax = document.querySelector('.amount.tax');
const grandTotal = document.querySelector('.amount.grand-total');

//Tableau regroupant les plats du menu
const menuItems = [
    {
        name: 'French Fries with ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries with ketchup',
        count: 0
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti with Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        name: 'Ravioli',
        price: 599,
        image: 'plate__ravioli.png',
        alt: 'Ravioli',
        count: 0
    },
    {
        name: 'Fish Sticks Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks Fries',
        count: 0
    },
    {
        name: 'Tortellini',
        price: 450,
        image: 'plate__tortellini.png',
        alt: 'Tortellini',
        count: 0
    },
    {
        name: 'Chicken Salad',
        price: 699,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad',
        count: 0
    }
];

//Fonction pour afficher le menu dynamiquement
const renderMenu = () => {
    const menuItemsHTMLString = menuItems.map((item, index) => {
        const dollars = Math.floor(item.price / 100);
        const cents = item.price % 100;
        const inCart = item.count > 0;
        return `
        <li>
            <div class="menu-item">
                <div class="menu-item__img">
                    <img src="images/${item.image}" alt="${item.alt}">
                </div>
                <div class="menu-item__info">
                    <p>${item.name}</p>
                    <span>$${dollars}.${cents}</span>
                    ${!inCart ? `<button onClick="addToCart(${index})">Add to Cart</button>` : 
                    `<button class="in-cart">
                    <img src="images/check.svg" alt="check svg">
                    In Cart
                    </button>` 
                    }
                </div>
            </div>
        </li>
        `;
    }).join('');

    menu.innerHTML = menuItemsHTMLString;  
};

//Fonction pour afficher le panier dynamiquement
const renderCart = () => {
    const cartSummaryHTMLString = menuItems.map((item,index) => {
        const dollars = Math.floor(item.price / 100);
        const cents = item.price % 100;
        const totalDollars = dollars * item.count;
        const totalCents = cents * item.count;
        if(item.count === 0) return "";
        return `
            <li>
                <div class="cart-item-img">
                    <img src="images/${item.image}" alt="${item.alt}">
                    <div class="quantity">${item.count}</div>
                </div>
                <div class="cart-item-infos">
                    <p class="cart-item-name">${item.name}</p>
                    <span class="cart-item-price">$${dollars}.${cents}</span>
                </div>
                <div class="quantity__wrapper">
                    <button class="decreases" onClick="minusCount(${index})">
                        <img src="images/chevron.svg" alt="minus button">
                    </button>
                    <div class="quantity">${item.count}</div>
                    <button class="increases" onClick="addCount(${index})">
                        <img src="images/chevron.svg" alt="plus button">
                    </button>
                </div>
                <div class="subtotal">
                    $${totalDollars}.${totalCents}
                </div>
            </li>
        `;
    }).join('');

    cartSummary.innerHTML = cartSummaryHTMLString;

    //Calcul du total HT
    const subtotalPrice = menuItems.reduce((acc, item) => {
        return acc + item.price * item.count;
    }, 0);
    const subtotalDollars = Math.floor(subtotalPrice / 100);
    const subtotalCents = subtotalPrice % 100;
    //Affichage du total HT
    total.innerHTML = `$${subtotalDollars}.${subtotalCents}`;

    //Calcul de la TVA
    console.log(subtotalPrice);
    const taxPrice = Math.floor(subtotalPrice * 0.1);
    console.log(taxPrice);
    const taxDollars = Math.floor(taxPrice / 100);
    console.log(taxDollars);
    const taxCents = taxPrice % 100;
    console.log(taxCents);
    //Affichage de la TVA
    tax.innerHTML = `$${taxDollars}.${taxCents}`;

    //Calcul du total TTC
    const grandTotalPrice = subtotalPrice + taxPrice;
    const grandTotalDollars = Math.floor(grandTotalPrice / 100);
    const grandTotalCents = grandTotalPrice % 100;
    //Affichage du total TTC
    grandTotal.innerHTML = `$${grandTotalDollars}.${grandTotalCents}`;
};

//Fonction pour ajouter le nombre de plats commandés
const addCount = (index) => {
    menuItems[index].count++;
    console.log(menuItems[index].count);
    renderCart();
}

//Fonction pour enlever le nombre de plats commandés
const minusCount = (index) => {
    menuItems[index].count--;
    console.log(menuItems[index].count);
    renderCart();
    renderMenu();
}


//Fonction pour ajouter un plat au panier
const addToCart = (index) => {
    menuItems[index].count++;
    console.log(menuItems[index].count);
    renderMenu();
    renderCart();
}

renderMenu();