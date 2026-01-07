<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Заголовок и навигация -->
      <div class="mb-12">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Форум сообщества
            </h1>
            <p class="text-gray-600 text-lg">
              Место для общения, обмена опытом и решения вопросов
            </p>
          </div>

          <div class="flex items-center gap-4">
            <div v-if="user" class="flex items-center gap-3">
              <div class="relative group">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {{ getUserInitials() }}
                </div>
                <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                  {{ getUserName() }}
                </div>
              </div>
              <button
                @click="handleLogout"
                class="px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 shadow hover:shadow-lg font-medium"
              >
                Выйти
              </button>
            </div>
            
            <NuxtLink
              v-else
              to="/login"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              Войти
            </NuxtLink>
          </div>
        </div>

        <!-- Табы -->
        <div class="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300',
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow hover:shadow-md'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Контент для незарегистрированных -->
      <div v-if="!user" class="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
        <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Присоединяйтесь к обсуждениям
        </h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Для участия в форуме необходимо войти в систему. Задавайте вопросы, делитесь опытом и находите решения вместе с сообществом.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/login"
            class="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            Войти в систему
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="px-8 py-3.5 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium"
          >
            Зарегистрироваться
          </NuxtLink>
        </div>
      </div>

      <!-- Контент для зарегистрированных -->
      <div v-else class="space-y-8">
        <!-- Форма создания поста -->
        <div class="bg-white rounded-3xl shadow-xl p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Создать новое обсуждение
          </h3>
          <div class="space-y-4">
            <input
              v-model="newPost.title"
              type="text"
              placeholder="Что хотите обсудить?"
              class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg placeholder-gray-400"
            />
            <textarea
              v-model="newPost.content"
              placeholder="Подробное описание..."
              rows="4"
              class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none placeholder-gray-400"
            ></textarea>
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-500">
                Будьте вежливы и уважайте мнение других участников
              </div>
              <button
                @click="createPost"
                :disabled="!canCreatePost"
                :class="[
                  'px-8 py-3.5 rounded-xl font-medium transition-all duration-300',
                  canCreatePost
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                ]"
              >
                {{ loading ? 'Создание...' : 'Создать тему' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Список постов -->
        <div v-if="loading" class="text-center py-12">
          <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-4 text-gray-600">Загружаем обсуждения...</p>
        </div>

        <div v-else-if="filteredPosts.length === 0" class="bg-white rounded-3xl shadow-lg p-12 text-center">
          <div class="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Нет обсуждений</h3>
          <p class="text-gray-600 mb-6">Будьте первым, кто создаст тему для обсуждения!</p>
        </div>

        <div v-else class="space-y-6">
          <div
            v-for="post in filteredPosts"
            :key="post.id"
            class="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div class="p-6 md:p-8">
              <!-- Заголовок и автор -->
              <div class="flex justify-between items-start gap-4 mb-6">
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                    {{ post.title }}
                  </h3>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                      {{ post.author_name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="font-medium text-gray-800">{{ post.author_name }}</div>
                      <div class="text-sm text-gray-500">{{ formatDate(post.created_at) }}</div>
                    </div>
                  </div>
                </div>
                
                <!-- Избранное -->
                <button
                  @click="toggleFavorite(post)"
                  :class="[
                    'flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300',
                    post.isFavorited
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  ]"
                  :title="post.isFavorited ? 'Удалить из избранного' : 'Добавить в избранное'"
                >
                  <svg :class="['w-6 h-6', post.isFavorited ? 'fill-red-600' : 'fill-none stroke-current']" 
                       stroke-width="2" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ post.favorites_count }}</span>
                </button>
              </div>

              <!-- Контент -->
              <div class="mb-6">
                <p class="text-gray-700 text-lg leading-relaxed">{{ post.content }}</p>
              </div>

              <!-- Действия -->
              <div class="flex flex-wrap justify-between items-center pt-6 border-t border-gray-100 gap-4">
                <div class="flex items-center gap-4">
                  <button
                    @click="toggleComments(post)"
                    class="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                    </svg>
                    <span class="font-medium">
                      {{ post.showComments ? 'Скрыть' : 'Комментарии' }} ({{ post.commentsCount || 0 }})
                    </span>
                  </button>
                </div>

                <div class="flex items-center gap-3">
                  <button
                    v-if="post.author_id === user.id"
                    @click="deletePost(post)"
                    class="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>

            <!-- Комментарии -->
            <div v-if="post.showComments" class="border-t border-gray-100 bg-gray-50">
              <!-- Список комментариев -->
              <div v-if="post.comments && post.comments.length > 0" class="p-6 space-y-4">
                <div
                  v-for="comment in post.comments"
                  :key="comment.id"
                  class="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {{ comment.author_name.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <div class="font-medium text-gray-800">{{ comment.author_name }}</div>
                        <div class="text-sm text-gray-500">{{ formatDate(comment.created_at) }}</div>
                      </div>
                    </div>
                    <button
                      v-if="comment.author_id === user.id"
                      @click="deleteComment(comment)"
                      class="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                  <p class="text-gray-700">{{ comment.content }}</p>
                </div>
              </div>

              <!-- Форма добавления комментария -->
              <div class="p-6 border-t border-gray-200">
                <div class="flex gap-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {{ getUserInitials() }}
                  </div>
                  <div class="flex-1">
                    <textarea
                      v-model="post.newComment"
                      @keydown.enter.prevent="addComment(post)"
                      placeholder="Написать комментарий..."
                      rows="2"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none placeholder-gray-400"
                    ></textarea>
                    <div class="flex justify-between items-center mt-3">
                      <div class="text-sm text-gray-500">
                        Нажмите Enter для отправки
                      </div>
                      <button
                        @click="addComment(post)"
                        :disabled="!post.newComment?.trim()"
                        :class="[
                          'px-4 py-2 rounded-lg font-medium transition-colors',
                          post.newComment?.trim()
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        ]"
                      >
                        Отправить
                      </button>
                    </div>
                  </div>
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

