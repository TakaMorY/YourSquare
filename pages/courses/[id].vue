<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Хедер курса -->
    <div class="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <nav class="mb-6">
          <NuxtLink to="/courses" class="text-white/80 hover:text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад к курсам
          </NuxtLink>
        </nav>
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm mb-2 inline-block">
              {{ course.subject_type === 'ege' ? 'ЕГЭ' : 'ОГЭ' }}
            </span>
            <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ course.name }}</h1>
            <p class="text-white/80">{{ course.description }}</p>
          </div>
          <div class="mt-4 md:mt-0">
            <span v-if="hasAccess" class="px-4 py-2 bg-green-500 rounded-lg font-medium">
              ✓ Доступ открыт
            </span>
            <button 
              v-else
              @click="goToPurchase"
              class="px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Купить за {{ formatPrice(course.price) }} ₽
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Основной контент -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Сайдбар с навигацией -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 class="font-bold text-gray-900 mb-4">Содержание курса</h3>
            <nav class="space-y-2">
              <button 
                v-for="section in sections" 
                :key="section.id"
                @click="activeSection = section.id"
                :class="[
                  'w-full text-left px-3 py-2 rounded-lg transition-colors',
                  activeSection === section.id 
                    ? 'bg-orange-100 text-orange-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                {{ section.title }}
              </button>
            </nav>
            
            <div class="mt-8 pt-6 border-t">
              <h4 class="font-bold text-gray-900 mb-3">Материалы</h4>
              <div class="space-y-3">
                <a 
                  v-for="material in materials" 
                  :key="material.id"
                  :href="material.url" 
                  target="_blank"
                  class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ material.title }}</div>
                    <div class="text-sm text-gray-500">{{ material.type }}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Основной контент -->
        <div class="lg:col-span-3">
          <!-- Если нет доступа -->
          <div v-if="!hasAccess && !loading" class="bg-white rounded-xl shadow-lg p-8 text-center">
            <div class="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Доступ к курсу закрыт</h3>
            <p class="text-gray-600 mb-6">
              Чтобы получить доступ ко всей теории курса, необходимо его приобрести
            </p>
            <div class="space-y-4">
              <button 
                @click="goToPurchase"
                class="px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors text-lg"
              >
                Купить курс за {{ formatPrice(course.price) }} ₽
              </button>
              <p class="text-sm text-gray-500">
                После оплаты доступ откроется мгновенно
              </p>
            </div>
          </div>

          <!-- Если есть доступ -->
          <div v-else-if="hasAccess" class="space-y-8">
            <div 
              v-for="section in sections" 
              :key="section.id"
              v-show="activeSection === section.id"
              class="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ section.title }}</h2>
              
              <!-- Контент секции -->
              <div class="prose max-w-none">
                <!-- Теория будет загружаться динамически -->
                <div v-if="section.type === 'text'" class="space-y-6">
                  <div v-for="(paragraph, idx) in section.content" :key="idx" class="text-gray-700 leading-relaxed">
                    {{ paragraph }}
                  </div>
                </div>
                
                <!-- Пример задачи -->
                <div v-if="section.type === 'example'" class="bg-blue-50 rounded-lg p-6 my-6">
                  <h4 class="font-bold text-blue-900 mb-3">Пример задачи:</h4>
                  <div class="text-gray-800">{{ section.problem }}</div>
                  <div class="mt-4 p-4 bg-white rounded border">
                    <strong>Решение:</strong>
                    <div class="mt-2">{{ section.solution }}</div>
                  </div>
                </div>
                
                <!-- Формулы -->
                <div v-if="section.type === 'formulas'" class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div 
                    v-for="formula in section.formulas" 
                    :key="formula.id"
                    class="p-4 bg-gray-50 rounded-lg"
                  >
                    <div class="font-mono text-lg mb-2">{{ formula.expression }}</div>
                    <div class="text-sm text-gray-600">{{ formula.description }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Навигация по секциям -->
              <div class="flex justify-between mt-12 pt-6 border-t">
                <button 
                  v-if="activeSection > 1"
                  @click="activeSection--"
                  class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Предыдущий раздел
                </button>
                <button 
                  v-if="activeSection < sections.length"
                  @click="activeSection++"
                  class="ml-auto px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                >
                  Следующий раздел
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Прогресс изучения -->
          <div v-if="hasAccess" class="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h3 class="font-bold text-gray-900 mb-4">Ваш прогресс</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Изучено разделов</span>
                  <span>{{ progress.completed }}/{{ sections.length }}</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-green-500 transition-all duration-500"
                    :style="{ width: `${(progress.completed / sections.length) * 100}%` }"
                  ></div>
                </div>
              </div>
              <div class="text-center">
                <button 
                  @click="markAsCompleted"
                  class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Отметить раздел как изученный
                </button>
              </div>
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
const router = useRouter()

const course = ref({})
const hasAccess = ref(false)
const loading = ref(true)
const activeSection = ref(1)

// Пример данных для секций (в реальном проекте будут загружаться из БД)
const sections = ref([
  { 
    id: 1, 
    title: 'Введение в предмет', 
    type: 'text',
    content: [
      'Этот курс охватывает всю необходимую теорию для успешной сдачи ЕГЭ по данному предмету.',
      'Мы разберем каждую тему подробно, с примерами и практическими заданиями.'
    ]
  },
  { 
    id: 2, 
    title: 'Основные формулы и правила', 
    type: 'formulas',
    formulas: [
      { id: 1, expression: 'a² + b² = c²', description: 'Теорема Пифагора' },
      { id: 2, expression: 'E = mc²', description: 'Формула энергии' },
      { id: 3, expression: 'F = ma', description: 'Второй закон Ньютона' }
    ]
  },
  { 
    id: 3, 
    title: 'Примеры решения задач', 
    type: 'example',
    problem: 'Решите уравнение: x² - 5x + 6 = 0',
    solution: 'x₁ = 2, x₂ = 3 (через дискриминант D = 25 - 24 = 1)'
  },
  { id: 4, title: 'Практические задания', type: 'text' },
  { id: 5, title: 'Подготовка к сочинению', type: 'text' },
  { id: 6, title: 'Типичные ошибки', type: 'text' },
  { id: 7, title: 'Итоговое повторение', type: 'text' }
])

const materials = ref([
  { id: 1, title: 'Полная теория PDF', type: 'PDF файл (2.4 MB)', url: '#' },
  { id: 2, title: 'Шпаргалка по формулам', type: 'Изображение', url: '#' },
  { id: 3, title: 'Практикум', type: 'PDF файл (1.8 MB)', url: '#' }
])

const progress = ref({
  completed: 1,
  lastAccessed: new Date()
})

// Хуки жизненного цикла
onMounted(async () => {
  await loadCourseData()
  await checkAccess()
})

// Методы
const loadCourseData = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', route.params.id)
    .single()
  
  if (error) {
    console.error('Ошибка загрузки курса:', error)
    router.push('/courses')
  } else {
    course.value = data
  }
}

const checkAccess = async () => {
  if (!user.value) {
    loading.value = false
    return
  }
  
  const { data, error } = await supabase
    .from('user_purchases')
    .select('id')
    .eq('user_id', user.value.id)
    .eq('course_id', route.params.id)
    .eq('payment_status', 'completed')
    .single()
  
  if (error && error.code !== 'PGRST116') {
    console.error('Ошибка проверки доступа:', error)
  }
  
  hasAccess.value = !!data
  loading.value = false
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

const goToPurchase = () => {
  router.push(`/courses/purchase/${route.params.id}`)
}

const markAsCompleted = () => {
  if (activeSection.value === progress.value.completed) {
    progress.value.completed++
    if (activeSection.value < sections.value.length) {
      activeSection.value++
    }
  }
}
</script>

<style scoped>
.prose {
  color: #374151;
  line-height: 1.75;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose p {
  margin-bottom: 1rem;
}

.sticky {
  position: sticky;
}
</style>