<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <!-- Логотип и заголовок -->
            <div>
                <div class="flex justify-center mb-4">
                    <NuxtLink to="/" class="logo flex items-center gap-2">
                        <div class="logo-icon">
                            <svg viewBox="0 0 40 40" fill="none">
                                <rect x="0" y="0" width="40" height="40" fill="#f97316" class="logo-outer" />
                                <rect x="10" y="10" width="20" height="20" fill="white" class="logo-inner" />
                            </svg>
                        </div>
                        <span class="logo-text flex gap-0.5">
                            <span class="logo-part logo-part-your text-black">Твой</span>
                            <span class="logo-part logo-part-square text-black">Квадрат</span>
                        </span>
                    </NuxtLink>
                </div>

                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Вход в аккаунт
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Или
                    <NuxtLink to="/register" class="font-medium text-orange-600 hover:text-orange-500">
                        зарегистрируйтесь
                    </NuxtLink>
                </p>
            </div>

            <!-- Форма входа -->
            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <div class="space-y-4">
                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                            Email адрес
                        </label>
                        <div class="relative">
                            <input v-model="formData.email" id="email" name="email" type="email" autocomplete="email"
                                required :class="[
                                    'appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm',
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                ]" placeholder="you@example.com" @input="clearError('email')" />
                            <div v-if="errors.email" class="mt-1 text-sm text-red-600">
                                {{ errors.email }}
                            </div>
                        </div>
                    </div>

                    <!-- Пароль -->
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <label for="password" class="block text-sm font-medium text-gray-700">
                                Пароль
                            </label>
                            <NuxtLink to="/forgot-password"
                                class="text-sm font-medium text-orange-600 hover:text-orange-500">
                                Забыли пароль?
                            </NuxtLink>
                        </div>
                        <div class="relative">
                            <input v-model="formData.password" id="password" name="password"
                                :type="showPassword ? 'text' : 'password'" autocomplete="current-password" required
                                :class="[
                                    'appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm',
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                ]" placeholder="Введите ваш пароль" @input="clearError('password')" />
                            <button type="button"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                @click="showPassword = !showPassword">
                                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                            <div v-if="errors.password" class="mt-1 text-sm text-red-600">
                                {{ errors.password }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Запомнить меня -->
                <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" v-model="formData.rememberMe"
                        class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                        Запомнить меня
                    </label>
                </div>

                <!-- Ошибки формы -->
                <div v-if="formError" class="rounded-md bg-red-50 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">
                                Ошибка входа
                            </h3>
                            <div class="mt-2 text-sm text-red-700">
                                <p>{{ formError }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Кнопка входа -->
                <div>
                    <button type="submit" :disabled="loading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span>{{ loading ? 'Вход...' : 'Войти' }}</span>
                    </button>
                </div>

                <!-- Вход по ссылке -->
                <div class="text-center">
                    <button type="button" @click="signInWithMagicLink" :disabled="loading"
                        class="text-sm text-orange-600 hover:text-orange-500 disabled:opacity-50">
                        Войти по ссылке на email
                    </button>
                </div>

                <!-- Альтернативные способы входа -->
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-gray-50 text-gray-500">Или войдите через</span>
                    </div>
                </div>

                <!-- Социальные сети -->
                <div class="grid grid-cols-2 gap-3">
                    <button type="button" @click="signInWithGoogle" :disabled="loading"
                        class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                        <svg class="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span class="ml-2">Google</span>
                    </button>

                    <button type="button" @click="signInWithGithub" :disabled="loading"
                        class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        <span class="ml-2">GitHub</span>
                    </button>
                </div>
            </form>

            <!-- Ссылка на регистрацию -->
            <div class="text-center">
                <p class="text-sm text-gray-600">
                    Нет аккаунта?
                    <NuxtLink to="/register" class="font-medium text-orange-600 hover:text-orange-500">
                        Зарегистрироваться
                    </NuxtLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const router = useRouter()
const user = useSupabaseUser()

// Перенаправляем если уже залогинен
if (user.value) {
    await navigateTo('/')
}

// Данные формы
const formData = ref({
    email: '',
    password: '',
    rememberMe: true
})

// Состояния
const loading = ref(false)
const showPassword = ref(false)
const formError = ref('')
const errors = ref({
    email: '',
    password: ''
})

// Очистка ошибки
const clearError = (field) => {
    if (errors.value[field]) {
        errors.value[field] = ''
    }
    if (formError.value) {
        formError.value = ''
    }
}

// Валидация формы
const validateForm = () => {
    let isValid = true
    errors.value = { email: '', password: '' }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.value.email.trim()) {
        errors.value.email = 'Email обязателен'
        isValid = false
    } else if (!emailRegex.test(formData.value.email)) {
        errors.value.email = 'Введите корректный email'
        isValid = false
    }

    // Валидация пароля
    if (!formData.value.password) {
        errors.value.password = 'Пароль обязателен'
        isValid = false
    }

    return isValid
}

// Вход в систему
const handleLogin = async () => {
    if (!validateForm()) {
        return
    }

    try {
        loading.value = true
        formError.value = ''

        // Вход через email и пароль
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.value.email,
            password: formData.value.password
        })

        if (error) {
            console.error('Login error:', error)

            // Обработка ошибок Supabase
            if (error.message.includes('Invalid login credentials')) {
                throw new Error('Неверный email или пароль')
            } else if (error.message.includes('Email not confirmed')) {
                throw new Error('Email не подтвержден. Проверьте вашу почту')
            } else if (error.message.includes('Too many requests')) {
                throw new Error('Слишком много попыток. Попробуйте позже')
            } else {
                throw new Error(error.message || 'Ошибка при входе')
            }
        }

        // Успешный вход
        if (data.user) {
            // Перенаправляем на главную
            await router.push('/')
        }

    } catch (error) {
        console.error('Login error:', error)
        formError.value = error.message || 'Произошла ошибка при входе'
    } finally {
        loading.value = false
    }
}

// Вход по магической ссылке
const signInWithMagicLink = async () => {
    if (!formData.value.email) {
        formError.value = 'Введите email для отправки ссылки'
        return
    }

    try {
        loading.value = true
        formError.value = ''

        const { error } = await supabase.auth.signInWithOtp({
            email: formData.value.email,
            options: {
                emailRedirectTo: `${window.location.origin}/confirm`
            }
        })

        if (error) throw error

        alert('Ссылка для входа отправлена на вашу почту! Проверьте email.')
    } catch (error) {
        console.error('Magic link error:', error)
        formError.value = 'Ошибка при отправке ссылки'
    } finally {
        loading.value = false
    }
}

// Вход через Google
const signInWithGoogle = async () => {
    try {
        loading.value = true
        formError.value = ''

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/confirm`
            }
        })

        if (error) throw error
    } catch (error) {
        console.error('Google auth error:', error)
        formError.value = 'Ошибка при входе через Google'
    } finally {
        loading.value = false
    }
}

// Вход через GitHub
const signInWithGithub = async () => {
    try {
        loading.value = true
        formError.value = ''

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/confirm`
            }
        })

        if (error) throw error
    } catch (error) {
        console.error('GitHub auth error:', error)
        formError.value = 'Ошибка при входе через GitHub'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.logo {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
}

.logo-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-text {
    display: flex;
    gap: 0.25rem;
}

.logo-part-your {
    color: #f97316;
}

.logo-part-square {
    color: #000;
}
</style>