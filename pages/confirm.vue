<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center max-w-md mx-4">
            <div v-if="loading" class="space-y-6">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Подтверждение...</h2>
                    <p class="text-gray-600">Подтверждаем вашу сессию</p>
                </div>
            </div>

            <div v-else-if="error" class="space-y-6">
                <div class="text-red-500 mx-auto w-16 h-16">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Ошибка подтверждения</h2>
                    <p class="text-gray-600 mb-6">{{ error }}</p>
                    <NuxtLink to="/login"
                        class="inline-block px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
                        Вернуться к входу
                    </NuxtLink>
                </div>
            </div>

            <div v-else class="space-y-6">
                <div class="text-green-500 mx-auto w-16 h-16">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Подтверждено!</h2>
                    <p class="text-gray-600 mb-6">Вы будете перенаправлены на главную страницу</p>
                    <div class="animate-pulse text-orange-600">
                        <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()

const loading = ref(true)
const error = ref('')

onMounted(async () => {
    try {
        // Проверяем наличие хэша для подтверждения email
        const hash = window.location.hash

        if (hash) {
            // Обрабатываем подтверждение email
            const { data, error: confirmError } = await supabase.auth.getSession()

            if (confirmError) {
                console.error('Confirmation error:', confirmError)
                throw new Error('Не удалось подтвердить email')
            }
        }

        // Ждем немного для обновления состояния
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Проверяем текущую сессию
        const { data: sessionData } = await supabase.auth.getSession()

        if (sessionData.session) {
            // Перенаправляем на главную через 2 секунды
            setTimeout(() => {
                router.push('/')
            }, 2000)
        } else {
            error.value = 'Сессия не найдена. Попробуйте войти снова.'
        }

    } catch (err) {
        console.error('Confirmation error:', err)
        error.value = err.message || 'Произошла ошибка при подтверждении'
    } finally {
        loading.value = false
    }
})

// Следим за изменением состояния пользователя
watchEffect(async () => {
    const user = useSupabaseUser()

    if (user.value) {
        // Перенаправляем на главную
        await router.push('/')
    }
})
</script>