<template>
    <div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
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

                    <!-- Профиль пользователя -->
                    <div class="flex items-center gap-3">
                        <!-- Виджет уведомлений -->
                        <NotificationsWidget v-if="user" />

                        <div v-if="user" class="flex items-center gap-3">
                            <div class="relative group">
                                <div
                                    class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20">
                                    {{ getUserInitials() }}
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
                    Для участия в форуме необходимо войти в систему.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <NuxtLink to="/login"
                        class="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
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
                                    <!-- Избранное -->
                                    <div class="flex items-center gap-2">
                                        <button @click="toggleFavorite(post)" :class="[
                                            'flex items-center gap-2 transition-colors',
                                            post.isFavorited ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
                                        ]">
                                            <svg :class="['w-5 h-5', post.isFavorited ? 'fill-orange-500' : 'fill-none']"
                                                stroke-width="2" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                            <span class="font-medium">{{ post.favorites_count }}</span>
                                        </button>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span class="font-medium text-gray-400">{{ post.views_count || 0 }}</span>
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
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const posts = ref([])
const loading = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const activeTab = ref('all')

const newPost = ref({
    title: '',
    content: ''
})

const tabs = [
    { id: 'all', label: 'Все обсуждения' },
    { id: 'popular', label: 'Популярные' },
    { id: 'my', label: 'Мои обсуждения' }
]

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

const getUserInitials = () => {
    if (!user.value?.user_metadata?.name) return 'А'
    return user.value.user_metadata.name.charAt(0).toUpperCase()
}

const getUserName = () => {
    if (user.value?.user_metadata?.name) {
        return user.value.user_metadata.name
    }
    return user.value?.email?.split('@')[0] || 'Пользователь'
}

const getFullUserName = () => {
    const userData = user.value
    if (!userData) return 'Пользователь'

    if (userData.user_metadata?.name) {
        return userData.user_metadata.name
    }
    return userData.email?.split('@')[0] || 'Пользователь'
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)

    if (minutes < 60) {
        return `${minutes} мин назад`
    } else if (minutes < 1440) {
        return `${Math.floor(minutes / 60)} ч назад`
    } else {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long'
        })
    }
}

const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

const performSearch = async () => {
    if (!searchQuery.value.trim()) {
        searchResults.value = []
        return
    }

    try {
        const { data, error } = await supabase
            .from('forum_posts')
            .select('id, title, content, author_name')
            .ilike('title', `%${searchQuery.value}%`)
            .limit(10)

        if (error) throw error
        searchResults.value = data || []
    } catch (error) {
        console.error('Ошибка поиска:', error)
        searchResults.value = []
    }
}

const debouncedSearch = debounce(performSearch, 300)

const loadPosts = async () => {
    loading.value = true
    try {
        const { data, error } = await supabase
            .from('forum_posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        const postsWithFavorites = await Promise.all(
            (data || []).map(async (post) => {
                if (user.value) {
                    const { data: favoriteData } = await supabase
                        .from('forum_favorites')
                        .select('id')
                        .eq('post_id', post.id)
                        .eq('user_id', user.value.id)
                        .single()

                    return {
                        ...post,
                        isFavorited: !!favoriteData
                    }
                }
                return post
            })
        )

        posts.value = postsWithFavorites

    } catch (error) {
        console.error('Ошибка загрузки:', error)
    } finally {
        loading.value = false
    }
}

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

        newPost.value = { title: '', content: '' }
        await loadPosts()

    } catch (error) {
        console.error('Ошибка создания:', error)
    } finally {
        loading.value = false
    }
}

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

const toggleFavorite = async (post) => {
    if (!user.value) return

    try {
        if (post.isFavorited) {
            const { error } = await supabase
                .from('forum_favorites')
                .delete()
                .eq('post_id', post.id)
                .eq('user_id', user.value.id)

            if (error) throw error

            post.favorites_count = Math.max(0, post.favorites_count - 1)
            post.isFavorited = false

        } else {
            const { error } = await supabase
                .from('forum_favorites')
                .insert({
                    post_id: post.id,
                    user_id: user.value.id
                })

            if (error) throw error

            post.favorites_count = (post.favorites_count || 0) + 1
            post.isFavorited = true

            if (post.author_id !== user.value.id) {
                await supabase
                    .from('forum_notifications')
                    .insert({
                        user_id: post.author_id,
                        post_id: post.id,
                        sender_id: user.value.id,
                        sender_name: getFullUserName(),
                        type: 'favorite',
                        message: `${getFullUserName()} добавил(а) ваше обсуждение "${post.title}" в избранное`
                    })
            }
        }

        if (activeTab.value === 'popular') {
            posts.value = [...posts.value].sort((a, b) => b.favorites_count - a.favorites_count)
        }

    } catch (error) {
        console.error('Ошибка избранного:', error)
    }
}

const handleLogout = async () => {
    try {
        await supabase.auth.signOut()
        navigateTo('/login')
    } catch (error) {
        console.error('Ошибка выхода:', error)
    }
}

const setupRealtime = () => {
    if (!user.value) return

    const postsChannel = supabase
        .channel('forum_posts_realtime')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'forum_posts'
            },
            async (payload) => {
                if (user.value) {
                    const { data: favoriteData } = await supabase
                        .from('forum_favorites')
                        .select('id')
                        .eq('post_id', payload.new.id)
                        .eq('user_id', user.value.id)
                        .single()

                    posts.value.unshift({
                        ...payload.new,
                        isFavorited: !!favoriteData
                    })
                }
            }
        )
        .on(
            'postgres_changes',
            {
                event: 'DELETE',
                schema: 'public',
                table: 'forum_posts'
            },
            (payload) => {
                posts.value = posts.value.filter(post => post.id !== payload.old.id)
            }
        )
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'forum_posts'
            },
            (payload) => {
                const index = posts.value.findIndex(p => p.id === payload.new.id)
                if (index !== -1) {
                    posts.value[index] = { ...posts.value[index], ...payload.new }
                }
            }
        )
        .subscribe()
}

onMounted(() => {
    if (user.value) {
        loadPosts()
        setupRealtime()
    }
})
</script>