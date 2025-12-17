<template>
    <header ref="header" :class="[
        'site-header',
        { 'scrolled': !isAtTop },
        { 'mobile-menu-open': isMobileMenuOpen }
    ]">
        <!-- Основная навигационная панель -->
        <div class="header-container">
            <!-- Логотип -->
            <NuxtLink to="/" class="logo">
                <div class="logo-icon">
                    <svg viewBox="0 0 40 40" fill="none">
                        <rect x="0" y="0" width="40" height="40" fill="currentColor" class="logo-outer" />
                        <rect x="10" y="10" width="20" height="20" fill="white" class="logo-inner" />
                    </svg>
                </div>
                <span class="logo-text">
                    <span class="logo-part logo-part-your">Твой</span>
                    <span class="logo-part logo-part-square">Квадрат</span>
                </span>
            </NuxtLink>

            <!-- Основное меню -->
            <nav class="main-nav">
                <div class="nav-item" v-for="item in menuItems" :key="item.id">
                    <button class="nav-link" @click="toggleSubmenu(item.id)" @mouseenter="openSubmenu(item.id)"
                        @mouseleave="closeSubmenuWithDelay">
                        {{ item.title }}
                        <svg class="nav-arrow" :class="{ 'rotated': activeSubmenu === item.id }" width="12" height="12">
                            <path d="M6 9L1 3L11 3Z" fill="currentColor" />
                        </svg>
                    </button>

                    <!-- Выпадающее подменю -->
                    <div v-if="activeSubmenu === item.id" class="submenu" @mouseenter="openSubmenu(item.id)"
                        @mouseleave="closeSubmenuWithDelay">
                        <div class="submenu-content">
                            <div class="submenu-section" v-for="section in item.sections" :key="section.title">
                                <h4 class="submenu-title">{{ section.title }}</h4>
                                <div class="submenu-links">
                                    <NuxtLink v-for="link in section.links" :key="link.name" :to="link.path"
                                        class="submenu-link" @click="closeSubmenu">
                                        <div class="link-icon">
                                            <svg width="20" height="20" fill="none">
                                                <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2" />
                                                <path d="M6 10L9 13L14 7" stroke="currentColor" stroke-width="2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span class="link-title">{{ link.name }}</span>
                                            <p class="link-description">{{ link.description }}</p>
                                        </div>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Действия пользователя -->
            <div class="header-actions">
                <!-- Профиль пользователя (если залогинен) -->
                <div v-if="user" class="user-profile">
                    <div class="profile-dropdown">
                        <button class="profile-button" @click="toggleProfileMenu" ref="profileButton">
                            <div class="avatar">
                                {{ userInitials }}
                            </div>
                            <span class="username">{{ userDisplayName }}</span>
                            <svg class="dropdown-arrow" :class="{ 'rotated': profileMenuOpen }" width="16" height="16"
                                viewBox="0 0 24 24" fill="none">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>

                        <div v-if="profileMenuOpen" class="profile-menu">
                            <div class="profile-info">
                                <div class="profile-info-avatar">
                                    {{ userInitials }}
                                </div>
                                <div class="profile-info-text">
                                    <div class="profile-info-name">{{ userDisplayName }}</div>
                                    <div class="profile-info-email">{{ user.email }}</div>
                                </div>
                            </div>

                            <div class="profile-menu-divider"></div>

                            <NuxtLink to="/profile" class="profile-menu-item" @click="closeProfileMenu">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor"
                                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Мой профиль
                            </NuxtLink>

                            <button class="profile-menu-item logout" @click="handleLogout">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor"
                                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16 17l5-5-5-5" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21 12H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Кнопка входа (если не залогинен) -->
                <NuxtLink v-else to="/login" class="auth-link">
                    Войти
                </NuxtLink>

                <!-- Мобильное меню кнопка -->
                <button class="mobile-menu-toggle" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }"
                    aria-label="Открыть меню">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </div>
        </div>

        <!-- Мобильное меню -->
        <Teleport to="body">
            <Transition name="mobile-menu">
                <div v-if="isMobileMenuOpen" class="mobile-menu-wrapper">
                    <div class="mobile-menu" @click.self="closeMobileMenu">
                        <div class="mobile-menu-container">
                            <div class="mobile-menu-header">
                                <NuxtLink to="/" class="mobile-logo" @click="closeMobileMenu">
                                    <div class="mobile-logo-icon">
                                        <svg viewBox="0 0 40 40" fill="none">
                                            <rect x="0" y="0" width="40" height="40" fill="#f97316" />
                                            <rect x="10" y="10" width="20" height="20" fill="white" />
                                        </svg>
                                    </div>
                                    <div class="mobile-logo-text">
                                        <span class="logo-part-your">Твой</span>
                                        <span class="logo-part-square">Квадрат</span>
                                    </div>
                                </NuxtLink>
                                <button class="mobile-close" @click="closeMobileMenu" aria-label="Закрыть меню">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" />
                                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" />
                                    </svg>
                                </button>
                            </div>

                            <div class="mobile-menu-content">
                                <nav class="mobile-nav">
                                    <div class="mobile-nav-section">
                                        <div class="mobile-nav-item" v-for="item in menuItems" :key="item.id">
                                            <button class="mobile-nav-button" @click="toggleMobileSubmenu(item.id)"
                                                :aria-expanded="activeMobileSubmenu === item.id">
                                                <span class="mobile-nav-button-text">{{ item.title }}</span>
                                                <svg class="mobile-nav-arrow"
                                                    :class="{ 'rotated': activeMobileSubmenu === item.id }" width="20"
                                                    height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>

                                            <Transition name="slide-down">
                                                <div v-if="activeMobileSubmenu === item.id" class="mobile-submenu">
                                                    <div class="mobile-submenu-content">
                                                        <div v-for="section in item.sections" :key="section.title"
                                                            class="mobile-submenu-section">
                                                            <h5 class="mobile-submenu-title">{{ section.title }}</h5>
                                                            <div class="mobile-submenu-links">
                                                                <NuxtLink v-for="link in section.links" :key="link.name"
                                                                    :to="link.path" class="mobile-submenu-link"
                                                                    @click="closeMobileMenu">
                                                                    <div class="mobile-submenu-link-icon">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24"
                                                                            fill="none">
                                                                            <circle cx="12" cy="12" r="10"
                                                                                stroke="#f97316" stroke-width="2" />
                                                                            <path d="M8 12L11 15L16 9" stroke="#f97316"
                                                                                stroke-width="2"
                                                                                stroke-linecap="round" />
                                                                        </svg>
                                                                    </div>
                                                                    <div class="mobile-submenu-link-content">
                                                                        <span class="mobile-submenu-link-title">{{
                                                                            link.name
                                                                            }}</span>
                                                                        <span class="mobile-submenu-link-description"
                                                                            v-if="link.description">
                                                                            {{ link.description }}
                                                                        </span>
                                                                    </div>
                                                                    <svg class="mobile-submenu-link-arrow" width="16"
                                                                        height="16" viewBox="0 0 16 16" fill="none">
                                                                        <path d="M4 8H12M12 8L8 4M12 8L8 12"
                                                                            stroke="currentColor" stroke-width="1.5"
                                                                            stroke-linecap="round"
                                                                            stroke-linejoin="round" />
                                                                    </svg>
                                                                </NuxtLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Transition>
                                        </div>
                                    </div>
                                </nav>

                                <div class="mobile-actions">
                                    <!-- Профиль в мобильном меню -->
                                    <div v-if="user" class="mobile-profile">
                                        <div class="mobile-profile-header">
                                            <div class="mobile-profile-avatar">
                                                {{ userInitials }}
                                            </div>
                                            <div class="mobile-profile-info">
                                                <div class="mobile-profile-name">{{ userDisplayName }}</div>
                                                <div class="mobile-profile-email">{{ user.email }}</div>
                                            </div>
                                        </div>

                                        <div class="mobile-profile-menu">
                                            <NuxtLink to="/profile" class="mobile-profile-menu-item"
                                                @click="closeMobileMenu">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                    <circle cx="12" cy="7" r="4" stroke="currentColor"
                                                        stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                                Мой профиль
                                            </NuxtLink>

                                            <button class="mobile-profile-menu-item logout" @click="handleLogout">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                    <path d="M16 17l5-5-5-5" stroke="currentColor" stroke-width="1.5"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M21 12H9" stroke="currentColor" stroke-width="1.5"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                Выйти
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Кнопка входа в мобильном меню -->
                                    <div v-else class="mobile-auth">
                                        <p class="mobile-auth-title">Уже есть аккаунт?</p>
                                        <NuxtLink to="/login" class="mobile-auth-button" @click="closeMobileMenu">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                class="mobile-auth-icon">
                                                <path
                                                    d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                            <span>Войти в систему</span>
                                        </NuxtLink>
                                    </div>

                                    <div class="mobile-footer">
                                        <div class="mobile-contacts">
                                            <a href="tel:+78001234567" class="mobile-contact-link">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                                <span>8 (800) 123-45-67</span>
                                            </a>
                                            <a href="mailto:info@yoursquare.ru" class="mobile-contact-link">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                    <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="2"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <span>info@yoursquare.ru</span>
                                            </a>
                                        </div>

                                        <div class="mobile-social">
                                            <a href="#" class="mobile-social-link" aria-label="Telegram">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21 5L2 12.5L9 13.5M21 5L15 21L9 13.5M21 5L9 13.5"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                            <a href="#" class="mobile-social-link" aria-label="VK">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                            <a href="#" class="mobile-social-link" aria-label="YouTube">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                    <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Supabase
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Реактивные состояния
const isAtTop = ref(true)
const isMobileMenuOpen = ref(false)
const activeSubmenu = ref(null)
const activeMobileSubmenu = ref(null)
const header = ref(null)
const profileMenuOpen = ref(false)
const profileButton = ref(null)

