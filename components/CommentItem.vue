<template>
    <div :class="[
        'comment-item transition-all duration-200',
        isReply ? 'ml-4 md:ml-8 pl-4 border-l-2 border-gray-700' : ''
    ]">
        <div class="bg-gray-800/50 rounded-2xl border border-gray-700 p-4 hover:border-orange-500/30 transition-colors">
            <!-- Заголовок комментария -->
            <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                    <div
                        class="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {{ comment.author_name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                        <div class="font-medium text-white">{{ comment.author_name }}</div>
                        <div class="text-xs text-gray-400">{{ formatDate(comment.created_at) }}</div>
                    </div>
                </div>

                <!-- Действия -->
                <div class="flex items-center gap-2">
                    <button v-if="user && comment.author_id !== currentUserId" @click="$emit('reply', comment)"
                        class="p-1.5 text-gray-400 hover:text-orange-500 transition-colors" title="Ответить">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                    </button>
                    <button v-if="comment.author_id === currentUserId" @click="$emit('delete', comment.id)"
                        class="p-1.5 text-gray-400 hover:text-red-400 transition-colors" title="Удалить">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Содержание -->
            <div class="mb-3">
                <p class="text-gray-300 whitespace-pre-line">{{ comment.content }}</p>
            </div>

            <!-- Ответы -->
            <div v-if="replies && replies.length > 0" class="space-y-4 mt-4">
                <CommentItem v-for="reply in replies" :key="reply.id" :comment="reply" :replies="[]"
                    :current-user-id="currentUserId" :is-reply="true" @reply="$emit('reply', reply)"
                    @delete="$emit('delete', reply.id)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSupabaseUser } from '#imports'

const props = defineProps({
    comment: {
        type: Object,
        required: true
    },
    replies: {
        type: Array,
        default: () => []
    },
    currentUserId: {
        type: String,
        default: null
    },
    isReply: {
        type: Boolean,
        default: false
    }
})

const user = useSupabaseUser()
const emit = defineEmits(['reply', 'delete'])

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
</script>