// Инициализация данных
const posts = ref([])
const loading = ref(false)
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

// Функции
const getUserInitials = () => {
  if (!user.value?.user_metadata?.name) return 'А'
  return user.value.user_metadata.name.charAt(0).toUpperCase()
}

const getUserName = () => {
  return user.value?.user_metadata?.name || 'Пользователь'
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

// Загрузка постов с комментариями и статусом избранного
const loadPosts = async () => {
  loading.value = true
  try {
    // Загружаем посты
    const { data: postsData, error: postsError } = await supabase
      .from('forum_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (postsError) throw postsError

    // Для каждого поста загружаем комментарии и проверяем избранное
    const postsWithDetails = await Promise.all(
      (postsData || []).map(async (post) => {
        // Загружаем комментарии
        const { data: commentsData } = await supabase
          .from('forum_comments')
          .select('*')
          .eq('post_id', post.id)
          .order('created_at', { ascending: true })

        // Проверяем, добавлен ли в избранное
        const { data: favoriteData } = await supabase
          .from('forum_favorites')
          .select('id')
          .eq('post_id', post.id)
          .eq('user_id', user.value.id)
          .single()

        return {
          ...post,
          comments: commentsData || [],
          commentsCount: commentsData?.length || 0,
          isFavorited: !!favoriteData,
          showComments: false,
          newComment: ''
        }
      })
    )

    posts.value = postsWithDetails
    
  } catch (error) {
    console.error('Ошибка загрузки:', error)
    alert('Не удалось загрузить обсуждения')
  } finally {
    loading.value = false
  }
}

// Создание поста
const createPost = async () => {
  if (!canCreatePost.value) return
  
  loading.value = true
  try {
    const { error } = await supabase
      .from('forum_posts')
      .insert({
        title: newPost.value.title,
        content: newPost.value.content,
        author_id: user.value.id,
        author_name: getUserName()
      })
    
    if (error) throw error
    
    // Очистка формы и обновление
    newPost.value = { title: '', content: '' }
    await loadPosts()
    
  } catch (error) {
    console.error('Ошибка создания:', error)
    alert('Не удалось создать обсуждение')
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
    alert('Не удалось удалить обсуждение')
  }
}

// Добавление/удаление из избранного
const toggleFavorite = async (post) => {
  try {
    if (post.isFavorited) {
      // Удаляем из избранного
      const { error } = await supabase
        .from('forum_favorites')
        .delete()
        .eq('post_id', post.id)
        .eq('user_id', user.value.id)
      
      if (error) throw error

      // Обновляем счетчик
      await supabase
        .from('forum_posts')
        .update({ favorites_count: post.favorites_count - 1 })
        .eq('id', post.id)

      post.favorites_count -= 1
    } else {
      // Добавляем в избранное
      const { error } = await supabase
        .from('forum_favorites')
        .insert({
          post_id: post.id,
          user_id: user.value.id
        })
      
      if (error) throw error

      // Обновляем счетчик
      await supabase
        .from('forum_posts')
        .update({ favorites_count: post.favorites_count + 1 })
        .eq('id', post.id)

      post.favorites_count += 1
    }

    post.isFavorited = !post.isFavorited
    
    // Если на вкладке "Популярные", нужно обновить порядок
    if (activeTab.value === 'popular') {
      posts.value = [...posts.value].sort((a, b) => b.favorites_count - a.favorites_count)
    }
    
  } catch (error) {
    console.error('Ошибка избранного:', error)
    alert('Не удалось обновить избранное')
  }
}

// Показать/скрыть комментарии
const toggleComments = (post) => {
  post.showComments = !post.showComments
}

// Добавление комментария
const addComment = async (post) => {
  if (!post.newComment?.trim()) return

  try {
    const { error } = await supabase
      .from('forum_comments')
      .insert({
        post_id: post.id,
        author_id: user.value.id,
        author_name: getUserName(),
        content: post.newComment.trim()
      })
    
    if (error) throw error

    // Очистка и обновление
    post.newComment = ''
    await loadPosts()
    
  } catch (error) {
    console.error('Ошибка комментария:', error)
    alert('Не удалось добавить комментарий')
  }
}

// Удаление комментария
const deleteComment = async (comment) => {
  if (!confirm('Удалить этот комментарий?')) return

  try {
    const { error } = await supabase
      .from('forum_comments')
      .delete()
      .eq('id', comment.id)
      .eq('author_id', user.value.id)
    
    if (error) throw error

    await loadPosts()
    
  } catch (error) {
    console.error('Ошибка удаления:', error)
    alert('Не удалось удалить комментарий')
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