let submenuCloseTimer = null

// Данные меню
const menuItems = ref([
    {
        id: 'products',
        title: 'Продукты',
        sections: [
            {
                title: 'Основные направления',
                links: [
                    { name: 'Карта мест', description: 'Все на одной карте', path: '/platform' },
                    { name: 'Форум', description: 'Место для обсуждения', path: '/forum' },
                    { name: 'Барахолка квадрата', description: 'Найти то, что нужно именно тебе', path: '/market' },
                    { name: '"Найдись"', description: 'Найди команду или человека', path: '/projects' }
                ]
            },
            {
                title: 'Специализированные',
                links: [
                    { name: 'Мобильные приложения', description: 'iOS и Android', path: '/projects' },
                    { name: 'Разработчикам API', description: 'Интеграции и расширения', path: '/projects/api' },
                    { name: 'Заказ сайта', description: 'Создадим сайт под заказ', path: '/projects' }
                ]
            }
        ]
    },
    {
        id: 'solutions',
        title: 'Решения',
        sections: [
            {
                title: 'По отраслям',
                links: [
                    { name: 'Заказ сайта', path: '/projects' },
                    { name: 'Розничная торговля', path: '/projects' },
                    { name: 'Здравоохранение', path: '/projects' },
                    { name: 'Образование', path: '/projects' }
                ]
            }
        ]
    },
    {
        id: 'resources',
        title: 'Ресурсы',
        sections: [
            {
                title: 'Материалы',
                links: [
                    { name: 'Блог и статьи', path: '/blog' },
                    { name: 'Документация', path: '/docs' },
                    { name: 'Видеоуроки', path: '/tutorials' },
                    { name: 'Кейсы клиентов', path: '/cases' }
                ]
            }
        ]
    },
    {
        id: 'company',
        title: 'Компания',
        sections: [
            {
                title: 'О нас',
                links: [
                    { name: 'Наша команда', path: '/company/team' },
                    { name: 'Карьера', path: '/company/team' },
                    { name: 'Партнёрство', path: '/partners' },
                    { name: 'Контакты', path: '/company/team' }
                ]
            }
        ]
    }
])

