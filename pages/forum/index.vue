<template>
    <div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
        <!-- Декоративные элементы -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-orange-600/5 rounded-full blur-3xl">
            </div>
            <div
                class="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-r from-orange-600/5 to-orange-400/10 rounded-full blur-3xl">
            </div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Хедер -->
            <header class="mb-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div class="flex-1">
                        <h1 class="text-4xl md:text-5xl font-bold mb-3">
                            <span class="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Форум сообщества
                            </span>
                        </h1>
                        <p class="text-gray-400 text-lg">
                            Обсуждайте, делитесь опытом и находите ответы
                        </p>
                    </div>

                    <!-- Уведомления и профиль -->
                    <div class="flex items-center gap-3">
                        <!-- Виджет уведомлений -->
                        <NotificationsWidget v-if="user" />

                        <!-- Профиль пользователя -->
                        <div v-if="user" class="flex items-center gap-3">
                            <div class="relative group">
                                <div
                                    class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20">
                                    {{ getUserInitials() }}
                                </div>
                                <div
                                    class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap border border-gray-700">
                                    {{ getUserName() }}
                                </div>
                            </div>
                            <button @click="handleLogout"
                                class="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl border border-gray-700 transition-all duration-300 font-medium">
                                Выйти
                            </button>
                        </div>

                        <NuxtLink v-else to="/login"
                            class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                            Войти
                        </NuxtLink>
                    </div>
                </div>

                <!-- Поиск и фильтры -->
                <div class="mb-8">
                    <div class="flex flex-col md:flex-row gap-4">
                        <!-- Поле поиска -->
                        <div class="flex-1 relative">
                            <div class="relative">
                                <input v-model="searchQuery" @input="debouncedSearch" type="text"
                                    placeholder="Поиск по названию обсуждения..."
                                    class="w-full px-5 py-3.5 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 text-lg placeholder-gray-500" />
                                <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <!-- Результаты поиска -->
                            <div v-if="searchResults.length > 0 && searchQuery"
                                class="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
                                <div v-for="result in searchResults" :key="result.id"
                                    class="p-4 border-b border-gray-800 hover:bg-gray-800 cursor-pointer transition-colors"
                                    @click="goToPost(result.id)">
                                    <div class="font-medium text-white">{{ result.title }}</div>
                                    <div class="text-sm text-gray-400 mt-1 line-clamp-2">{{ result.content }}</div>
                                    <div class="text-xs text-gray-500 mt-2">Автор: {{ result.author_name }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Табы -->
                        <div class="flex gap-2 overflow-x-auto pb-2">
                            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                                'px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-300',
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                            ]">
                                {{ tab.label }}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Контент для незарегистрированных -->
            <div v-if="!user"
                class="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-2xl p-8 md:p-12 text-center">
                <div
                    class="w-24 h-24 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/20">
                    <svg class="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
                    Присоединяйтесь к обсуждениям
                </h2>
                <p class="text-gray-400 mb-8 max-w-md mx-auto">
                    Для участия в форуме необходимо войти в систему. Задавайте вопросы, делитесь опытом и находите
                    решения вместе с сообществом.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <NuxtLink to="/login"
                        class="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center justify-center gap-2">
                        Войти в систему
                    </NuxtLink>
                    <NuxtLink to="/register"
                        class="px-8 py-3.5 bg-gray-800 text-orange-500 border-2 border-orange-500 rounded-xl hover:bg-gray-700 transition-all duration-300 font-medium">
                        Зарегистрироваться
                    </NuxtLink>
                </div>
            </div>

            <!-- Контент для зарегистрированных -->
            <div v-else class="space-y-8">
                <!-- Форма создания поста -->
                <div class="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-xl p-6">
                    <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Создать новое обсуждение
                    </h3>
                    <div class="space-y-4">
                        <input v-model="newPost.title" type="text" placeholder="Что хотите обсудить?"
                            class="w-full px-5 py-3.5 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 text-lg placeholder-gray-500 text-white" />
                        <textarea v-model="newPost.content" placeholder="Подробное описание..." rows="4"
                            class="w-full px-5 py-3.5 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 resize-none placeholder-gray-500 text-white"></textarea>
                        <div class="flex justify-between items-center">
                            <div class="text-sm text-gray-400">
                                Будьте вежливы и уважайте мнение других участников
                            </div>
                            <button @click="createPost" :disabled="!canCreatePost" :class="[
                                'px-8 py-3.5 rounded-xl font-medium transition-all duration-300',
                                canCreatePost
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
                                    : 'bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700'
                            ]">
                                {{ loading ? 'Создание...' : 'Создать тему' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Список постов -->
                <div v-if="loading" class="text-center py-12">
                    <svg class="animate-spin h-12 w-12 text-orange-500 mx-auto" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <p class="mt-4 text-gray-400">Загружаем обсуждения...</p>
                </div>

                <div v-else-if="filteredPosts.length === 0"
                    class="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-lg p-12 text-center">
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/20">
                        <svg class="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-3">Нет обсуждений</h3>
                    <p class="text-gray-400 mb-6">Будьте первым, кто создаст тему для обсуждения!</p>
                </div>

                <div v-else class="space-y-4">
                    <div v-for="post in filteredPosts" :key="post.id"
                        class="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-lg hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 overflow-hidden group">
                        <div class="p-6 md:p-8">
                            <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                <div class="flex-1">
                                    <NuxtLink :to="`/forum/${post.id}`" class="block">
                                        <h3
                                            class="text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                                            {{ post.title }}
                                        </h3>
                                    </NuxtLink>
                                    <div class="flex items-center gap-3 mb-4">
                                        <div
                                            class="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {{ post.author_name.charAt(0).toUpperCase() }}
                                        </div>
                                        <div>
                                            <div class="font-medium text-white">{{ post.author_name }}</div>
                                            <div class="text-sm text-gray-400">{{ formatDate(post.created_at) }}</div>
                                        </div>
                                    </div>
                                    <p class="text-gray-300 text-lg leading-relaxed line-clamp-2 mb-4">{{ post.content
                                        }}</p>
                                </div>

                                <!-- Статистика -->
                                <div class="flex md:flex-col gap-4 md:gap-2">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span class="font-medium text-white">{{ post.favorites_count }}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span class="font-medium text-gray-400">{{ post.views_count }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Действия -->
                            <div
                                class="flex flex-wrap justify-between items-center pt-6 border-t border-gray-800 gap-4">
                                <div class="flex items-center gap-4">
                                    <NuxtLink :to="`/forum/${post.id}`"
                                        class="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        Обсудить
                                    </NuxtLink>
                                </div>

                                <div class="flex items-center gap-3">
                                    <button v-if="post.author_id === user.id" @click="deletePost(post)"
                                        class="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors font-medium">
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { debounce } from 'lodash-es'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// Инициализация данных
const posts = ref([])
const loading = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const activeTab = ref('all') // all, popular, my

const newPost = ref({
    title: '',
    content: ''
})

const tabs = [
    { id: 'all', label: 'Все обсуждения' },
    { id: 'popular', label: 'Популярные' },
    { id: 'my', label: 'Мои обсуждения' }
]

// Computed свойства
const filteredPosts = computed(() => {
    if (activeTab.value === 'my') {
        return posts.value.filter(post => post.author_id === user.value?.id)
    } else if (activeTab.value === 'popular') {
        return [...posts.value].sort((a, b) => b.favorites_count - a.favorites_count)
    }
    return posts.value
})

const canCreatePost = computed(() => {
    return newPost.value.title.trim() && newPost.value.content.trim() && !loading.value
})

// Функции для получения имени пользователя
const getUserName = () => {
    if (user.value?.user_metadata?.name) {
        return user.value.user_metadata.name
    }
    return user.value?.email?.split('@')[0] || 'Пользователь'
}

const getUserInitials = () => {
    const name = getUserName()
    return name.charAt(0).toUpperCase()
}

const getFullUserName = () => {
    const userData = user.value
    if (!userData) return 'Пользователь'

    if (userData.user_metadata?.name) {
        return userData.user_metadata.name
    }
    if (userData.user_metadata?.full_name) {
        return userData.user_metadata.full_name
    }

    return userData.email?.split('@')[0] || 'Пользователь'
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 60) {
        return `${minutes} мин назад`
    } else if (hours < 24) {
        return `${hours} ч назад`
    } else if (days < 7) {
        return `${days} дн назад`
    } else {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long'
        })
    }
}

