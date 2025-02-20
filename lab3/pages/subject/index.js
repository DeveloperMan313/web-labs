import { BackButtonComponent } from '../../components/back-button/index.js';
import { MainPage } from '../main/index.js';
import { Carousel } from '../../components/carousel/index.js';

export class SubjectPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('subject-page');
    }

    getHTML() {
        return '<div id="subject-page" class="mt-5 pb-5 d-flex flex-column align-items-center"></div>';
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render(data) {
        this.parent.innerHTML = '';

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const textHtml = `
            <h1 class="mt-4">${data.title}</h1>
            <p class="mb-5 w-50">${data.text}</p>
        `;
        this.pageRoot.insertAdjacentHTML('beforeend', textHtml);

        const moduleCarousel = new Carousel(this.pageRoot);
        moduleCarousel.render(data.modules);
    }
}
