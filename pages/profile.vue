<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Хлебные крошки -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink to="/" class="text-gray-500 hover:text-orange-600">Главная</NuxtLink>
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">Мой профиль</li>
        </ol>
      </nav>

      <!-- Основное содержимое -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Левая колонка: Аватар и основная информация -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Секция аватара -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
              <!-- Аватар с возможностью загрузки -->
              <div class="relative group">
                <div class="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    v-if="profile.avatar_url" 
                    :src="profile.avatar_url" 
                    alt="Аватар"
                    class="w-full h-full object-cover"
                  />
                  <div 
                    v-else 
                    class="w-full h-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-5xl font-bold"
                  >
                    {{ userInitials }}
                  </div>
                </div>
                
                <!-- Кнопки управления аватаром -->
                <div class="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <input 
                    type="file" 
                    ref="avatarInput" 
                    class="hidden" 
                    accept="image/*"
                    @change="uploadAvatar"
                  />
                  <button 
                    @click="$refs.avatarInput.click()"
                    class="p-3 bg-white/90 hover:bg-white rounded-full transition-colors"
                    title="Изменить фото"
                  >
                    <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <button 
                    v-if="profile.avatar_url"
                    @click="deleteAvatar"
                    class="p-3 bg-white/90 hover:bg-white rounded-full transition-colors"
                    title="Удалить фото"
                  >
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Информация пользователя -->
              <div class="flex-1 text-center md:text-left">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ profile.username || 'Пользователь' }}
                </h1>
                <p class="text-gray-600 mb-6">
                  {{ user.email }}
                  <span class="ml-2 text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    ✓ Активен
                  </span>
                </p>
                
                <!-- Статистика -->
                <div class="flex flex-wrap gap-6">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900">{{ daysInSystem }}</div>
                    <div class="text-sm text-gray-500">дней с нами</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900">{{ profile.posts_count || 0 }}</div>
                    <div class="text-sm text-gray-500">публикаций</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900">{{ profile.rating || 5.0 }}</div>
                    <div class="text-sm text-gray-500">рейтинг</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Секция изменения пароля -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">Изменить пароль</h2>
            
            <form @submit.prevent="changePassword" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Текущий пароль
                </label>
                <div class="relative">
                  <input 
                    v-model="passwordData.currentPassword"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Введите текущий пароль"
                    required
                  />
                  <button 
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    <svg v-if="showCurrentPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Новый пароль
                </label>
                <div class="relative">
                  <input 
                    v-model="passwordData.newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Придумайте новый пароль"
                    required
                  />
                  <button 
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    <svg v-if="showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                <div class="mt-2 text-sm text-gray-500">
                  Пароль должен содержать минимум 6 символов, включая цифры и буквы
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Подтвердите новый пароль
                </label>
                <div class="relative">
                  <input 
                    v-model="passwordData.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Повторите новый пароль"
                    required
                  />
                  <button 
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  :disabled="changingPassword"
                  class="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span v-if="changingPassword">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Обновление...
                  </span>
                  <span v-else>Изменить пароль</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Правая колонка: Настройки и действия -->
        <div class="space-y-8">
          <!-- Секция изменения email -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">Изменить email</h2>
            
            <form @submit.prevent="changeEmail" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Новый email адрес
                </label>
                <input 
                  v-model="emailData.newEmail"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your@new-email.com"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Подтвердите пароль
                </label>
                <input 
                  v-model="emailData.password"
                  type="password"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Введите ваш пароль"
                  required
                />
              </div>

              <div class="pt-4">
                <button 
                  type="submit" 
                  :disabled="changingEmail"
                  class="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span v-if="changingEmail">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Отправка...
                  </span>
                  <span v-else>Изменить email</span>
                </button>
              </div>
            </form>

            <div class="mt-6 pt-6 border-t text-sm text-gray-500">
              <p>После изменения email вам будет отправлено письмо для подтверждения нового адреса.</p>
            </div>
          </div>

          <!-- Быстрые действия -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Действия</h2>
            
            <div class="space-y-4">
              <button 
                @click="refreshUserData"
                class="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span class="font-medium text-gray-900">Обновить данные</span>
                </div>
                <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button 
                @click="exportData"
                class="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span class="font-medium text-gray-900">Экспорт данных</span>
                </div>
                <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button 
                @click="handleLogout"
                class="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span class="font-medium text-red-700">Выйти из аккаунта</span>
                </div>
                <svg class="w-5 h-5 text-red-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Уведомления -->
      <div v-if="notification.show" :class="[
        'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm animate-fadeIn',
        notification.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
        notification.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
        'bg-blue-50 border border-blue-200 text-blue-800'
      ]">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg v-if="notification.type === 'success'" class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">{{ notification.message }}</p>
          </div>
          <button @click="notification.show = false" class="ml-auto pl-3">
            <svg class="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
const profile = ref({
  username: '',
  avatar_url: '',
  created_at: '',
  posts_count: 0,
  rating: 5.0
})

// Данные для изменения пароля
const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const changingPassword = ref(false)

// Данные для изменения email
const emailData = ref({
  newEmail: '',
  password: ''
})
const changingEmail = ref(false)

