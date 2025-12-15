<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <!-- Шапка профиля -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">Мой профиль</h1>
                <p class="text-gray-600 mt-2">Управляйте вашей учетной записью и настройками</p>
            </div>

            <!-- Ошибка аутентификации -->
            <div v-if="authError" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div class="flex items-center">
                    <svg class="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="text-red-800">{{ authError }}</span>
                </div>
            </div>

            <!-- Загрузка -->
            <div v-if="loading" class="flex justify-center py-12">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                    <p class="mt-4 text-gray-600">Загрузка профиля...</p>
                </div>
            </div>

            <!-- Основной контент профиля -->
            <div v-else-if="user && profile" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Левая колонка: информация профиля -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-start gap-6 mb-8">
                            <!-- Аватар -->
                            <div class="relative">
                                <div
                                    class="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    {{ userInitials }}
                                </div>
                                <input type="file" ref="avatarInput" class="hidden" accept="image/*"
                                    @change="uploadAvatar" />
                                <button @click="$refs.avatarInput.click()"
                                    class="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>

                            <!-- Информация пользователя -->
                            <div class="flex-1">
                                <h2 class="text-2xl font-bold text-gray-900">{{ profile.username || 'Пользователь' }}
                                </h2>
                                <p class="text-gray-600 mt-1">{{ user.email }}</p>
                                <div class="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Зарегистрирован: {{ formatDate(profile.created_at) }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Форма редактирования -->
                        <form @submit.prevent="updateProfile" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Имя пользователя
                                    </label>
                                    <input v-model="profile.username" type="text"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                        placeholder="Введите имя пользователя" required />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Полное имя
                                    </label>
                                    <input v-model="profile.full_name" type="text"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                        placeholder="Введите полное имя" />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        О себе
                                    </label>
                                    <textarea v-model="profile.bio" rows="4"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                        placeholder="Расскажите немного о себе..."></textarea>
                                </div>
                            </div>

                            <!-- Сообщения об успехе/ошибке -->
                            <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div class="flex items-center text-green-800">
                                    <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{ successMessage }}
                                </div>
                            </div>

                            <div v-if="updateError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div class="flex items-center text-red-800">
                                    <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{ updateError }}
                                </div>
                            </div>

                            <!-- Кнопки действий -->
                            <div class="flex gap-4 pt-4">
                                <button type="submit" :disabled="updating"
                                    class="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
                                    <svg v-if="updating" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4" />
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    {{ updating ? 'Сохранение...' : 'Сохранить изменения' }}
                                </button>

                                <NuxtLink to="/"
                                    class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                    Вернуться на главную
                                </NuxtLink>
                            </div>
                        </form>
                    </div>

                    <!-- Секция активности -->
                    <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-6">Активность</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">Регистрация в системе</p>
                                        <p class="text-sm text-gray-500">{{ formatDate(profile.created_at) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Правая колонка: настройки -->
                <div class="space-y-8">
                    <!-- Настройки аккаунта -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-6">Настройки аккаунта</h3>
                        <div class="space-y-4">
                            <NuxtLink to="/settings/security"
                                class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">Безопасность</p>
                                        <p class="text-sm text-gray-500">Смена пароля и 2FA</p>
                                    </div>
                                </div>
                                <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </NuxtLink>

                            <NuxtLink to="/settings/notifications"
                                class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">Уведомления</p>
                                        <p class="text-sm text-gray-500">Настройка оповещений</p>
                                    </div>
                                </div>
                                <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Статистика -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-6">Статистика</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-700">Дней в системе</span>
                                <span class="font-bold text-orange-600">{{ daysInSystem }}</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-700">Статус аккаунта</span>
                                <span class="font-bold text-green-600">Активен</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-700">Email подтвержден</span>
                                <span class="font-bold"
                                    :class="user.email_confirmed_at ? 'text-green-600' : 'text-red-600'">
                                    {{ user.email_confirmed_at ? 'Да' : 'Нет' }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Действия -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-6">Действия</h3>
                        <div class="space-y-3">
                            <button @click="handleLogout"
                                class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Выйти из аккаунта
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Если пользователь не авторизован -->
            <div v-else-if="!loading && !user" class="bg-white rounded-xl shadow-lg p-8 text-center">
                <div class="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Требуется авторизация</h3>
                <p class="text-gray-600 mb-6">Для просмотра профиля необходимо войти в систему</p>
                <div class="flex gap-4 justify-center">
                    <NuxtLink to="/login"
                        class="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
                        Войти
                    </NuxtLink>
                    <NuxtLink to="/register"
                        class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        Зарегистрироваться
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Импорты
const supabase = useSupabaseClient()
const router = useRouter()

// Состояния
const user = useSupabaseUser()
const loading = ref(true)
const updating = ref(false)
const profile = ref(null)
const authError = ref('')
const updateError = ref('')
const successMessage = ref('')

// Вычисляемые свойства
const userInitials = computed(() => {
    if (!user.value) return '?'

    const username = profile.value?.username || user.value.user_metadata?.username || ''
    const email = user.value.email || ''

    if (username) {
        return username.charAt(0).toUpperCase()
    } else if (email) {
        return email.charAt(0).toUpperCase()
    }

    return 'U'
})

const daysInSystem = computed(() => {
    if (!profile.value?.created_at) return 0

    const created = new Date(profile.value.created_at)
    const now = new Date()
    const diffTime = Math.abs(now - created)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

// Хуки жизненного цикла
onMounted(async () => {
    await loadProfile()
})

// Методы
const loadProfile = async () => {
    try {
        loading.value = true
        authError.value = ''

        console.log('Загрузка профиля...')
        console.log('Пользователь:', user.value)

        if (!user.value) {
            authError.value = 'Пользователь не авторизован'
            loading.value = false
            return
        }

        // Пытаемся получить профиль из таблицы profiles
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.value.id)
            .single()

        if (error) {
            console.warn('Ошибка загрузки профиля из таблицы:', error)

            // Если профиля нет в таблице, создаем его из данных пользователя
            profile.value = {
                id: user.value.id,
                username: user.value.user_metadata?.username || user.value.email?.split('@')[0] || 'Пользователь',
                full_name: user.value.user_metadata?.full_name || user.value.user_metadata?.username || '',
                bio: '',
                created_at: user.value.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString()
            }

            // Пытаемся создать профиль в таблице
            const { error: insertError } = await supabase
                .from('profiles')
                .insert([profile.value])

            if (insertError) {
                console.warn('Не удалось создать профиль:', insertError)
                // Продолжаем работу с локальным профилем
            }
        } else {
            // Профиль найден в таблице
            profile.value = data
        }

        // Заполняем недостающие данные из user
        if (!profile.value.username) {
            profile.value.username = user.value.user_metadata?.username || user.value.email?.split('@')[0] || 'Пользователь'
        }

        console.log('Загруженный профиль:', profile.value)

    } catch (error) {
        console.error('Критическая ошибка загрузки профиля:', error)
        authError.value = 'Не удалось загрузить профиль. Попробуйте обновить страницу.'
    } finally {
        loading.value = false
    }
}

const updateProfile = async () => {
    try {
        updating.value = true
        updateError.value = ''
        successMessage.value = ''

        if (!user.value || !profile.value) {
            updateError.value = 'Пользователь не найден'
            return
        }

        // Обновляем профиль в таблице profiles
        const { error } = await supabase
            .from('profiles')
            .update({
                username: profile.value.username,
                full_name: profile.value.full_name,
                bio: profile.value.bio,
                updated_at: new Date().toISOString()
            })
            .eq('id', user.value.id)

        if (error) {
            // Если таблицы profiles нет, обновляем только метаданные пользователя
            if (error.code === '42P01') { // Таблица не существует
                console.warn('Таблица profiles не существует, обновляем метаданные пользователя')

                const { error: updateUserError } = await supabase.auth.updateUser({
                    data: {
                        username: profile.value.username,
                        full_name: profile.value.full_name
                    }
                })

                if (updateUserError) throw updateUserError
            } else {
                throw error
            }
        }

        successMessage.value = 'Профиль успешно обновлен!'

        // Очищаем сообщение через 3 секунды
        setTimeout(() => {
            successMessage.value = ''
        }, 3000)

    } catch (error) {
        console.error('Ошибка обновления профиля:', error)
        updateError.value = error.message || 'Ошибка при обновлении профиля'
    } finally {
        updating.value = false
    }
}

const uploadAvatar = async (event) => {
    try {
        const file = event.target.files[0]
        if (!file || !user.value) return

        // Создаем bucket если его нет
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
        if (bucketsError) throw bucketsError

        const avatarBucket = buckets.find(b => b.name === 'avatars')
        if (!avatarBucket) {
            const { error: createError } = await supabase.storage.createBucket('avatars', {
                public: true,
                fileSizeLimit: 5242880 // 5MB
            })
            if (createError) throw createError
        }

        // Загружаем файл
        const fileExt = file.name.split('.').pop()
        const fileName = `${user.value.id}-${Date.now()}.${fileExt}`
        const filePath = `public/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            })

        if (uploadError) throw uploadError

        // Получаем публичный URL
        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath)

        // Обновляем профиль
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', user.value.id)

        if (updateError) throw updateError

        profile.value.avatar_url = publicUrl
        successMessage.value = 'Аватар успешно обновлен!'

    } catch (error) {
        console.error('Ошибка загрузки аватара:', error)
        updateError.value = 'Ошибка при загрузке аватара'
    }
}

const handleLogout = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error

        await router.push('/')
    } catch (error) {
        console.error('Ошибка выхода:', error)
        updateError.value = 'Ошибка при выходе из системы'
    }
}

const formatDate = (dateString) => {
    if (!dateString) return 'Не указано'

    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}
</script>

<style scoped>
/* Дополнительные стили */
.avatar-upload:hover .avatar-overlay {
    opacity: 1;
}

.avatar-overlay {
    transition: opacity 0.2s ease;
}

/* Анимации */
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

.fade-in {
    animation: fadeIn 0.3s ease-out;
}
</style>