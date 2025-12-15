<template>
    <div class="min-h-screen bg-gray-50">
        <Header />
        <main class="pt-16">
            <slot />
        </main>
        <footer class="bg-black text-white pt-4 pb-8 px-6 md:px-8">
            <div class="max-w-7xl mx-auto">
                <div class="mt-16 pt-6 border-t border-zinc-800">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div class="flex space-x-6 mb-4 md:mb-0">
                            <NuxtLink to="/privacy" class="text-xs text-gray-500 hover:text-gray-300">
                                Политика конфиденциальности
                            </NuxtLink>
                        </div>
                        <div class="text-xs text-gray-500">
                            © 2025, Твой Квадрат. Все права защищены.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>