// Поиск обсуждений
const debouncedSearch = debounce(async () => {
    if (!searchQuery.value.trim()) {
        searchResults.value = []
        return
    }

    try {
        const { data, error } = await supabase
            .from('forum_posts')
            .select('id, title, content, author_name')
            .textSearch('search_vector', searchQuery.value, {
                type: 'websearch',
                config: 'russian'
            })
            .limit(10)

        if (error) throw error
        searchResults.value = data || []
    } catch (error) {
        console.error('Ошибка поиска:', error)
        searchResults.value = []
    }
}, 300)

const goToPost = (postId) => {
    searchQuery.value = ''
    searchResults.value = []
    router.push(`/forum/${postId}`)
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

    } catch (error) {
        console.error('Ошибка загрузки:', error)
    } finally {
        loading.value = false
    }
}

// Создание поста
const createPost = async () => {
    if (!canCreatePost.value) return

    loading.value = true
    try {
        const authorName = getFullUserName()

        const { error } = await supabase
            .from('forum_posts')
            .insert({
                title: newPost.value.title,
                content: newPost.value.content,
                author_id: user.value.id,
                author_name: authorName
            })

        if (error) throw error

        // Очистка формы и обновление
        newPost.value = { title: '', content: '' }
        await loadPosts()

    } catch (error) {
        console.error('Ошибка создания:', error)
    } finally {
        loading.value = false
    }
}

// Удаление поста
const deletePost = async (post) => {
    if (!confirm('Удалить это обсуждение?')) return

    try {
        const { error } = await supabase
            .from('forum_posts')
            .delete()
            .eq('id', post.id)
            .eq('author_id', user.value.id)

        if (error) throw error

        await loadPosts()

    } catch (error) {
        console.error('Ошибка удаления:', error)
    }
}

// Выход
const handleLogout = async () => {
    try {
        await supabase.auth.signOut()
        navigateTo('/login')
    } catch (error) {
        console.error('Ошибка выхода:', error)
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