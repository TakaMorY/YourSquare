// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    // Получаем текущую сессию
    const { data } = await supabase.auth.getSession()

    // Защищенные маршруты (где требуется авторизация)
    const protectedRoutes = ['/profile', '/dashboard', '/settings', '/forum']

    // Если маршрут защищен и пользователь не авторизован
    if (protectedRoutes.some(route => to.path.startsWith(route))) {
        if (!data.session) {
            return navigateTo('/login?redirect=' + encodeURIComponent(to.fullPath))
        }
    }

    // Если пользователь авторизован и пытается зайти на страницы входа/регистрации
    if (data.session && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/forum')
    }
})