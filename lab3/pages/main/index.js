import { SubjectCardComponent } from '../../components/subject-card/index.js';
import { SubjectPage } from '../subject/index.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get cardsRoot() {
        return document.getElementById('subject-cards');
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="mt-5 pb-5 d-flex flex-column align-items-center">
                    <h1>Учебные предметы</h1>
                    <div id="subject-cards" class="w-75 mt-5 d-flex flex-wrap justify-content-around"></div>
                </div>
            `
        );
    }

    getData() {
        return [
            {
                id: 1,
                src: 'static/images/algebra.jpg',
                title: 'Алгебра',
                text: 'На этом предмете ученик более углубленно и абстрактно изучит самый универсальный язык Вселенной.',
                modules: [
                    {
                        src: 'static/images/trigonometry.jpg',
                        title: 'Тригонометрия',
                    },
                    {
                        src: 'static/images/probability_theory.jpg',
                        title: 'Теория вероятностей',
                    },
                    {
                        src: 'static/images/number_theory.jpg',
                        title: 'Теория чисел',
                    },
                ],
            },
            {
                id: 2,
                src: 'static/images/biology.jpg',
                title: 'Биология',
                text: 'Биология откроет ученику сложные механизмы устройства всего живого.',
                modules: [
                    {
                        src: 'static/images/botany.jpg',
                        title: 'Ботаника',
                    },
                    {
                        src: 'static/images/zoology.jpg',
                        title: 'Зоология',
                    },
                    {
                        src: 'static/images/anatomy.webp',
                        title: 'Анатомия',
                    },
                ],
            },
            {
                id: 3,
                src: 'static/images/physics.jpg',
                title: 'Физика',
                text: 'Данный предмет описывает мир как систему точных законов и правил и дает подробное и интересное объяснение феноменам, окружающим нас в повседневной жизни.',
                modules: [
                    {
                        src: 'static/images/mechanics.png',
                        title: 'Механика',
                    },
                    {
                        src: 'static/images/electrodynamics.jpg',
                        title: 'Электродинамика',
                    },
                    {
                        src: 'static/images/optics.jpg',
                        title: 'Оптика',
                    },
                ],
            },
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const subject = this.getData().filter((sub) => sub.id == cardId)[0];
        const productPage = new SubjectPage(this.parent);
        productPage.render(subject);
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const items = this.getData();
        items.forEach((item) => {
            const productCard = new SubjectCardComponent(this.cardsRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