// Вычисляемые свойства для пользователя
const userInitials = computed(() => {
    if (!user.value) return ''

    const username = user.value.user_metadata?.username || ''
    const email = user.value.email || ''

    if (username) {
        return username.charAt(0).toUpperCase()
    } else if (email) {
        return email.charAt(0).toUpperCase()
    }

    return 'U'
})

const userDisplayName = computed(() => {
    if (!user.value) return ''

    const username = user.value.user_metadata?.username || ''
    const email = user.value.email || ''

    if (username) {
        return username.length > 15 ? username.substring(0, 12) + '...' : username
    } else if (email) {
        const name = email.split('@')[0]
        return name.length > 15 ? name.substring(0, 12) + '...' : name
    }

    return 'Пользователь'
})

// Обработчики скролла
const handleScroll = () => {
    isAtTop.value = window.scrollY < 50
}

// Мобильное меню
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
        profileMenuOpen.value = false
    } else {
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
        activeMobileSubmenu.value = null
    }
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
    activeMobileSubmenu.value = null
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
}

const toggleMobileSubmenu = (id) => {
    activeMobileSubmenu.value = activeMobileSubmenu.value === id ? null : id
}

// Десктопное меню
const toggleSubmenu = (id) => {
    if (activeSubmenu.value !== id) {
        activeSubmenu.value = id
    } else {
        activeSubmenu.value = null
    }
}

