// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to) => {
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    // Получаем текущую сессию
    const { data } = await supabase.auth.getSession()

    // Защищенные маршруты (где требуется авторизация)
    const protectedRoutes = ['/profile', '/dashboard', '/settings']

    // Страницы, где нужно показывать разный контент для авторизованных/неавторизованных
    const authAwareRoutes = ['/forum']

    // Если маршрут защищен и пользователь не авторизован
    if (protectedRoutes.some(route => to.path.startsWith(route))) {
        if (!data.session) {
            return navigateTo('/login')
        }
    }

    // Если пользователь авторизован и пытается зайти на страницы входа/регистрации
    if (data.session && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/')
    }

    // Для форума просто передаем данные сессии
    // (не редиректим, но можем использовать данные)
})