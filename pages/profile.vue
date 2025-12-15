<template>
    <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white rounded-xl shadow-lg p-6">
            <h1 class="text-2xl font-bold mb-6">Мой профиль</h1>

            <div v-if="loading" class="text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            </div>

            <div v-else-if="profile" class="space-y-6">
                <!-- Аватар -->
                <div class="flex items-center gap-6">
                    <div class="relative">
                        <div
                            class="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-3xl font-bold text-orange-600">
                            {{ profile.username?.charAt(0).toUpperCase() || 'U' }}
                        </div>
                        <input type="file" ref="avatarInput" class="hidden" accept="image/*" @change="uploadAvatar" />
                        <button @click="$refs.avatarInput.click()"
                            class="absolute bottom-0 right-0 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <h2 class="text-xl font-bold">{{ profile.username }}</h2>
                        <p class="text-gray-600">{{ user.email }}</p>
                        <p class="text-sm text-gray-500">Участник с {{ formatDate(profile.created_at) }}</p>
                    </div>
                </div>

                <!-- Форма редактирования -->
                <form @submit.prevent="updateProfile" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Имя пользователя</label>
                        <input v-model="profile.username" type="text"
                            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Полное имя</label>
                        <input v-model="profile.full_name" type="text"
                            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                    </div>

                    <div class="pt-4">
                        <button type="submit" :disabled="updating"
                            class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50">
                            {{ updating ? 'Сохранение...' : 'Сохранить изменения' }}
                        </button>
                    </div>
                </form>

                <!-- Настройки безопасности -->
                <div class="border-t pt-6">
                    <h3 class="text-lg font-bold mb-4">Безопасность</h3>
                    <NuxtLink to="/change-password" class="text-orange-600 hover:text-orange-500">
                        Сменить пароль
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(true)
const updating = ref(false)
const profile = ref(null)

// Загрузка профиля
onMounted(async () => {
    if (user.value) {
        await loadProfile()
    }
})

const loadProfile = async () => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.value.id)
            .single()

        if (error) throw error

        profile.value = data
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error)
    } finally {
        loading.value = false
    }
}

const updateProfile = async () => {
    try {
        updating.value = true

        const { error } = await supabase
            .from('profiles')
            .update({
                username: profile.value.username,
                full_name: profile.value.full_name,
                updated_at: new Date(),
            })
            .eq('id', user.value.id)

        if (error) throw error

        // Обновляем метаданные пользователя в Auth
        await supabase.auth.updateUser({
            data: { username: profile.value.username }
        })

        alert('Профиль успешно обновлен!')
    } catch (error) {
        console.error('Ошибка обновления профиля:', error)
        alert('Ошибка при обновлении профиля')
    } finally {
        updating.value = false
    }
}

const uploadAvatar = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
        // Загрузка в Supabase Storage
        const fileExt = file.name.split('.').pop()
        const fileName = `${user.value.id}-${Math.random()}.${fileExt}`
        const filePath = `avatars/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file)

        if (uploadError) throw uploadError

        // Получение публичного URL
        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath)

        // Обновление профиля
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', user.value.id)

        if (updateError) throw updateError

        profile.value.avatar_url = publicUrl
        alert('Аватар успешно обновлен!')
    } catch (error) {
        console.error('Ошибка загрузки аватара:', error)
        alert('Ошибка при загрузке аватара')
    }
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ru-RU')
}
</script>