const openSubmenu = (id) => {
    if (submenuCloseTimer) {
        clearTimeout(submenuCloseTimer)
        submenuCloseTimer = null
    }
    activeSubmenu.value = id
}

const closeSubmenu = () => {
    activeSubmenu.value = null
}

const closeSubmenuWithDelay = () => {
    submenuCloseTimer = setTimeout(() => {
        activeSubmenu.value = null
    }, 200)
}

// Профиль меню
const toggleProfileMenu = () => {
    profileMenuOpen.value = !profileMenuOpen.value
    if (profileMenuOpen.value) {
        activeSubmenu.value = null
    }
}

const closeProfileMenu = () => {
    profileMenuOpen.value = false
}

// Выход из системы
const handleLogout = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error

        // Закрываем меню
        if (isMobileMenuOpen.value) {
            closeMobileMenu()
        }
        closeProfileMenu()

        // Перенаправляем на главную
        await navigateTo('/')
    } catch (error) {
        console.error('Ошибка при выходе:', error)
        alert('Не удалось выйти из системы. Попробуйте еще раз.')
    }
}

// Обработка нажатия Escape
const handleEscape = (event) => {
    if (event.key === 'Escape') {
        if (isMobileMenuOpen.value) {
            closeMobileMenu()
        }
        if (profileMenuOpen.value) {
            closeProfileMenu()
        }
    }
}

// Обработка клика вне элементов
const handleClickOutside = (event) => {
    // Закрытие десктопного меню
    if (activeSubmenu.value && !event.target.closest('.nav-item')) {
        closeSubmenu()
    }

    // Закрытие меню профиля
    if (profileMenuOpen.value &&
        profileButton.value &&
        !profileButton.value.contains(event.target) &&
        !event.target.closest('.profile-menu')) {
        closeProfileMenu()
    }
}

// Хуки жизненного цикла
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('keydown', handleEscape)
    handleScroll()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('click', handleClickOutside)
    window.removeEventListener('keydown', handleEscape)
    if (submenuCloseTimer) {
        clearTimeout(submenuCloseTimer)
    }
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
})
</script>

<style scoped>
/* Основные исправления для предотвращения горизонтального скролла */
html,
body {
    overflow-x: hidden;
    max-width: 100vw;
    width: 100%;
}

.site-header {
    position: fixed;
    top: 1.5rem;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    margin: 0 auto;
    max-width: 64rem;
    width: calc(100% - 3rem);
    box-sizing: border-box;
}

.site-header.scrolled {
    max-width: 80rem;
    background: rgba(0, 0, 0, 0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 9999px;
    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.1);
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    position: relative;
    z-index: 10;
    gap: 1rem;
    max-width: 100%;
    box-sizing: border-box;
}

/* Логотип */
.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
    transition: color 0.3s ease;
    color: #000;
    white-space: nowrap;
    flex-shrink: 0;
    min-width: fit-content;
}

.scrolled .logo {
    color: #fff;
}

.logo-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.logo-icon svg {
    color: currentColor;
}

.logo-outer {
    transition: fill 0.3s ease;
}

.scrolled .logo-outer {
    fill: #f97316 !important;
}

.logo-inner {
    transition: fill 0.3s ease;
}

.scrolled .logo-inner {
    fill: #fff !important;
}

.logo-text {
    display: flex;
    gap: 0.25rem;
    flex-shrink: 0;
}

.logo-part {
    transition: color 0.3s ease;
}

.logo-part-your {
    color: #000;
}

.logo-part-square {
    color: #000;
}

.scrolled .logo-part-your {
    color: #f97316;
}

.scrolled .logo-part-square {
    color: #fff;
}

