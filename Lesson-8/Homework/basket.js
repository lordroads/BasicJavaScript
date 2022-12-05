class Basket {
    constructor(basketCounter, basketAreaItems) {
        this.listItems = new Map();
        this.counter = basketCounter;
        this.basketAreaItems = basketAreaItems;
    }

    init(){
        this.counter.textContent = 0;
    }

    addItem(item){
        const id = parseInt(item.dataset.id);
        const name = item.dataset.name.toString();
        const price = parseInt(item.dataset.price);

        if (!this.listItems.has(id)) {
            const newItem = new Map();

            newItem.set('id', id);
            newItem.set('name', name);
            newItem.set('price', price);
            newItem.set('count', 1);

            this.listItems.set(id, newItem);
        }
        else {
            const dataItem = this.listItems.get(id);

            const count = dataItem.get('count');
            dataItem.set('count', count+1);
        }

        this.counter.textContent = parseInt(this.counter.textContent) + 1;
        this.resetBasket();
    }

    resetBasket(){
        const basketAllTotal = document.querySelector('.basketTotalValue');
        const basketItems = document.querySelectorAll('.basketRow.basketItem');
        if (basketItems.length > 0) {
            basketItems.forEach(item => {
                console.log(item);
                item.remove();
            })
        }

        let htmlItem = '';
        let allTotal = 0;

        for (const item of this.listItems.values()) {
            console.log(item);
            const price = item.get('price');
            const total = price * item.get('count');
            allTotal += total;

            htmlItem += '<div class="basketRow basketItem">' +
                '<div>' + item.get('name') + '</div>' +
                '<div>' + item.get('count') + '</div>' +
                '<div>' + price + '</div>' +
                '<div>' + total.toFixed(2) + '</div>' +
                '</div>\n';


        }

        this.basketAreaItems.insertAdjacentHTML('afterend', htmlItem);

        console.log(allTotal);
        basketAllTotal.textContent = allTotal.toFixed(2);
    }
}


const cartIconWrapEl = document.querySelector('.cartIconWrap');
cartIconWrapEl.style.cursor = 'pointer';

let basket = new Basket(cartIconWrapEl.querySelector('span'),
    document.querySelector('.basket .basketHeader'));
basket.init();

const basketEl = document.querySelector('.basket');


cartIconWrapEl.addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});


document.body.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('button') && target.closest('.featuredItem')) {
        basket.addItem(target.closest('.featuredItem'));
    }
});