// Уведомления
const notification = ref({
  show: false,
  type: 'success',
  message: ''
})

// Вычисляемые свойства
const userInitials = computed(() => {
  if (!user.value) return '?'
  const username = profile.value.username || user.value.user_metadata?.username || ''
  const email = user.value.email || ''
  
  if (username) return username.charAt(0).toUpperCase()
  if (email) return email.charAt(0).toUpperCase()
  return 'U'
})

const daysInSystem = computed(() => {
  if (!profile.value.created_at) return 0
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
    if (!user.value) return

    // Загружаем профиль
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()

    if (error) {
      // Если профиль не найден, создаем его
      profile.value = {
        id: user.value.id,
        username: user.value.user_metadata?.username || user.value.email?.split('@')[0] || 'Пользователь',
        created_at: user.value.created_at || new Date().toISOString(),
        posts_count: 0,
        rating: 5.0
      }
      
      await supabase.from('profiles').insert([profile.value])
    } else {
      profile.value = data
    }
  } catch (error) {
    console.error('Ошибка загрузки профиля:', error)
    showNotification('Ошибка загрузки профиля', 'error')
  }
}

// Изменение аватара
const uploadAvatar = async (event) => {
  try {
    const file = event.target.files[0]
    if (!file || !user.value) return

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Файл слишком большой (максимум 5MB)', 'error')
      return
    }

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      showNotification('Выберите изображение', 'error')
      return
    }

    // Создаем bucket если его нет
    const { data: buckets } = await supabase.storage.listBuckets()
    if (!buckets.find(b => b.name === 'avatars')) {
      await supabase.storage.createBucket('avatars', {
        public: true,
        fileSizeLimit: 5242880
      })
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
    showNotification('Фото успешно обновлено!', 'success')

  } catch (error) {
    console.error('Ошибка загрузки аватара:', error)
    showNotification('Ошибка при загрузке фото', 'error')
  }
}

// Удаление аватара
const deleteAvatar = async () => {
  try {
    if (!user.value || !profile.value.avatar_url) return

    // Извлекаем имя файла из URL
    const fileName = profile.value.avatar_url.split('/').pop()
    const filePath = `public/${fileName}`

    // Удаляем файл из storage
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([filePath])

    if (deleteError) throw deleteError

    // Обновляем профиль
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: null })
      .eq('id', user.value.id)

    if (updateError) throw updateError

    profile.value.avatar_url = null
    showNotification('Фото удалено', 'success')

  } catch (error) {
    console.error('Ошибка удаления аватара:', error)
    showNotification('Ошибка при удалении фото', 'error')
  }
}

// Изменение пароля
const changePassword = async () => {
  try {
    changingPassword.value = true

    // Валидация
    if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
      showNotification('Пароли не совпадают', 'error')
      return
    }

    if (passwordData.value.newPassword.length < 6) {
      showNotification('Пароль должен содержать минимум 6 символов', 'error')
      return
    }

    // Обновляем пароль
    const { error } = await supabase.auth.updateUser({
      password: passwordData.value.newPassword
    })

    if (error) throw error

    // Сбрасываем форму
    passwordData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    showNotification('Пароль успешно изменен!', 'success')

  } catch (error) {
    console.error('Ошибка изменения пароля:', error)
    showNotification(error.message || 'Ошибка при изменении пароля', 'error')
  } finally {
    changingPassword.value = false
  }
}

// Изменение email
const changeEmail = async () => {
  try {
    changingEmail.value = true

    // Проверяем email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailData.value.newEmail)) {
      showNotification('Введите корректный email адрес', 'error')
      return
    }

    // Обновляем email
    const { error } = await supabase.auth.updateUser({
      email: emailData.value.newEmail
    })

    if (error) {
      if (error.message.includes('already registered')) {
        showNotification('Этот email уже зарегистрирован', 'error')
      } else {
        throw error
      }
      return
    }

    showNotification('Письмо для подтверждения отправлено на новый email', 'success')
    
    // Сбрасываем форму
    emailData.value = {
      newEmail: '',
      password: ''
    }

  } catch (error) {
    console.error('Ошибка изменения email:', error)
    showNotification(error.message || 'Ошибка при изменении email', 'error')
  } finally {
    changingEmail.value = false
  }
}

// Вспомогательные методы
const showNotification = (message, type = 'success') => {
  notification.value = {
    show: true,
    type,
    message
  }
  
  // Автоматически скрываем через 5 секунд
  setTimeout(() => {
    notification.value.show = false
  }, 5000)
}

const refreshUserData = async () => {
  await loadProfile()
  showNotification('Данные обновлены', 'success')
}

const exportData = () => {
  showNotification('Экспорт данных скоро будет доступен', 'info')
}

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    await router.push('/')
  } catch (error) {
    console.error('Ошибка выхода:', error)
    showNotification('Ошибка при выходе из системы', 'error')
  }
}
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
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

/* Стили для аватара */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Кастомные стили для инпутов */
input:focus {
  outline: none;
  ring: 2px;
  ring-color: #f97316;
}

/* Плавные переходы */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>