/* Основная навигация */
.main-nav {
    display: none;
    gap: 2rem;
}

@media (min-width: 768px) {
    .main-nav {
        display: flex;
        position: relative;
    }
}

.nav-item {
    position: relative;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    background: none;
    border: none;
    font-size: 0.95rem;
    font-weight: 500;
    color: #4b5563;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.scrolled .nav-link {
    color: rgba(255, 255, 255, 0.9);
}

.nav-link:hover {
    color: #000;
    background: rgba(0, 0, 0, 0.05);
}

.scrolled .nav-link:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
}

.nav-arrow {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
}

.nav-arrow.rotated {
    transform: rotate(180deg);
}

/* Подменю */
.submenu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 560px;
    margin-top: 0.5rem;
    background: #fff;
    border-radius: 1rem;
    box-shadow:
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1001;
}

.scrolled .submenu {
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.submenu-content {
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 100%;
    box-sizing: border-box;
}

.submenu-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 100%;
}

.submenu-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
}

.scrolled .submenu-title {
    color: rgba(255, 255, 255, 0.6);
}

.submenu-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.submenu-link {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem;
    text-decoration: none;
    border-radius: 0.75rem;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 100%;
}

.submenu-link:hover {
    background: #f3f4f6;
    transform: translateX(4px);
}

.scrolled .submenu-link:hover {
    background: rgba(255, 255, 255, 0.1);
}

.link-icon {
    flex-shrink: 0;
    color: #f97316;
    margin-top: 0.125rem;
}

.link-title {
    display: block;
    font-weight: 500;
    color: #111827;
    margin-bottom: 0.25rem;
}

.scrolled .link-title {
    color: #fff;
}

.link-description {
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.4;
    margin: 0;
}

.scrolled .link-description {
    color: rgba(255, 255, 255, 0.7);
}

/* Действия пользователя */
.header-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: auto;
    flex-shrink: 0;
}

/* Профиль пользователя */
.user-profile {
    position: relative;
}

.profile-dropdown {
    position: relative;
}

.profile-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
}

.scrolled .profile-button {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
}

.profile-button:hover {
    border-color: #d1d5db;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scrolled .profile-button:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
    flex-shrink: 0;
}

.username {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.scrolled .username {
    color: white;
}

.dropdown-arrow {
    transition: transform 0.3s ease;
    color: #6b7280;
    flex-shrink: 0;
}

.scrolled .dropdown-arrow {
    color: rgba(255, 255, 255, 0.7);
}

.dropdown-arrow.rotated {
    transform: rotate(180deg);
}

/* Меню профиля */
.profile-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    width: 280px;
    background: white;
    border-radius: 12px;
    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    z-index: 1001;
    overflow: hidden;
    animation: slideDown 0.2s ease;
}

.scrolled .profile-menu {
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
}

.scrolled .profile-info {
    border-bottom-color: rgba(255, 255, 255, 0.1);
}

.profile-info-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
}

.profile-info-text {
    flex: 1;
    min-width: 0;
}

.profile-info-name {
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.scrolled .profile-info-name {
    color: white;
}

.profile-info-email {
    font-size: 0.75rem;
    color: #6b7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.scrolled .profile-info-email {
    color: rgba(255, 255, 255, 0.6);
}

.profile-menu-divider {
    height: 1px;
    background: #f3f4f6;
    margin: 0.25rem 0;
}

.scrolled .profile-menu-divider {
    background: rgba(255, 255, 255, 0.1);
}

.profile-menu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    text-align: left;
    color: #374151;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
}

.scrolled .profile-menu-item {
    color: rgba(255, 255, 255, 0.9);
}

.profile-menu-item:hover {
    background: #f9fafb;
}

.scrolled .profile-menu-item:hover {
    background: rgba(255, 255, 255, 0.1);
}

.profile-menu-item.logout {
    color: #dc2626;
}

.scrolled .profile-menu-item.logout {
    color: #f87171;
}

.profile-menu-item.logout:hover {
    background: #fef2f2;
}

.scrolled .profile-menu-item.logout:hover {
    background: rgba(220, 38, 38, 0.1);
}

/* Кнопка входа */
.auth-link {
    display: none;
    padding: 0.625rem 1.25rem;
    text-decoration: none;
    font-weight: 500;
    border-radius: 0.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    background: white;
    color: #4b5563;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    box-sizing: border-box;
}

