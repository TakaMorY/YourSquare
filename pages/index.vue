<template>
    <div class="homepage">
        <!-- Герой-секция -->
        <section class="hero-section">
            <div class="hero-container">
                <div class="hero-content">
                    <div class="hero-badge">
                        <span class="badge-text">Твой город, твои правила</span>
                        <div class="badge-line"></div>
                    </div>
                    <h1 class="hero-title">
                        <span class="title-line">Найди свой</span>
                        <span class="title-line accent">Квадрат</span>
                        <span class="title-line">в городе</span>
                    </h1>
                    <p class="hero-subtitle">
                        Единая платформа для всего, что нужно подростку в твоём городе:
                        места, активности, люди и вещи — всё в одном месте.
                    </p>
                    <div class="hero-actions">
                        <NuxtLink to="/explore" class="btn btn-primary">
                            <span>Начать исследовать</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19 12H4.75" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </NuxtLink>
                        <a href="https://t.me/your_square_bot" target="_blank" class="btn btn-telegram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M21 5L2 12.5L9 13.5M21 5L15 21L9 13.5M21 5L9 13.5" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>Telegram-бот</span>
                        </a>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="visual-grid">
                        <div class="grid-item map-item">
                            <div class="item-content">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                        stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                        stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <h3>Карта мест</h3>
                                <p>Крутые локации рядом</p>
                            </div>
                        </div>
                        <div class="grid-item activity-item">
                            <div class="item-content">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                        stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                                        stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                                        stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                                        stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <h3>Найти компанию</h3>
                                <p>Для игр и активностей</p>
                            </div>
                        </div>
                        <div class="grid-item market-item">
                            <div class="item-content">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                                        stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3 6H21" stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                                        stroke="#f97316" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <h3>Маркетплейс</h3>
                                <p>Продай ненужное, купи крутое</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Секция "Как это работает" -->
        <section class="how-it-works">
            <div class="section-container">
                <div class="section-header">
                    <h2 class="section-title">Как работает <span class="accent">Твой Квадрат</span></h2>
                    <p class="section-subtitle">Три части — одна экосистема</p>
                </div>

                <div class="workflow">
                    <div class="workflow-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Находи места</h3>
                            <p>Наша карта показывает лучшие места в городе: от тихих кафе для учебы до крутых площадок
                                для активностей.</p>
                            <ul class="step-features">
                                <li>Фильтры по цене, атмосфере, оснащению</li>
                                <li>Реальные отзывы от таких же подростков</li>
                                <li>Актуальная информация о работе</li>
                            </ul>
                        </div>
                    </div>

                    <div class="workflow-arrow">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f97316" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <div class="workflow-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Ищи компанию</h3>
                            <p>Не хочешь идти один? Найди компанию для любых активностей — от настолок до спорта.</p>
                            <ul class="step-features">
                                <li>Создавай события и ищи участников</li>
                                <li>Присоединяйся к существующим активностям</li>
                                <li>Общайся в тематических чатах</li>
                            </ul>
                        </div>
                    </div>

                    <div class="workflow-arrow">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f97316" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <div class="workflow-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Покупай/продавай</h3>
                            <p>Заработай на развлечения, продав ненужные вещи. Или найди уникальные штуки для себя.</p>
                            <ul class="step-features">
                                <li>Только подростки — понимаем твой стиль</li>
                                <li>Система репутации и безопасные сделки</li>
                                <li>Удобный поиск по категориям</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Секция "Популярное сейчас" -->
        <section class="popular-now">
            <div class="section-container">
                <div class="section-header">
                    <h2 class="section-title">Популярное <span class="accent">сейчас</span></h2>
                    <div class="section-tabs">
                        <button class="tab-btn active" @click="activeTab = 'places'">Места</button>
                        <button class="tab-btn" @click="activeTab = 'activities'">Активности</button>
                        <button class="tab-btn" @click="activeTab = 'market'">Товары</button>
                    </div>
                </div>

                <div class="tab-content">
                    <!-- Места -->
                    <div v-if="activeTab === 'places'" class="places-grid">
                        <div class="place-card" v-for="place in popularPlaces" :key="place.id">
                            <div class="place-image">
                                <img :src="place.image" :alt="place.name">
                                <span class="place-category">{{ place.category }}</span>
                            </div>
                            <div class="place-content">
                                <h3>{{ place.name }}</h3>
                                <p class="place-description">{{ place.description }}</p>
                                <div class="place-meta">
                                    <span class="place-price">{{ place.price }}</span>
                                    <span class="place-rating">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                                fill="#fbbf24" stroke="#fbbf24" />
                                        </svg>
                                        {{ place.rating }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Активности -->
                    <div v-if="activeTab === 'activities'" class="activities-list">
                        <div class="activity-card" v-for="activity in popularActivities" :key="activity.id">
                            <div class="activity-type">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="#f97316" stroke-width="2" />
                                    <path d="M16 12L10 16V8L16 12Z" fill="#f97316" />
                                </svg>
                                <span>{{ activity.type }}</span>
                            </div>
                            <div class="activity-content">
                                <h3>{{ activity.title }}</h3>
                                <p>{{ activity.description }}</p>
                                <div class="activity-meta">
                                    <span>{{ activity.participants }}/{{ activity.maxParticipants }}</span>
                                    <span>·</span>
                                    <span>{{ activity.date }}</span>
                                </div>
                            </div>
                            <button class="activity-join" :disabled="activity.participants >= activity.maxParticipants">
                                {{ activity.participants >= activity.maxParticipants ? 'Мест нет' : 'Присоединиться' }}
                            </button>
                        </div>
                    </div>

                    <!-- Товары -->
                    <div v-if="activeTab === 'market'" class="market-grid">
                        <div class="product-card" v-for="product in popularProducts" :key="product.id">
                            <div class="product-image">
                                <img :src="product.image" :alt="product.title">
                                <span class="product-price">{{ product.price }} ₽</span>
                            </div>
                            <div class="product-content">
                                <h3>{{ product.title }}</h3>
                                <p class="product-description">{{ product.description }}</p>
                                <div class="product-seller">
                                    <span>{{ product.seller }}</span>
                                    <span class="seller-rating">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                                fill="#fbbf24" />
                                        </svg>
                                        {{ product.rating }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <section>
            <AboutForum />
        </section>



        <!-- CTA секция -->

    </div>
</template>

<script setup>
import { ref } from 'vue'
import AboutForum from '~/companents/index/AboutForum.vue'


const activeTab = ref('places')

const popularPlaces = ref([
    {
        id: 1,
        name: 'Кофейня "Буква"',
        category: 'Кафе',
        description: 'Уютное место с розетками и быстрым Wi-Fi. Идеально для учебы.',
        price: 'От 150 ₽',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'Скейт-парк "Радуга"',
        category: 'Спорт',
        description: 'Новый скейт-парк с освещением до 23:00. Прокат снаряжения.',
        price: 'Бесплатно',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1572776685600-aca8c3456337?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Коворкинг "Хаб"',
        category: 'Работа',
        description: 'Студенческий коворкинг с чаем и печеньками. 24/7.',
        price: '250 ₽/час',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Книжный "Атмосфера"',
        category: 'Культура',
        description: 'Книжный с диванами и настолками. Можно читать весь день.',
        price: 'Бесплатно',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop'
    }
])

const popularActivities = ref([
    {
        id: 1,
        title: 'Турнир по Dota 2',
        type: 'Игры',
        description: 'Ищем команду из 5 человек для локального турнира в эту субботу.',
        participants: 3,
        maxParticipants: 5,
        date: 'Завтра, 18:00'
    },
    {
        id: 2,
        title: 'Катание на скейтах',
        type: 'Спорт',
        description: 'Собираемся в скейт-парке "Радуга". Присоединяйся!',
        participants: 8,
        maxParticipants: 15,
        date: 'Сегодня, 16:00'
    },
    {
        id: 3,
        title: 'Учебная группа',
        type: 'Учеба',
        description: 'Готовимся к ЕГЭ по математике вместе. Библиотека, 3 этаж.',
        participants: 6,
        maxParticipants: 10,
        date: 'Пн, 17:00'
    }
])

const popularProducts = ref([
    {
        id: 1,
        title: 'Графический планшет Wacom',
        description: 'Почти новый, использовался 2 месяца. В комплекте перо.',
        price: '8 500',
        seller: 'Алексей',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w-400&h=300&fit=crop'
    },
    {
        id: 2,
        title: 'Кроссовки Nike Jordan',
        description: 'Размер 42. Носил 3 раза. Состояние отличное.',
        price: '12 000',
        seller: 'Михаил',
        rating: '5.0',
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        title: 'Гитара акустическая',
        description: 'Yamaha F310. Отличный звук, есть чехол.',
        price: '15 000',
        seller: 'Катя',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop'
    }
])
</script>

<style scoped>
.homepage {
    min-height: 100vh;
}

/* Герой-секция */
.hero-section {
    padding: 8rem 0 6rem;
    background: linear-gradient(135deg, #ffffff 0%, #fef3e7 100%);
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
    z-index: 0;
}

.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;
    position: relative;
    z-index: 1;
}

@media (min-width: 1024px) {
    .hero-container {
        grid-template-columns: 1fr 1fr;
        align-items: center;
    }
}

.hero-content {
    max-width: 600px;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 0.5rem 1rem;
    background: rgba(249, 115, 22, 0.1);
    border-radius: 100px;
    border: 1px solid rgba(249, 115, 22, 0.2);
}

.badge-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: #f97316;
}

.badge-line {
    width: 20px;
    height: 1px;
    background: #f97316;
    opacity: 0.5;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: #111827;
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
}

.title-line {
    display: block;
}

.title-line.accent {
    color: #f97316;
    position: relative;
    display: inline-block;
}

.title-line.accent::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: rgba(249, 115, 22, 0.2);
    z-index: -1;
    border-radius: 4px;
}

