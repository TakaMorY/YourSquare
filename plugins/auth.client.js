// plugins/auth.client.js
import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()

    const supabase = createClient(
        config.public.supabaseUrl,
        config.public.supabaseKey
    )

    // Создаем реактивное состояние пользователя
    const user = ref(null)
    const isAuthenticated = ref(false)

    // Функция для проверки авторизации
    const checkAuth = async () => {
        try {
            const { data: { session }, error } = await supabase.auth.getSession()

            if (error) {
                console.error('Auth error:', error)
                user.value = null
                isAuthenticated.value = false
                return
            }

            if (session?.user) {
                user.value = session.user
                isAuthenticated.value = true
            } else {
                user.value = null
                isAuthenticated.value = false
            }
        } catch (error) {
            console.error('Check auth error:', error)
            user.value = null
            isAuthenticated.value = false
        }
    }

    // Проверяем сразу при загрузке
    await checkAuth()

    // Подписываемся на изменения авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
            console.log('Auth state changed:', event)
            if (session?.user) {
                user.value = session.user
                isAuthenticated.value = true
            } else {
                user.value = null
                isAuthenticated.value = false
            }
        }
    )

    // Убираем подписку при уничтожении
    nuxtApp.hook('app:beforeMount', () => {
        subscription?.unsubscribe()
    })

    return {
        provide: {
            auth: {
                user,
                isAuthenticated,
                supabase,
                checkAuth,
                logout: async () => {
                    await supabase.auth.signOut()
                    user.value = null
                    isAuthenticated.value = false
                }
            }
        }
    }
})