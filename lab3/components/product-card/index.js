import { ButtonComponent } from '../../components/button/index.js';

export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(item) {
        return (
            `
                <div class="card" style="width: 300px;" data-id="${item.id}">
                    <img class="card-img-top" src="https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg" alt="картинка">
                    <div class="card-body">
                        <h5 class="card-title">Акция</h5>
                        <p class="card-text">Вот тут информация об акции</p>
                    </div>
                </div>
            `
        );
    }

    render(item, btnCallback) {
        const html = this.getHTML(item, btnCallback);
        this.parent.insertAdjacentHTML('beforeend', html);
        const buttonParent = document.querySelector(`.card[data-id="${item.id}"] .card-body`);
        const productButton = new ButtonComponent(buttonParent);
        productButton.render(item, btnCallback);
    }
}