.hero-subtitle {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 3rem;
    max-width: 90%;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: none;
    outline: none;
}

.btn-primary {
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}

.btn-telegram {
    background: white;
    color: #111827;
    border: 1px solid #e5e7eb;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.btn-telegram:hover {
    background: #f9fafb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.visual-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto;
}

.grid-item {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid #f1f5f9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.grid-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.map-item {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, #ffffff, #fef3e7);
}

.activity-item {
    background: white;
}

.market-item {
    background: white;
}

.item-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
}

.item-content svg {
    color: #f97316;
}

.item-content h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
}

.item-content p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
}

/* Секции */
.section-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 1rem;
}

.section-title .accent {
    color: #f97316;
}

.section-subtitle {
    font-size: 1.125rem;
    color: #6b7280;
}

/* Как это работает */
.how-it-works {
    padding: 6rem 0;
    background: white;
}

.workflow {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 800px;
    margin: 0 auto;
}

@media (min-width: 768px) {
    .workflow {
        grid-template-columns: 1fr auto 1fr auto 1fr;
        align-items: center;
    }
}

.workflow-step {
    text-align: center;
}

.step-number {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}

.step-content h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1rem;
}

.step-content p {
    color: #4b5563;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.step-features {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
}

.step-features li {
    padding: 0.5rem 0;
    color: #6b7280;
    position: relative;
    padding-left: 1.5rem;
}

