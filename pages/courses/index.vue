<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Подготовка к ЕГЭ и ОГЭ
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Получите полный доступ к теории по всем предметам. 
          Купите один курс или весь пакет для максимального результата.
        </p>
      </div>

      <!-- Фильтры -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="[
            'px-6 py-2 rounded-full font-medium transition-all',
            activeFilter === filter.value 
              ? 'bg-orange-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-500'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Каталог курсов -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="course in filteredCourses" 
          :key="course.id"
          class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
        >
          <!-- Бейдж типа экзамена -->
          <div class="absolute top-4 right-4 z-10">
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-bold',
              course.subject_type === 'ege' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            ]">
              {{ course.subject_type === 'ege' ? 'ЕГЭ' : 'ОГЭ' }}
            </span>
          </div>

          <!-- Обложка курса -->
          <div class="h-48 bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center relative">
            <div class="text-white text-center">
              <div class="text-5xl font-bold mb-2">
                {{ getSubjectEmoji(course.name) }}
              </div>
              <h3 class="text-xl font-bold">{{ course.name.split('(')[0].trim() }}</h3>
            </div>
          </div>

          <!-- Контент карточки -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ course.name }}</h3>
            <p class="text-gray-600 mb-4 text-sm">{{ course.description }}</p>
            
            <div class="space-y-4">
              <!-- Особенности -->
              <div class="space-y-2">
                <div v-for="feature in getCourseFeatures(course.name)" 
                     :key="feature"
                     class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  {{ feature }}
                </div>
              </div>

              <!-- Цена -->
              <div class="flex items-center justify-between border-t pt-4">
                <div>
                  <div class="text-2xl font-bold text-gray-900">
                    {{ formatPrice(course.price) }} ₽
                  </div>
                  <div class="text-sm text-gray-500">одноразовый платеж</div>
                </div>
                
                <!-- Кнопка действия -->
                <button 
                  v-if="isCoursePurchased(course.id)"
                  @click="goToCourse(course.id)"
                  class="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Открыть теорию
                </button>
                <button 
                  v-else
                  @click="openPurchaseModal(course)"
                  class="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Купить курс
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Пакетное предложение -->
      <div class="mt-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl p-8 text-white">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="mb-6 md:mb-0">
            <h3 class="text-2xl font-bold mb-2">Вся теория ЕГЭ</h3>
            <p class="opacity-90">Все 8 предметов по специальной цене</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-1">24 990 ₽</div>
            <div class="text-sm opacity-90">экономия 3 500 ₽</div>
            <button class="mt-4 px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Купить весь пакет
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно покупки -->
    <div v-if="selectedCourse" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-8">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">Покупка курса</h3>
            <p class="text-gray-600">{{ selectedCourse.name }}</p>
          </div>
          <button @click="selectedCourse = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Детали покупки -->
        <div class="space-y-4 mb-6">
          <div class="flex justify-between py-3 border-b">
            <span class="text-gray-600">Стоимость курса:</span>
            <span class="font-bold">{{ formatPrice(selectedCourse.price) }} ₽</span>
          </div>
          <div class="flex justify-between py-3 border-b">
            <span class="text-gray-600">Скидка:</span>
            <span class="text-green-600 font-bold">0 ₽</span>
          </div>
          <div class="flex justify-between py-3 border-b">
            <span class="text-gray-600">Итого к оплате:</span>
            <span class="text-2xl font-bold text-orange-600">{{ formatPrice(selectedCourse.price) }} ₽</span>
          </div>
        </div>

        <!-- Методы оплаты -->
        <div class="mb-6">
          <h4 class="font-medium text-gray-900 mb-3">Способ оплаты</h4>
          <div class="space-y-3">
            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:border-orange-500">
              <input type="radio" name="payment" value="card" checked class="mr-3">
              <div class="flex items-center">
                <svg class="w-8 h-8 text-gray-700 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                <span>Банковская карта</span>
              </div>
            </label>
            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:border-orange-500">
              <input type="radio" name="payment" value="yoomoney" class="mr-3">
              <div class="flex items-center">
                <svg class="w-8 h-8 text-red-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>ЮMoney</span>
              </div>
            </label>
            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:border-orange-500">
              <input type="radio" name="payment" value="sbp" class="mr-3">
              <div class="flex items-center">
                <svg class="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <span>СБП (Система быстрых платежей)</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Кнопка оплаты -->
        <button 
          @click="processPurchase"
          :disabled="processingPurchase"
          class="w-full py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
        >
          <span v-if="processingPurchase">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Обработка...
          </span>
          <span v-else>Оплатить {{ formatPrice(selectedCourse.price) }} ₽</span>
        </button>

        <div class="mt-4 text-center text-sm text-gray-500">
          После оплаты курс появится в разделе «Мои курсы»
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// Состояния
const courses = ref([])
const userPurchases = ref([])
const filters = [
  { label: 'Все курсы', value: 'all' },
  { label: 'ЕГЭ', value: 'ege' },
  { label: 'ОГЭ', value: 'oge' },
  { label: 'Купленные', value: 'purchased' }
]
const activeFilter = ref('all')
const selectedCourse = ref(null)
const processingPurchase = ref(false)

