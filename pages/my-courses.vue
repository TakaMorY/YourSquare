<template>
    <div class="min-h-screen bg-gray-50 py-12">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Хедер -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">Мои курсы</h1>
                <p class="text-gray-600 mt-2">Все купленные материалы для подготовки</p>
            </div>

            <!-- Статистика -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow p-6">
                    <div class="text-3xl font-bold text-gray-900 mb-2">{{ purchasedCourses.length }}</div>
                    <div class="text-gray-600">Купленных курсов</div>
                </div>
                <div class="bg-white rounded-xl shadow p-6">
                    <div class="text-3xl font-bold text-gray-900 mb-2">{{ totalSpent }} ₽</div>
                    <div class="text-gray-600">Всего потрачено</div>
                </div>
                <div class="bg-white rounded-xl shadow p-6">
                    <div class="text-3xl font-bold text-gray-900 mb-2">{{ activeCourses }}</div>
                    <div class="text-gray-600">Активных курсов</div>
                </div>
            </div>

            <!-- Список курсов -->
            <div v-if="loading" class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                <p class="mt-4 text-gray-600">Загрузка ваших курсов...</p>
            </div>

            <div v-else-if="purchasedCourses.length === 0" class="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">У вас пока нет курсов</h3>
                <p class="text-gray-600 mb-6 max-w-md mx-auto">
                    Приобретите теорию по любому предмету для подготовки к ЕГЭ или ОГЭ
                </p>
                <NuxtLink to="/courses"
                    class="inline-block px-8 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors">
                    Выбрать курс
                </NuxtLink>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="purchase in purchasedCourses" :key="purchase.id"
                    class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                    <!-- Заголовок курса -->
                    <div class="h-40 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-white text-center">
                                <div class="text-4xl mb-2">
                                    {{ getSubjectEmoji(purchase.courses.name) }}
                                </div>
                                <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                    {{ purchase.courses.subject_type === 'ege' ? 'ЕГЭ' : 'ОГЭ' }}
                                </span>
                            </div>
                        </div>

                        <!-- Прогресс -->
                        <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                            <div class="h-full bg-green-400" style="width: 30%"></div>
                        </div>
                    </div>

                    <!-- Контент -->
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ purchase.courses.name }}</h3>
                        <div class="space-y-4">
                            <!-- Информация о покупке -->
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-500">Куплен:</span>
                                    <span class="font-medium">{{ formatDate(purchase.purchase_date) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-500">Стоимость:</span>
                                    <span class="font-bold text-green-600">{{ formatPrice(purchase.amount_paid) }}
                                        ₽</span>
                                </div>
                            </div>

                            <!-- Прогресс изучения -->
                            <div>
                                <div class="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Прогресс</span>
                                    <span>30%</span>
                                </div>
                                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div class="h-full bg-green-500" style="width: 30%"></div>
                                </div>
                            </div>

                            <!-- Кнопки действий -->
                            <div class="flex gap-2 pt-4">
                                <NuxtLink :to="`/courses/${purchase.course_id}`"
                                    class="flex-1 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors text-center">
                                    Продолжить
                                </NuxtLink>
                                <button
                                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Рекомендации -->
            <div v-if="purchasedCourses.length > 0" class="mt-12">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Рекомендуем продолжить</h2>
                <div class="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white">
                    <div class="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h3 class="text-2xl font-bold mb-2">Получите скидку 20%</h3>
                            <p>При покупке второго курса</p>
                        </div>
                        <NuxtLink to="/courses"
                            class="mt-4 md:mt-0 px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                            Выбрать еще курс
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const purchasedCourses = ref([])
const loading = ref(true)

// Вычисляемые свойства
const totalSpent = computed(() => {
    return purchasedCourses.value.reduce((sum, purchase) => {
        return sum + Number(purchase.amount_paid || 0)
    }, 0)
})

const activeCourses = computed(() => {
    return purchasedCourses.value.length
})

// Хуки жизненного цикла
onMounted(async () => {
    if (user.value) {
        await loadPurchasedCourses()
    }
    loading.value = false
})

// Методы
const loadPurchasedCourses = async () => {
    const { data, error } = await supabase
        .from('user_purchases')
        .select(`
      *,
      courses (*)
    `)
        .eq('user_id', user.value.id)
        .eq('payment_status', 'completed')
        .order('purchase_date', { ascending: false })

    if (error) {
        console.error('Ошибка загрузки курсов:', error)
    } else {
        purchasedCourses.value = data
    }
}

const getSubjectEmoji = (name) => {
    const emojis = {
        'Русский': '📚',
        'Математика': '🧮',
        'Обществознание': '🏛️',
        'Физика': '⚛️',
        'Биология': '🧬',
        'Английский': '🇬🇧'
    }

    for (const [key, emoji] of Object.entries(emojis)) {
        if (name.includes(key)) return emoji
    }
    return '📖'
}

const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price)
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}
</script>