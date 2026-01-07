<template>
    <div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
        <!-- Декоративные элементы -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-orange-600/5 rounded-full blur-3xl">
            </div>
            <div
                class="absolute bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-orange-600/5 to-orange-400/10 rounded-full blur-3xl">
            </div>
        </div>

        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Навигация -->
            <div class="mb-8">
                <NuxtLink to="/forum"
                    class="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Назад к форуму
                </NuxtLink>
            </div>

            <!-- Загрузка -->
            <div v-if="loading" class="text-center py-12">
                <svg class="animate-spin h-12 w-12 text-orange-500 mx-auto" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <p class="mt-4 text-gray-400">Загружаем обсуждение...</p>
            </div>

            <!-- Обсуждение не найдено -->
            <div v-else-if="!post" class="text-center py-12">
                <div
                    class="w-20 h-20 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/20">
                    <svg class="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-3">Обсуждение не найдено</h3>
                <p class="text-gray-400 mb-6">Возможно, оно было удалено</p>
                <NuxtLink to="/forum"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium">
                    Вернуться на форум
                </NuxtLink>
            </div>

            <!-- Контент обсуждения -->
            <div v-else>
                <!-- Заголовок и метаданные -->
                <div class="mb-8">
                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-6">{{ post.title }}</h1>

                    <div class="flex flex-wrap items-center gap-4 mb-6">
                        <!-- Автор -->
                        <div class="flex items-center gap-3">
                            <div
                                class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {{ post.author_name.charAt(0).toUpperCase() }}
                            </div>
                            <div>
                                <div class="font-medium text-white">{{ post.author_name }}</div>
                                <div class="text-sm text-gray-400">{{ formatDate(post.created_at) }}</div>
                            </div>
                        </div>

                        <!-- Статистика -->
                        <div class="flex items-center gap-4 ml-auto">
                            <div class="flex items-center gap-2">
                                <button @click="toggleFavorite" :class="[
                                    'flex items-center gap-2 transition-colors',
                                    isFavorited ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
                                ]">
                                    <svg :class="['w-5 h-5', isFavorited ? 'fill-orange-500' : 'fill-none']"
                                        stroke-width="2" viewBox="0 0 24 24">
                                        <path
                                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span class="font-medium">{{ post.favorites_count }}</span>
                                </button>
                            </div>
                            <div class="flex items-center gap-2 text-gray-400">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{{ post.views_count || 0 }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Содержание -->
                <div class="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-xl p-6 mb-8">
                    <div class="prose prose-invert max-w-none">
                        <p class="text-lg text-gray-300 whitespace-pre-line">{{ post.content }}</p>
                    </div>
                </div>

                <!-- Комментарии -->
                <div class="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-xl p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-white">
                            Комментарии
                            <span class="text-gray-400 text-lg font-normal ml-2">({{ comments.length }})</span>
                        </h2>
                    </div>

                    <!-- Форма добавления комментария -->
                    <div v-if="user" class="mb-8">
                        <div class="flex gap-4">
                            <div
                                class="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                {{ getUserInitials() }}
                            </div>
                            <div class="flex-1">
                                <textarea v-model="newComment.content" @keydown.enter.ctrl="addComment"
                                    placeholder="Напишите комментарий..." rows="3"
                                    class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none placeholder-gray-500 text-white"></textarea>
                                <div class="flex justify-between items-center mt-3">
                                    <div class="text-sm text-gray-400">
                                        Ctrl+Enter для отправки
                                    </div>
                                    <button @click="addComment" :disabled="!newComment.content.trim()" :class="[
                                        'px-5 py-2.5 rounded-xl font-medium transition-all duration-300',
                                        newComment.content.trim()
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
                                            : 'bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700'
                                    ]">
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Список комментариев -->
                    <div v-if="commentsLoading" class="text-center py-8">
                        <svg class="animate-spin h-8 w-8 text-orange-500 mx-auto" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </div>

                    <div v-else-if="comments.length === 0" class="text-center py-8">
                        <svg class="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <p class="text-gray-400">Пока нет комментариев. Будьте первым!</p>
                    </div>

                    <div v-else class="space-y-6">
                        <CommentItem v-for="comment in rootComments" :key="comment.id" :comment="comment"
                            :replies="getReplies(comment.id)" :current-user-id="user?.id" @reply="handleReply"
                            @delete="deleteComment" class="animate-fade-in" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Попап для ответа -->
        <div v-if="showReplyPopup" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeReplyPopup"></div>

            <div class="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md">
                <div class="p-6 border-b border-gray-800">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-bold text-white">
                            Ответ пользователю {{ replyToComment?.author_name }}
                        </h3>
                        <button @click="closeReplyPopup" class="p-1 text-gray-400 hover:text-white transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="p-6">
                    <div class="mb-4 p-3 bg-gray-800 rounded-xl">
                        <p class="text-sm text-gray-300">{{ replyToComment?.content }}</p>
                    </div>

                    <textarea v-model="replyContent" ref="replyTextarea" placeholder="Ваш ответ..." rows="4"
                        class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none placeholder-gray-500 text-white"
                        @keydown.enter.ctrl="submitReply"></textarea>

                    <div class="flex justify-between items-center mt-4">
                        <div class="text-sm text-gray-400">
                            Ctrl+Enter для отправки
                        </div>
                        <div class="flex gap-3">
                            <button @click="closeReplyPopup"
                                class="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                                Отмена
                            </button>
                            <button @click="submitReply" :disabled="!replyContent.trim()" :class="[
                                'px-5 py-2 rounded-xl font-medium transition-all duration-300',
                                replyContent.trim()
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                                    : 'bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700'
                            ]">
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const post = ref(null)
const loading = ref(true)
const comments = ref([])
const commentsLoading = ref(false)
const isFavorited = ref(false)
const showReplyPopup = ref(false)
const replyToComment = ref(null)
const replyContent = ref('')
const replyTextarea = ref(null)