.step-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #f97316;
    font-weight: bold;
}

.workflow-arrow {
    display: none;
}

@media (min-width: 768px) {
    .workflow-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

/* Популярное сейчас */
.popular-now {
    padding: 6rem 0;
    background: #fafafa;
}

.section-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
}

.tab-btn {
    padding: 0.75rem 2rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 50px;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tab-btn.active {
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    border-color: #f97316;
    box-shadow: 0 2px 8px rgba(249, 115, 22, 0.2);
}

.tab-btn:hover:not(.active) {
    border-color: #d1d5db;
    color: #374151;
}

/* Сетки контента */
.places-grid,
.market-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.place-card,
.product-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #f1f5f9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.place-card:hover,
.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.place-image,
.product-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.place-image img,
.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.place-card:hover .place-image img,
.product-card:hover .product-image img {
    transform: scale(1.05);
}

.place-category {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
}

.product-price {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 100px;
    font-weight: 700;
    font-size: 1.125rem;
}

.place-content,
.product-content {
    padding: 1.5rem;
}

.place-content h3,
.product-content h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
}

.place-description,
.product-description {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
}

.place-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.place-price {
    font-weight: 700;
    color: #111827;
}

.place-rating,
.seller-rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
    color: #111827;
}

.product-seller {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #f1f5f9;
    font-size: 0.875rem;
}

/* Активности */
.activities-list {
    max-width: 600px;
    margin: 2rem auto 0;
}

.activity-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
}

.activity-card:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.activity-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
}

.activity-type span {
    font-size: 0.75rem;
    color: #f97316;
    font-weight: 600;
}

.activity-content {
    flex: 1;
}

.activity-content h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
}

.activity-content p {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
}

.activity-meta {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
}

.activity-join {
    padding: 0.5rem 1.5rem;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.activity-join:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.activity-join:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

/* Telegram секция */



</style>