// Вычисляемые свойства
const filteredCourses = computed(() => {
  if (activeFilter.value === 'all') return courses.value
  if (activeFilter.value === 'purchased') {
    return courses.value.filter(course => isCoursePurchased(course.id))
  }
  return courses.value.filter(course => course.subject_type === activeFilter.value)
})

// Хуки жизненного цикла
onMounted(async () => {
  await Promise.all([loadCourses(), loadUserPurchases()])
})

// Методы
const loadCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_active', true)
    .order('price')
  
  if (error) {
    console.error('Ошибка загрузки курсов:', error)
  } else {
    courses.value = data
  }
}

const loadUserPurchases = async () => {
  if (!user.value) return
  
  const { data, error } = await supabase
    .from('user_purchases')
    .select('course_id')
    .eq('user_id', user.value.id)
    .eq('payment_status', 'completed')
  
  if (error) {
    console.error('Ошибка загрузки покупок:', error)
  } else {
    userPurchases.value = data.map(p => p.course_id)
  }
}

const isCoursePurchased = (courseId) => {
  return userPurchases.value.includes(courseId)
}

const getSubjectEmoji = (name) => {
  const emojis = {
    'Русский': '📚',
    'Математика': '🧮',
    'Обществознание': '🏛️',
    'Физика': '⚛️',
    'Биология': '🧬',
    'Английский': '🇬🇧',
    'Химия': '⚗️',
    'История': '📜'
  }
  
  for (const [key, emoji] of Object.entries(emojis)) {
    if (name.includes(key)) return emoji
  }
  return '📖'
}

const getCourseFeatures = (courseName) => {
  const features = {
    'Русский': ['Полная теория', 'Примеры сочинений', 'Разбор заданий', 'PDF-материалы'],
    'Математика': ['Все формулы', 'Решение задач', 'Ведомости', 'Видеоуроки'],
    'Обществознание': ['Схемы и таблицы', 'Термины', 'Примеры эссе', 'Тесты'],
    'Физика': ['Формулы', 'Опыты', 'Законы', 'Чертежи']
  }
  
  for (const [key, value] of Object.entries(features)) {
    if (courseName.includes(key)) return value
  }
  
  return ['Полная теория', 'Примеры заданий', 'Практика', 'Поддержка']
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

const openPurchaseModal = (course) => {
  if (!user.value) {
    router.push('/login')
    return
  }
  selectedCourse.value = course
}

const processPurchase = async () => {
  if (!user.value || !selectedCourse.value) return
  
  processingPurchase.value = true
  
  try {
    // В реальном проекте здесь будет интеграция с платежной системой
    // Сейчас просто симулируем покупку
    
    // 1. Создаем запись о покупке
    const { error } = await supabase
      .from('user_purchases')
      .insert([{
        user_id: user.value.id,
        course_id: selectedCourse.value.id,
        amount_paid: selectedCourse.value.price,
        payment_status: 'completed',
        transaction_id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }])
    
    if (error) throw error
    
    // 2. Обновляем список покупок
    userPurchases.value.push(selectedCourse.value.id)
    
    // 3. Показываем успешное сообщение
    alert(`Курс "${selectedCourse.value.name}" успешно куплен!`)
    
    // 4. Перенаправляем на страницу курса
    await router.push(`/courses/${selectedCourse.value.id}`)
    
    // 5. Закрываем модальное окно
    selectedCourse.value = null
    
  } catch (error) {
    console.error('Ошибка покупки курса:', error)
    alert('Произошла ошибка при покупке курса. Попробуйте еще раз.')
  } finally {
    processingPurchase.value = false
  }
}

const goToCourse = (courseId) => {
  router.push(`/courses/${courseId}`)
}
</script>

<style scoped>
/* Кастомные стили */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Плавные переходы */
.transition-all {
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>