const newComment = ref({
    content: '',
    parent_id: null
})

// Computed свойства
const rootComments = computed(() => {
    return comments.value.filter(comment => !comment.parent_id)
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
            month: 'long',
            year: 'numeric'
        })
    }
}

// Функции
const getReplies = (parentId) => {
    return comments.value.filter(comment => comment.parent_id === parentId)
}

const loadPost = async () => {
    loading.value = true
    try {
        const postId = route.params.id

        // Увеличиваем счетчик просмотров
        await supabase
            .from('forum_posts')
            .update({ views_count: (post.value?.views_count || 0) + 1 })
            .eq('id', postId)

        // Загружаем пост
        const { data, error } = await supabase
            .from('forum_posts')
            .select('*')
            .eq('id', postId)
            .single()

        if (error) throw error
        post.value = data

        // Проверяем, добавлен ли в избранное
        if (user.value) {
            const { data: favoriteData } = await supabase
                .from('forum_favorites')
                .select('id')
                .eq('post_id', postId)
                .eq('user_id', user.value.id)
                .single()

            isFavorited.value = !!favoriteData
        }

        // Загружаем комментарии
        await loadComments()

    } catch (error) {
        console.error('Ошибка загрузки:', error)
    } finally {
        loading.value = false
    }
}

const loadComments = async () => {
    commentsLoading.value = true
    try {
        const { data, error } = await supabase
            .from('forum_comments')
            .select('*')
            .eq('post_id', route.params.id)
            .order('created_at', { ascending: true })

        if (error) throw error
        comments.value = data || []
    } catch (error) {
        console.error('Ошибка загрузки комментариев:', error)
    } finally {
        commentsLoading.value = false
    }
}

const addComment = async () => {
    if (!user.value || !newComment.value.content.trim()) return

    try {
        const authorName = getFullUserName()

        const { error } = await supabase
            .from('forum_comments')
            .insert({
                post_id: route.params.id,
                author_id: user.value.id,
                author_name: authorName,
                content: newComment.value.content.trim(),
                parent_id: newComment.value.parent_id
            })

        if (error) throw error

        // Создаем уведомление для автора поста, если это не он сам
        if (post.value.author_id !== user.value.id && !newComment.value.parent_id) {
            await supabase
                .from('forum_notifications')
                .insert({
                    user_id: post.value.author_id,
                    post_id: route.params.id,
                    sender_id: user.value.id,
                    sender_name: authorName,
                    type: 'comment',
                    message: `${authorName} прокомментировал(а) ваше обсуждение "${post.value.title}"`
                })
        }

        // Создаем уведомление для автора родительского комментария
        if (newComment.value.parent_id) {
            const parentComment = comments.value.find(c => c.id === newComment.value.parent_id)
            if (parentComment && parentComment.author_id !== user.value.id) {
                await supabase
                    .from('forum_notifications')
                    .insert({
                        user_id: parentComment.author_id,
                        post_id: route.params.id,
                        comment_id: newComment.value.parent_id,
                        sender_id: user.value.id,
                        sender_name: authorName,
                        type: 'reply',
                        message: `${authorName} ответил(а) на ваш комментарий`
                    })
            }
        }

        // Очистка формы
        newComment.value = { content: '', parent_id: null }

        // Не перезагружаем комментарии, они обновятся через realtime

    } catch (error) {
        console.error('Ошибка добавления комментария:', error)
    }
}

