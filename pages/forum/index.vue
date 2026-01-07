<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <!-- Декоративные элементы -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-indigo-300/10 rounded-full blur-3xl">
            </div>
            <div
                class="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-200/10 to-blue-200/20 rounded-full blur-3xl">
            </div>
            <div
                class="absolute -bottom-40 right-1/3 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-400/5 rounded-full blur-3xl">
            </div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Хедер -->
            <header class="mb-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 class="text-4xl font-bold text-gray-900 mb-3">
                            Форум сообщества
                            <span class="block text-xl font-normal text-gray-600 mt-2">
                                Место для обсуждений и обмена знаниями
                            </span>
                        </h1>
                    </div>

                    <div v-if="user" class="flex items-center gap-4">
                        <div
                            class="hidden md:flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
                            <div
                                class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {{ getUserInitials(user) }}
                            </div>
                            <div>
                                <div class="font-medium text-gray-800">{{ getUserDisplayName(user) }}</div>
                                <div class="text-xs text-gray-500">Участник</div>
                            </div>
                        </div>
                        <button @click="handleLogout"
                            class="px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                            Выйти
                        </button>
                    </div>

                    <NuxtLink v-else to="/login"
                        class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                        Войти на форум
                    </NuxtLink>
                </div>
            </header>

            <!-- Основной контент -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Левая панель -->
                <div class="lg:col-span-1 space-y-6">
                    <!-- Форма создания поста -->
                    <div v-if="user" class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4">Новая тема</h3>
                        <div class="space-y-4">
                            <div>
                                <input v-model="newPost.title" type="text" placeholder="Заголовок темы"
                                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />
                            </div>
                            <div>
                                <textarea v-model="newPost.content" placeholder="Подробное описание..." rows="4"
                                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none"></textarea>
                            </div>
                            <button @click="createPost"
                                :disabled="!newPost.title.trim() || !newPost.content.trim() || loading"
                                class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium flex items-center justify-center gap-2">
                                <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                {{ loading ? 'Создание...' : 'Создать тему' }}
                            </button>
                        </div>
                    </div>

                    <!-- Статистика -->
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4">Статистика</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Тем</span>
                                <span class="font-bold text-gray-900">{{ posts.length }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Участников</span>
                                <span class="font-bold text-gray-900">{{ userCount }}</span>
                            </div>
                            <div v-if="user" class="flex justify-between items-center">
                                <span class="text-gray-600">Ваших тем</span>
                                <span class="font-bold text-blue-600">{{ userPostsCount }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Правила -->
                    <div
                        class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                        <h3 class="text-lg font-bold text-gray-900 mb-3">Правила форума</h3>
                        <ul class="space-y-2 text-sm text-gray-600">
                            <li class="flex items-start gap-2">
                                <svg class="w-4 h-4 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                Уважайте других участников
                            </li>
                            <li class="flex items-start gap-2">
                                <svg class="w-4 h-4 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                Без оскорблений и спама
                            </li>
                            <li class="flex items-start gap-2">
                                <svg class="w-4 h-4 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                Сохраняйте тематичность
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Список постов -->
                <div class="lg:col-span-3">
                    <!-- Фильтры -->
                    <div class="mb-6 flex flex-wrap gap-3">
                        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                            'px-4 py-2 rounded-xl font-medium transition-all duration-300',
                            activeTab === tab.id
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                        ]">
                            {{ tab.label }}
                        </button>
                    </div>

                    <!-- Сообщение для незарегистрированных -->
                    <div v-if="!user"
                        class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200 rounded-2xl p-8 text-center">
                        <div
                            class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Доступ ограничен</h3>
                        <p class="text-gray-600 mb-6">Для просмотра и участия в обсуждениях необходимо войти в систему
                        </p>
                        <NuxtLink to="/login"
                            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                            Войти на форум
                        </NuxtLink>
                    </div>

                    <!-- Список тем (только для зарегистрированных) -->
                    <div v-else-if="filteredPosts.length > 0" class="space-y-4">
                        <div v-for="post in filteredPosts" :key="post.id"
                            class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                            <div class="p-6">
                                <div class="flex items-start justify-between gap-4 mb-4">
                                    <div class="flex-1">
                                        <h3
                                            class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {{ post.title }}
                                        </h3>
                                        <p class="text-gray-600 line-clamp-2">{{ post.content }}</p>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div
                                            class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {{ getUserInitials({ email: post.author_email }) }}
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div class="flex items-center gap-4">
                                        <div class="flex items-center gap-2 text-sm text-gray-500">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {{ formatDate(post.created_at) }}
                                        </div>
                                        <div class="flex items-center gap-2 text-sm text-gray-500">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {{ post.author_email }}
                                        </div>
                                    </div>

                                    <NuxtLink :to="`/forum/${post.id}`"
                                        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                                        Обсудить
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Пустой список -->
                    <div v-else-if="user && filteredPosts.length === 0" class="text-center py-12">
                        <div
                            class="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Еще нет тем</h3>
                        <p class="text-gray-600 mb-4">Будьте первым, кто создаст обсуждение</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Проверка авторизации - если нет пользователя, редирект через middleware
if (!user.value) {
    // Middleware уже должен был редиректнуть, но на всякий случай:
    navigateTo('/login?redirect=/forum')
}

const posts = ref([])
const loading = ref(false)
const activeTab = ref('all')
const userCount = ref(0)
const userPostsCount = ref(0)

const newPost = ref({
    title: '',
    content: ''
})

const tabs = [
    { id: 'all', label: 'Все темы' },
    { id: 'popular', label: 'Популярные' },
    { id: 'my', label: 'Мои темы' }
]

const filteredPosts = computed(() => {
    if (!user.value) return []

    if (activeTab.value === 'my') {
        return posts.value.filter(post => post.author_email === user.value.email)
    }
    return posts.value
})

// Функции для работы с пользователем
const getUserInitials = (userData) => {
    if (!userData?.email) return 'А'
    const email = userData.email
    return email.charAt(0).toUpperCase()
}

const getUserDisplayName = (userData) => {
    if (!userData?.email) return 'Пользователь'
    return userData.email.split('@')[0]
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}

// Загрузка постов
const loadPosts = async () => {
    loading.value = true
    try {
        const { data, error } = await supabase
            .from('forum_posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        posts.value = data || []

        // Подсчет постов пользователя
        userPostsCount.value = posts.value.filter(post =>
            post.author_email === user.value?.email
        ).length

        // Получение количества уникальных пользователей
        const uniqueUsers = new Set(posts.value.map(post => post.author_email))
        userCount.value = uniqueUsers.size

    } catch (error) {
        console.error('Ошибка при загрузке постов:', error)
    } finally {
        loading.value = false
    }
}

// Создание поста
const createPost = async () => {
    if (!user.value || !newPost.value.title.trim() || !newPost.value.content.trim()) return

    loading.value = true
    try {
        const { error } = await supabase
            .from('forum_posts')
            .insert({
                title: newPost.value.title,
                content: newPost.value.content,
                author_email: user.value.email,
                created_at: new Date().toISOString()
            })

        if (error) throw error

        // Очистка формы и обновление списка
        newPost.value = { title: '', content: '' }
        await loadPosts()

    } catch (error) {
        console.error('Ошибка при создании поста:', error)
        alert('Не удалось создать тему. Попробуйте еще раз.')
    } finally {
        loading.value = false
    }
}

// Выход
const handleLogout = async () => {
    try {
        await supabase.auth.signOut()
        navigateTo('/login')
    } catch (error) {
        console.error('Ошибка при выходе:', error)
    }
}

// Инициализация
onMounted(() => {
    if (user.value) {
        loadPosts()
    }
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>