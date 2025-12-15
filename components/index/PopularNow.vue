<template>
    <!-- Секция "Популярное сейчас" -->
    <section class="popular-now">
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">Популярное <span class="accent">сейчас</span></h2>
                <div class="section-tabs-wrapper">
                    <div class="section-tabs" ref="tabsContainer">
                        <button class="tab-btn active" @click="setActiveTab('places')"
                            :class="{ 'active': activeTab === 'places' }">
                            <svg class="tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path
                                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                    stroke="currentColor" stroke-width="1.5" />
                            </svg>
                            <span>Места</span>
                        </button>
                        <button class="tab-btn" @click="setActiveTab('activities')"
                            :class="{ 'active': activeTab === 'activities' }">
                            <svg class="tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path
                                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path
                                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path
                                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                                    stroke="currentColor" stroke-width="1.5" />
                            </svg>
                            <span>Активности</span>
                        </button>
                        <button class="tab-btn" @click="setActiveTab('market')"
                            :class="{ 'active': activeTab === 'market' }">
                            <svg class="tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path d="M3 6H21" stroke="currentColor" stroke-width="1.5" />
                                <path
                                    d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                                    stroke="currentColor" stroke-width="1.5" />
                            </svg>
                            <span>Товары</span>
                        </button>
                    </div>
                    <div class="tab-scroll-indicator left" :class="{ 'visible': showLeftScroll }">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div class="tab-scroll-indicator right" :class="{ 'visible': showRightScroll }">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="tab-content">
                <!-- Места -->
                <div v-if="activeTab === 'places'" class="places-grid">
                    <div class="place-card" v-for="place in popularPlaces" :key="place.id">
                        <div class="place-image">
                            <div class="image-placeholder">
                                <span>{{ place.name.charAt(0) }}</span>
                            </div>
                            <span class="place-category">{{ place.category }}</span>
                            <div class="place-favorite">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M20.42 4.58C19.9183 4.07658 19.3223 3.67714 18.6658 3.40456C18.0093 3.13199 17.305 2.99179 16.593 2.99179C15.881 2.99179 15.1767 3.13199 14.5202 3.40456C13.8637 3.67714 13.2677 4.07658 12.766 4.58L12 5.36L11.234 4.58C10.2329 3.57899 8.85141 3.01273 7.407 3.01273C5.96259 3.01273 4.58109 3.57899 3.58 4.58C2.57899 5.58109 2.01273 6.96259 2.01273 8.407C2.01273 9.85141 2.57899 11.2329 3.58 12.234L4.36 13L12 20.64L19.64 13L20.42 12.234C21.421 11.2329 21.9873 9.85141 21.9873 8.407C21.9873 6.96259 21.421 5.58109 20.42 4.58Z"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div class="place-content">
                            <h3>{{ place.name }}</h3>
                            <p class="place-description">{{ place.description }}</p>
                            <div class="place-meta">
                                <div class="place-tags">
                                    <span class="place-tag">{{ place.category }}</span>
                                    <span class="place-tag" v-if="place.tags" v-for="tag in place.tags" :key="tag">{{
                                        tag }}</span>
                                </div>
                                <div class="place-info">
                                    <span class="place-price">{{ place.price }}</span>
                                    <span class="place-rating">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                                fill="currentColor" stroke="currentColor" />
                                        </svg>
                                        {{ place.rating }}
                                    </span>
                                </div>
                            </div>
                            <button class="place-action">Посмотреть на карте</button>
                        </div>
                    </div>
                </div>

                <!-- Активности -->
                <div v-if="activeTab === 'activities'" class="activities-list">
                    <div class="activity-card" v-for="activity in popularActivities" :key="activity.id">
                        <div class="activity-header">
                            <div class="activity-type">
                                <div class="activity-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="#f97316" stroke-width="2" />
                                        <path d="M16 12L10 16V8L16 12Z" fill="#f97316" />
                                    </svg>
                                </div>
                                <div class="activity-type-info">
                                    <span class="activity-category">{{ activity.type }}</span>
                                    <span class="activity-time">{{ activity.date }}</span>
                                </div>
                            </div>
                            <div class="activity-participants">
                                <div class="participants-count">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                            stroke="#6b7280" stroke-width="2" />
                                        <path
                                            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                                            stroke="#6b7280" stroke-width="2" />
                                    </svg>
                                    <span>{{ activity.participants }}/{{ activity.maxParticipants }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="activity-content">
                            <h3>{{ activity.title }}</h3>
                            <p class="activity-description">{{ activity.description }}</p>
                            <div class="activity-location" v-if="activity.location">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                        stroke="#6b7280" stroke-width="1.5" />
                                    <path
                                        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                        stroke="#6b7280" stroke-width="1.5" />
                                </svg>
                                <span>{{ activity.location }}</span>
                            </div>
                        </div>
                        <div class="activity-footer">
                            <button class="activity-join"
                                :class="{ 'disabled': activity.participants >= activity.maxParticipants }"
                                :disabled="activity.participants >= activity.maxParticipants">
                                {{ activity.participants >= activity.maxParticipants ? 'Мест нет' : 'Присоединиться' }}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Товары -->
                <div v-if="activeTab === 'market'" class="market-grid">
                    <div class="product-card" v-for="product in popularProducts" :key="product.id">
                        <div class="product-image">
                            <div class="image-placeholder">
                                <span>{{ product.title.charAt(0) }}</span>
                            </div>
                            <span class="product-price">{{ formatPrice(product.price) }} ₽</span>
                            <div class="product-status">
                                <span class="status-badge"
                                    :class="{ 'new': product.status === 'new', 'used': product.status === 'used' }">
                                    {{ product.status === 'new' ? 'Новое' : 'Б/У' }}
                                </span>
                            </div>
                        </div>
                        <div class="product-content">
                            <h3>{{ product.title }}</h3>
                            <p class="product-description">{{ product.description }}</p>
                            <div class="product-meta">
                                <div class="product-seller">
                                    <div class="seller-avatar">
                                        <span>{{ product.seller.charAt(0) }}</span>
                                    </div>
                                    <div class="seller-info">
                                        <span class="seller-name">{{ product.seller }}</span>
                                        <div class="seller-rating">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                                    fill="#fbbf24" />
                                            </svg>
                                            <span>{{ product.rating }}</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="product-action">Написать продавцу</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeTab = ref('places')
const showLeftScroll = ref(false)
const showRightScroll = ref(true)
const tabsContainer = ref(null)

const setActiveTab = (tab) => {
    activeTab.value = tab
}

const formatPrice = (price) => {
    return parseInt(price.replace(/\s/g, '')).toLocaleString('ru-RU')
}

const checkScroll = () => {
    if (!tabsContainer.value) return

    const container = tabsContainer.value
    showLeftScroll.value = container.scrollLeft > 0
    showRightScroll.value = container.scrollLeft < (container.scrollWidth - container.clientWidth - 1)
}

onMounted(() => {
    if (tabsContainer.value) {
        tabsContainer.value.addEventListener('scroll', checkScroll)
        checkScroll() // Initial check
    }
})

onUnmounted(() => {
    if (tabsContainer.value) {
        tabsContainer.value.removeEventListener('scroll', checkScroll)
    }
})

const popularPlaces = ref([
    {
        id: 1,
        name: 'Кофейня "Буква"',
        category: 'Кафе',
        description: 'Уютное место с розетками и быстрым Wi-Fi. Идеально для учебы.',
        price: 'От 150 ₽',
        rating: '4.8',
        tags: ['Wi-Fi', 'Розетки', 'Кофе']
    },
    {
        id: 2,
        name: 'Скейт-парк "Радуга"',
        category: 'Спорт',
        description: 'Новый скейт-парк с освещением до 23:00. Прокат снаряжения.',
        price: 'Бесплатно',
        rating: '4.9',
        tags: ['Скейтборд', 'Вечером', 'Прокат']
    },
    {
        id: 3,
        name: 'Коворкинг "Хаб"',
        category: 'Работа',
        description: 'Студенческий коворкинг с чаем и печеньками. 24/7.',
        price: '250 ₽/час',
        rating: '4.7',
        tags: ['24/7', 'Чай', 'Печеньки']
    },
    {
        id: 4,
        name: 'Книжный "Атмосфера"',
        category: 'Культура',
        description: 'Книжный с диванами и настолками. Можно читать весь день.',
        price: 'Бесплатно',
        rating: '4.6',
        tags: ['Книги', 'Настолки', 'Диваны']
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
        date: 'Завтра, 18:00',
        location: 'Киберспорт арена "Пиксель"'
    },
    {
        id: 2,
        title: 'Катание на скейтах',
        type: 'Спорт',
        description: 'Собираемся в скейт-парке "Радуга". Присоединяйся!',
        participants: 8,
        maxParticipants: 15,
        date: 'Сегодня, 16:00',
        location: 'Скейт-парк "Радуга"'
    },
    {
        id: 3,
        title: 'Учебная группа',
        type: 'Учеба',
        description: 'Готовимся к ЕГЭ по математике вместе. Библиотека, 3 этаж.',
        participants: 6,
        maxParticipants: 10,
        date: 'Пн, 17:00',
        location: 'Главная библиотека'
    }
])

const popularProducts = ref([
    {
        id: 1,
        title: 'Графический планшет Wacom',
        description: 'Почти новый, использовался 2 месяца. В комплекте перо.',
        price: '8500',
        seller: 'Алексей',
        rating: '4.9',
        status: 'used'
    },
    {
        id: 2,
        title: 'Кроссовки Nike Jordan',
        description: 'Размер 42. Носил 3 раза. Состояние отличное.',
        price: '12000',
        seller: 'Михаил',
        rating: '5.0',
        status: 'used'
    },
    {
        id: 3,
        title: 'Гитара акустическая',
        description: 'Yamaha F310. Отличный звук, есть чехол.',
        price: '15000',
        seller: 'Катя',
        rating: '4.8',
        status: 'used'
    }
])
</script>

<style scoped>
/* Секция "Популярное сейчас" */
.popular-now {
    padding: 3rem 1rem;
    background: #fafafa;
}

@media (min-width: 768px) {
    .popular-now {
        padding: 6rem 1.5rem;
    }
}

@media (min-width: 1024px) {
    .popular-now {
        padding: 8rem 1.5rem;
    }
}

.section-container {
    max-width: 1280px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
    .section-header {
        margin-bottom: 4rem;
    }
}

.section-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 1.5rem;
    line-height: 1.2;
}

