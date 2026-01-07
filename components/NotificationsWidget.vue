<template>
    <div class="relative" ref="target">
        <!-- Кнопка уведомлений -->
        <button @click="toggleNotifications"
            class="relative p-2 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors">
            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {{ unreadCount }}
            </span>
        </button>

        <!-- Список уведомлений -->
        <div v-if="showNotifications"
            class="absolute right-0 mt-2 w-80 md:w-96 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
            <div class="p-4 border-b border-gray-800">
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-white">Уведомления</h3>
                    <button @click="markAllAsRead" class="text-sm text-orange-500 hover:text-orange-400"
                        v-if="unreadCount > 0">
                        Прочитать все
                    </button>
                </div>
            </div>

            <div v-if="notifications.length === 0" class="p-8 text-center">
                <svg class="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p class="text-gray-400">Нет уведомлений</p>
            </div>

            <div v-else>
                <div v-for="notification in notifications" :key="notification.id" :class="[
                    'p-4 border-b border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer',
                    !notification.read ? 'bg-gray-800/30' : ''
                ]" @click="openNotification(notification)">
                    <div class="flex items-start gap-3">
                        <div :class="[
                            'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                            notification.type === 'comment' ? 'bg-orange-500/20' :
                                notification.type === 'reply' ? 'bg-blue-500/20' :
                                    'bg-green-500/20'
                        ]">
                            <svg v-if="notification.type === 'comment'" class="w-4 h-4 text-orange-500" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <svg v-else-if="notification.type === 'reply'" class="w-4 h-4 text-blue-500" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            <svg v-else class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-white mb-1">{{ notification.message }}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-400">{{ formatDate(notification.created_at) }}</span>
                                <span v-if="!notification.read" class="w-2 h-2 bg-orange-500 rounded-full"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-4 border-t border-gray-800">
                <button @click="showAllNotifications"
                    class="w-full text-center text-sm text-gray-400 hover:text-white py-2">
                    Посмотреть все уведомления
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const target = ref(null)
const showNotifications = ref(false)
const notifications = ref([])
const unreadCount = ref(0)

// Загрузка уведомлений
const loadNotifications = async () => {
    if (!user.value) return

    try {
        const { data, error } = await supabase
            .from('forum_notifications')
            .select('*')
            .eq('user_id', user.value.id)
            .order('created_at', { ascending: false })
            .limit(10)

        if (error) throw error

        notifications.value = data || []

        // Подсчет непрочитанных
        unreadCount.value = notifications.value.filter(n => !n.read).length
    } catch (error) {
        console.error('Ошибка загрузки уведомлений:', error)
    }
}

// Отметить все как прочитанные
const markAllAsRead = async () => {
    try {
        const { error } = await supabase
            .from('forum_notifications')
            .update({ read: true })
            .eq('user_id', user.value.id)
            .eq('read', false)

        if (error) throw error

        notifications.value = notifications.value.map(n => ({ ...n, read: true }))
        unreadCount.value = 0
    } catch (error) {
        console.error('Ошибка отметки уведомлений:', error)
    }
}

// Отметить одно уведомление как прочитанное
const markAsRead = async (notificationId) => {
    try {
        const { error } = await supabase
            .from('forum_notifications')
            .update({ read: true })
            .eq('id', notificationId)

        if (error) throw error

        const index = notifications.value.findIndex(n => n.id === notificationId)
        if (index !== -1) {
            notifications.value[index].read = true
            unreadCount.value = Math.max(0, unreadCount.value - 1)
        }
    } catch (error) {
        console.error('Ошибка отметки уведомления:', error)
    }
}

// Открыть уведомление
const openNotification = async (notification) => {
    await markAsRead(notification.id)

    if (notification.post_id) {
        navigateTo(`/forum/${notification.post_id}`)
    }

    showNotifications.value = false
}

// Показать/скрыть уведомления
const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value
    if (showNotifications.value) {
        loadNotifications()
    }
}

// Показать все уведомления
const showAllNotifications = () => {
    // Можно сделать отдельную страницу для всех уведомлений
    navigateTo('/notifications')
    showNotifications.value = false
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)

    if (minutes < 60) {
        return `${minutes} мин назад`
    } else if (minutes < 1440) {
        return `${Math.floor(minutes / 60)} ч назад`
    } else {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
        })
    }
}

// Слушаем новые уведомления в реальном времени
const setupRealtime = () => {
    if (!user.value) return

    // Подписка на новые уведомления
    const channel = supabase
        .channel('forum_notifications')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'forum_notifications',
                filter: `user_id=eq.${user.value.id}`
            },
            (payload) => {
                notifications.value.unshift(payload.new)
                if (!payload.new.read) {
                    unreadCount.value += 1
                }
            }
        )
        .subscribe()
}

// Инициализация
onMounted(() => {
    if (user.value) {
        loadNotifications()
        setupRealtime()
    }
})

// Закрытие по клику вне компонента
onClickOutside(target, () => {
    showNotifications.value = false
})
</script>