const handleReply = (comment) => {
    replyToComment.value = comment
    showReplyPopup.value = true
    nextTick(() => {
        replyTextarea.value?.focus()
    })
}

const submitReply = async () => {
    if (!replyContent.value.trim()) return

    newComment.value = {
        content: replyContent.value.trim(),
        parent_id: replyToComment.value.id
    }

    await addComment()
    closeReplyPopup()
}

const closeReplyPopup = () => {
    showReplyPopup.value = false
    replyToComment.value = null
    replyContent.value = ''
}

const deleteComment = async (commentId) => {
    if (!confirm('Удалить этот комментарий?')) return

    try {
        const { error } = await supabase
            .from('forum_comments')
            .delete()
            .eq('id', commentId)
            .eq('author_id', user.value.id)

        if (error) throw error

        // Удаляем комментарий локально
        comments.value = comments.value.filter(c => c.id !== commentId)

    } catch (error) {
        console.error('Ошибка удаления комментария:', error)
    }
}

const toggleFavorite = async () => {
    if (!user.value) return

    try {
        if (isFavorited.value) {
            // Удаляем из избранного
            const { error } = await supabase
                .from('forum_favorites')
                .delete()
                .eq('post_id', route.params.id)
                .eq('user_id', user.value.id)

            if (error) throw error

            // Обновляем счетчик локально
            post.value.favorites_count = Math.max(0, post.value.favorites_count - 1)
        } else {
            // Добавляем в избранное
            const { error } = await supabase
                .from('forum_favorites')
                .insert({
                    post_id: route.params.id,
                    user_id: user.value.id
                })

            if (error) throw error

            // Обновляем счетчик локально
            post.value.favorites_count = (post.value.favorites_count || 0) + 1

            // Создаем уведомление для автора поста
            if (post.value.author_id !== user.value.id) {
                await supabase
                    .from('forum_notifications')
                    .insert({
                        user_id: post.value.author_id,
                        post_id: route.params.id,
                        sender_id: user.value.id,
                        sender_name: getFullUserName(),
                        type: 'favorite',
                        message: `${getFullUserName()} добавил(а) ваше обсуждение в избранное`
                    })
            }
        }

        isFavorited.value = !isFavorited.value

    } catch (error) {
        console.error('Ошибка избранного:', error)
    }
}

// Настройка realtime подписок
const setupRealtime = () => {
    // Подписка на новые комментарии
    const commentsChannel = supabase
        .channel(`post-${route.params.id}-comments`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'forum_comments',
                filter: `post_id=eq.${route.params.id}`
            },
            (payload) => {
                // Добавляем новый комментарий в список
                comments.value.push(payload.new)
            }
        )
        .on(
            'postgres_changes',
            {
                event: 'DELETE',
                schema: 'public',
                table: 'forum_comments',
                filter: `post_id=eq.${route.params.id}`
            },
            (payload) => {
                // Удаляем комментарий из списка
                comments.value = comments.value.filter(c => c.id !== payload.old.id)
            }
        )
        .subscribe()

    // Подписка на изменения избранного
    const favoritesChannel = supabase
        .channel(`post-${route.params.id}-favorites`)
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'forum_favorites',
                filter: `post_id=eq.${route.params.id}`
            },
            (payload) => {
                if (payload.eventType === 'INSERT') {
                    post.value.favorites_count = (post.value.favorites_count || 0) + 1
                    if (payload.new.user_id === user.value?.id) {
                        isFavorited.value = true
                    }
                } else if (payload.eventType === 'DELETE') {
                    post.value.favorites_count = Math.max(0, (post.value.favorites_count || 1) - 1)
                    if (payload.old.user_id === user.value?.id) {
                        isFavorited.value = false
                    }
                }
            }
        )
        .subscribe()
}

// Инициализация
onMounted(() => {
    loadPost()
    if (user.value) {
        setupRealtime()
    }
})
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>