@media (min-width: 768px) {
    .section-title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
    }
}

.section-title .accent {
    color: #f97316;
}

.section-tabs-wrapper {
    position: relative;
    margin: 0 auto;
    max-width: 600px;
}

.section-tabs {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
    padding: 0.25rem;
    margin: 0 -0.25rem;
}

.section-tabs::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
}

@media (min-width: 640px) {
    .section-tabs {
        justify-content: center;
        overflow-x: visible;
    }
}

.tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: white;
    border: 1.5px solid #e5e7eb;
    border-radius: 50px;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    flex-shrink: 0;
    font-size: 0.875rem;
}

@media (min-width: 768px) {
    .tab-btn {
        padding: 0.875rem 1.5rem;
        font-size: 1rem;
    }
}

.tab-btn:hover:not(.active) {
    border-color: #d1d5db;
    color: #374151;
    background: #f9fafb;
}

.tab-btn.active {
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    border-color: #f97316;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}

.tab-icon {
    flex-shrink: 0;
}

.tab-scroll-indicator {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    color: #6b7280;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 10;
}

.tab-scroll-indicator.visible {
    opacity: 1;
    visibility: visible;
}

.tab-scroll-indicator.left {
    left: -16px;
}

.tab-scroll-indicator.right {
    right: -16px;
}

@media (min-width: 640px) {
    .tab-scroll-indicator {
        display: none;
    }
}

/* Контент табов */
.tab-content {
    margin-top: 2rem;
}

/* Сетка мест */
.places-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

@media (max-width: 639px) {
    .places-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

@media (min-width: 640px) and (max-width: 767px) {
    .places-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .places-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.place-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #f1f5f9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.place-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.place-image {
    position: relative;
    height: 180px;
    overflow: hidden;
    background: linear-gradient(135deg, #fef3e7, #fed7aa);
}

@media (min-width: 768px) {
    .place-image {
        height: 200px;
    }
}

.image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 700;
    color: rgba(249, 115, 22, 0.2);
}

.place-category {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 0.375rem 0.875rem;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
}

.place-favorite {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;
    color: #d1d5db;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.place-favorite:hover {
    color: #f97316;
    transform: scale(1.1);
}

.place-content {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .place-content {
        padding: 1.5rem;
    }
}

.place-content h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
    line-height: 1.3;
}

@media (min-width: 768px) {
    .place-content h3 {
        font-size: 1.25rem;
    }
}

.place-description {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
}

.place-meta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.25rem;
}