.auth-link:hover {
    background: #f9fafb;
    border-color: #d1d5db;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.scrolled .auth-link {
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: #ffffff;
    border: 1px solid #ea580c;
    box-shadow: 0 2px 10px rgba(249, 115, 22, 0.2);
}

.scrolled .auth-link:hover {
    background: linear-gradient(135deg, #ea580c, #c2410c);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

@media (min-width: 768px) {
    .auth-link {
        display: flex;
    }
}

/* Кнопка мобильного меню */
.mobile-menu-toggle {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    z-index: 20;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
}

@media (min-width: 768px) {
    .mobile-menu-toggle {
        display: none;
    }
}

.mobile-menu-toggle .bar {
    width: 24px;
    height: 2px;
    background: #000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
}

.scrolled .mobile-menu-toggle .bar {
    background: #fff;
}

.mobile-menu-toggle.active .bar:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active .bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
}

.mobile-menu-toggle.active .bar:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

/* Мобильное меню */
.mobile-menu-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    width: 100vw;
    overflow: hidden;
}

.mobile-menu {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
}

.mobile-menu-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #ffffff;
    max-width: 100%;
    box-sizing: border-box;
}

.mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    background: #fff;
    flex-shrink: 0;
    max-width: 100%;
}

.mobile-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    max-width: 100%;
    flex-shrink: 1;
}

.mobile-logo-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.mobile-logo-text {
    display: flex;
    gap: 0.25rem;
    flex-shrink: 1;
    min-width: 0;
}

.mobile-logo-text .logo-part-your {
    color: #111827;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mobile-logo-text .logo-part-square {
    color: #111827;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mobile-close {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
}

.mobile-close:hover {
    background: #f8fafc;
    color: #334155;
    transform: rotate(90deg);
}

.mobile-menu-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    padding-bottom: 2rem;
    background: #ffffff;
    max-width: 100%;
    box-sizing: border-box;
}

.mobile-nav {
    flex: 1;
    max-width: 100%;
}

.mobile-nav-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 100%;
}

.mobile-nav-item {
    display: flex;
    flex-direction: column;
    max-width: 100%;
}

.mobile-nav-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;
    width: 100%;
    box-sizing: border-box;
}

.mobile-nav-button:hover {
    background: #f8fafc;
}

.mobile-nav-button-text {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mobile-nav-arrow {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    color: #64748b;
}

.mobile-nav-arrow.rotated {
    transform: rotate(180deg);
    color: #f97316;
}

/* Мобильное подменю */
.mobile-submenu {
    overflow: hidden;
    margin-top: 0.25rem;
    margin-bottom: 0.75rem;
    max-width: 100%;
}

.mobile-submenu-content {
    padding-left: 1.5rem;
    border-left: 2px solid #f1f5f9;
    margin-left: 0.5rem;
    max-width: 100%;
    box-sizing: border-box;
}

.mobile-submenu-section {
    margin-bottom: 1.5rem;
    max-width: 100%;
}

.mobile-submenu-section:last-child {
    margin-bottom: 0;
}

.mobile-submenu-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem 0;
    padding-left: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mobile-submenu-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 100%;
}

.mobile-submenu-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    color: #334155;
    text-decoration: none;
    border-radius: 10px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    max-width: 100%;
    box-sizing: border-box;
}

.mobile-submenu-link:hover {
    background: #f8fafc;
    transform: translateX(4px);
}

.mobile-submenu-link-icon {
    flex-shrink: 0;
    color: #f97316;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mobile-submenu-link-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
}

.mobile-submenu-link-title {
    font-weight: 600;
    font-size: 0.95rem;
    color: #1e293b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mobile-submenu-link-description {
    font-size: 0.75rem;
    color: #64748b;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.mobile-submenu-link-arrow {
    flex-shrink: 0;
    color: #cbd5e1;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-submenu-link:hover .mobile-submenu-link-arrow {
    color: #94a3b8;
    transform: translateX(3px);
}

/* Мобильный профиль */
.mobile-profile {
    background: #f8fafc;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 1.5rem;
}

.mobile-profile-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: white;
}

.mobile-profile-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.125rem;
    flex-shrink: 0;
}

.mobile-profile-info {
    flex: 1;
    min-width: 0;
}

