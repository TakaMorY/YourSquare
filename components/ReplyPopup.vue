<template>
    <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>

        <div class="relative min-h-screen flex items-center justify-center p-4">
            <div class="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md">
                <!-- Заголовок -->
                <div class="p-6 border-b border-gray-800">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-bold text-white">
                            Ответ на комментарий
                        </h3>
                        <button @click="$emit('close')" class="p-1 text-gray-400 hover:text-white transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p class="text-sm text-gray-400 mt-2">
                        Ответ на комментарий пользователя {{ parentComment.author_name }}
                    </p>
                </div>

                <!-- Форма -->
                <div class="p-6">
                    <div class="mb-4 p-3 bg-gray-800 rounded-xl">
                        <p class="text-sm text-gray-300">{{ parentComment.content }}</p>
                    </div>

                    <textarea v-model="replyContent" ref="textareaRef" placeholder="Ваш ответ..." rows="4"
                        class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none placeholder-gray-500 text-white"
                        @keydown.enter.ctrl="submit"></textarea>

                    <div class="flex justify-between items-center mt-4">
                        <div class="text-sm text-gray-400">
                            Ctrl+Enter для отправки
                        </div>
                        <div class="flex gap-3">
                            <button @click="$emit('close')"
                                class="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                                Отмена
                            </button>
                            <button @click="submit" :disabled="!replyContent.trim()" :class="[
                                'px-5 py-2 rounded-xl font-medium transition-all duration-300',
                                replyContent.trim()
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                                    : 'bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700'
                            ]">
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    parentComment: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['submit', 'close'])

const replyContent = ref('')
const textareaRef = ref(null)

const submit = () => {
    if (replyContent.value.trim()) {
        emit('submit', replyContent.value.trim())
    }
}

onMounted(() => {
    textareaRef.value?.focus()
})
</script>