.place-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
}

.place-tag {
    padding: 0.25rem 0.625rem;
    background: #f3f4f6;
    color: #4b5563;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 500;
}

.place-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.place-price {
    font-weight: 700;
    color: #111827;
    font-size: 1.125rem;
}

.place-rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
    color: #111827;
    font-size: 0.875rem;
}

.place-rating svg {
    color: #fbbf24;
}

.place-action {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.place-action:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

/* Список активностей */
.activities-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 768px) {
    .activities-list {
        gap: 1.25rem;
    }
}

.activity-card {
    background: white;
    border-radius: 16px;
    padding: 1.25rem;
    border: 1px solid #f1f5f9;
    transition: all 0.3s ease;
}

@media (min-width: 768px) {
    .activity-card {
        padding: 1.5rem;
    }
}

.activity-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.activity-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.activity-type {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.activity-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(249, 115, 22, 0.1);
    border-radius: 12px;
}

.activity-type-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.activity-category {
    font-weight: 600;
    color: #111827;
    font-size: 0.875rem;
}

.activity-time {
    font-size: 0.75rem;
    color: #6b7280;
}

.activity-participants {
    display: flex;
    align-items: center;
}

.participants-count {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: #f9fafb;
    border-radius: 100px;
    font-size: 0.875rem;
    color: #6b7280;
}