.mobile-profile-name {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mobile-profile-email {
    font-size: 0.875rem;
    color: #64748b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mobile-profile-menu {
    padding: 0.5rem;
}

.mobile-profile-menu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.875rem 1rem;
    background: none;
    border: none;
    text-align: left;
    color: #334155;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    border-radius: 8px;
}

.mobile-profile-menu-item:hover {
    background: white;
}

.mobile-profile-menu-item.logout {
    color: #dc2626;
}

.mobile-profile-menu-item.logout:hover {
    background: #fef2f2;
}

/* Мобильные действия */
.mobile-actions {
    margin-top: auto;
    padding-top: 2rem;
    border-top: 1px solid #f1f5f9;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: #ffffff;
    max-width: 100%;
}

.mobile-auth {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 100%;
}

.mobile-auth-title {
    font-size: 0.875rem;
    color: #64748b;
    text-align: center;
    margin: 0;
}

.mobile-auth-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    text-decoration: none;
    font-weight: 600;
    border-radius: 12px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
    max-width: 100%;
    box-sizing: border-box;
}

.mobile-auth-button:hover {
    background: linear-gradient(135deg, #ea580c, #c2410c);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}

.mobile-auth-icon {
    flex-shrink: 0;
}

.mobile-footer {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 100%;
}

.mobile-contacts {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 100%;
}

.mobile-contact-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #475569;
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 100%;
    min-width: 0;
}

.mobile-contact-link span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mobile-contact-link:hover {
    color: #f97316;
    transform: translateX(2px);
}

.mobile-social {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 100%;
}

.mobile-social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: #475569;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
}

.mobile-social-link:hover {
    color: #f97316;
    background: #fff7ed;
    transform: translateY(-3px) scale(1.1);
}

/* Анимации */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from .mobile-menu,
.mobile-menu-leave-to .mobile-menu {
    transform: translateX(100%);
    opacity: 0;
}

.mobile-menu-enter-to .mobile-menu,
.mobile-menu-leave-from .mobile-menu {
    transform: translateX(0);
    opacity: 1;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-8px);
}

.slide-down-enter-to,
.slide-down-leave-from {
    max-height: 800px;
    opacity: 1;
    transform: translateY(0);
}

@keyframes fadeInContent {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Адаптивные стили */
@media (max-width: 767px) {
    .site-header {
        width: calc(100% - 1rem);
        top: 0.5rem;
        max-width: none;
        left: 0.5rem;
        right: 0.5rem;
        margin: 0;
    }

    .header-container {
        padding: 0.75rem 1rem;
        gap: 0.75rem;
    }

    .username {
        max-width: 80px;
    }
}

@media (max-width: 480px) {
    .logo {
        flex-shrink: 1;
        min-width: 0;
    }

    .logo-text {
        min-width: 0;
    }

    .logo-part {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .header-container {
        padding: 0.5rem 0.75rem;
    }

    .mobile-menu {
        max-width: 100%;
    }

    .mobile-submenu-content {
        padding-left: 1rem;
    }

    .username {
        max-width: 60px;
        font-size: 0.75rem;
    }

    .profile-button {
        padding: 0.375rem 0.5rem;
    }

    .avatar {
        width: 28px;
        height: 28px;
        font-size: 0.75rem;
    }
}

@media (max-width: 360px) {
    .logo-part-your {
        display: none;
    }

    .header-container {
        padding: 0.5rem;
        gap: 0.5rem;
    }

    .site-header {
        width: calc(100% - 0.5rem);
        left: 0.25rem;
        right: 0.25rem;
    }

    .username {
        display: none;
    }

    .profile-button {
        padding: 0.25rem;
    }
}

/* Минимальная ширина для логотипа */
.logo {
    min-width: 120px;
}

/* Отступ для контента под фиксированной шапкой */
.site-header+* {
    margin-top: 6rem;
    padding-top: 1rem;
}

/* Предотвращаем горизонтальный скролл */
main {
    overflow-x: hidden;
    max-width: 100vw;
    width: 100%;
}

/* Фикс для Safari */
@supports (-webkit-touch-callout: none) {
    .site-header {
        -webkit-backdrop-filter: blur(10px);
    }

    .site-header.scrolled {
        -webkit-backdrop-filter: blur(20px);
    }
}
</style>