.activity-content {
    margin-bottom: 1.25rem;
}

.activity-content h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
    line-height: 1.3;
}

@media (min-width: 768px) {
    .activity-content h3 {
        font-size: 1.25rem;
    }
}

.activity-description {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 0.75rem;
}

.activity-location {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: #6b7280;
}

.activity-footer {
    display: flex;
    justify-content: flex-end;
}

.activity-join {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.activity-join:hover:not(.disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.activity-join.disabled {
    background: #9ca3af;
    cursor: not-allowed;
    opacity: 0.7;
}

/* Сетка товаров */
.market-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

@media (max-width: 639px) {
    .market-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

@media (min-width: 640px) and (max-width: 767px) {
    .market-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .market-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.product-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #f1f5f9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.product-image {
    position: relative;
    height: 180px;
    overflow: hidden;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
}

@media (min-width: 768px) {
    .product-image {
        height: 200px;
    }
}

.product-price {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 100px;
    font-weight: 700;
    font-size: 1.125rem;
    box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.product-status {
    position: absolute;
    top: 1rem;
    left: 1rem;
}

.status-badge {
    padding: 0.375rem 0.875rem;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    backdrop-filter: blur(4px);
}

.status-badge.new {
    background: rgba(34, 197, 94, 0.9);
}

.status-badge.used {
    background: rgba(249, 115, 22, 0.9);
}

.product-content {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .product-content {
        padding: 1.5rem;
    }
}

.product-content h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
    line-height: 1.3;
}

@media (min-width: 768px) {
    .product-content h3 {
        font-size: 1.25rem;
    }
}

.product-description {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1.25rem;
    flex: 1;
}

.product-meta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.product-seller {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.seller-avatar {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    border-radius: 50%;
    font-weight: 600;
    font-size: 1.125rem;
}

.seller-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    flex: 1;
}

.seller-name {
    font-weight: 600;
    color: #111827;
    font-size: 0.875rem;
}

.seller-rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: #6b7280;
}

.product-action {
    width: 100%;
    padding: 0.75rem;
    background: transparent;
    color: #f97316;
    border: 1.5px solid #f97316;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.product-action:hover {
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>