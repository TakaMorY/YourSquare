<template>
    <div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-25">
        <!-- Декоративные элементы -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-amber-300/10 rounded-full blur-3xl">
            </div>
            <div
                class="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-r from-amber-200/10 to-orange-200/20 rounded-full blur-3xl">
            </div>
            <div
                class="absolute -bottom-40 right-1/3 w-64 h-64 bg-gradient-to-r from-orange-400/10 to-amber-400/5 rounded-full blur-3xl">
            </div>
        </div>

        <div class="relative">
            <!-- Mobile menu button -->
            <div class="lg:hidden fixed top-4 right-4 z-50">
                <button @click="mobileMenuOpen = !mobileMenuOpen"
                    class="p-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Main container -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <!-- Header -->
                <header class="mb-8 lg:mb-12">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <!-- Logo and title -->
                        <div class="flex items-center space-x-4">
                            <div class="relative">
                                <div
                                    class="w-14 h-14 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <span class="text-white font-bold text-2xl">К²</span>
                                    <div
                                        class="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur opacity-30">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1
                                    class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                    Форум Квадрата
                                </h1>
                                <p class="text-gray-500 text-sm lg:text-base mt-1">Место для общения и обмена идеями</p>
                            </div>
                        </div>

                        <!-- User actions -->
                        <div class="flex items-center space-x-4">
                            <div v-if="user" class="flex items-center space-x-4">
                                <!-- User avatar with status -->
                                <div class="relative">
                                    <div
                                        class="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {{ getUserInitials(user) }}
                                    </div>
                                    <div
                                        class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                                    </div>
                                </div>

                                <div class="hidden md:block">
                                    <div class="text-sm text-gray-600">Привет,</div>
                                    <div class="font-medium text-gray-800">
                                        {{ getUserDisplayName(user) }}
                                    </div>
                                </div>

                                <!-- Logout button -->
                                <button @click="handleLogout"
                                    class="group relative px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 font-medium overflow-hidden">
                                    <span class="relative z-10">Выйти</span>
                                    <div
                                        class="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    </div>
                                </button>
                            </div>

                            <NuxtLink v-else to="/login"
                                class="group relative px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 font-medium overflow-hidden">
                                <span class="relative z-10">Войти</span>
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </header>

                <!-- Mobile menu overlay -->
                <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    @click="mobileMenuOpen = false"></div>

                <!-- Mobile menu -->
                <div v-if="mobileMenuOpen"
                    class="fixed top-20 right-4 w-64 bg-white rounded-2xl shadow-2xl z-50 p-4 lg:hidden animate-slide-in">
                    <div v-if="user" class="mb-4 p-3 bg-orange-50 rounded-xl">
                        <div class="flex items-center space-x-3">
                            <div
                                class="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white font-bold">
                                {{ getUserInitials(user) }}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="font-medium text-gray-800 truncate">{{ getUserDisplayName(user) }}</div>
                                <div class="text-xs text-gray-500 truncate">{{ user.email }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <button @click="activeTab = 'all'; mobileMenuOpen = false" :class="[
                            'w-full px-4 py-3 rounded-xl font-medium transition-all text-left',
                            activeTab === 'all'
                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-orange-50'
                        ]">
                            Все посты
                        </button>
                        <button @click="activeTab = 'popular'; mobileMenuOpen = false" :class="[
                            'w-full px-4 py-3 rounded-xl font-medium transition-all text-left',
                            activeTab === 'popular'
                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-orange-50'
                        ]">
                            Популярные
                        </button>
                    </div>
                </div>

                <!-- Main content -->
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    <!-- Left sidebar -->
                    <div class="lg:col-span-1">
                        <div class="sticky top-6 space-y-6">
                            <!-- Create post card -->
                            <div v-if="user"
                                class="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
                                <div class="p-5">
                                    <div class="flex items-center space-x-3 mb-4">
                                        <div
                                            class="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {{ getUserInitials(user) }}
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-gray-800">Новая публикация</h3>
                                            <p class="text-sm text-gray-500">Поделитесь с сообществом</p>
                                        </div>
                                    </div>

                                    <div class="space-y-3">
                                        <div>
                                            <input v-model="newPost.title" type="text"
                                                placeholder="О чем хотите рассказать?"
                                                class="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 placeholder-gray-400" />
                                        </div>

                                        <div>
                                            <textarea v-model="newPost.content" placeholder="Подробнее..." rows="3"
                                                class="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 resize-none placeholder-gray-400"></textarea>
                                        </div>

                                        <button @click="createPost"
                                            :disabled="!newPost.title.trim() || !newPost.content.trim() || loading"
                                            class="w-full group relative px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] font-medium overflow-hidden">
                                            <span class="relative z-10 flex items-center justify-center">
                                                <svg v-if="loading" class="animate-spin h-5 w-5 mr-2"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                    </path>
                                                </svg>
                                                <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                                </svg>
                                                {{ loading ? 'Публикую...' : 'Опубликовать' }}
                                            </span>
                                            <div
                                                class="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Stats cards -->
                            <div class="grid grid-cols-2 gap-3">
                                <div class="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
                                    <div class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Посты
                                    </div>
                                    <div class="text-2xl font-bold text-orange-500 mt-1">{{ posts.length }}</div>
                                </div>
                                <div class="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
                                    <div class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Сегодня
                                    </div>
                                    <div class="text-2xl font-bold text-amber-500 mt-1">{{ todayPosts }}</div>
                                </div>
                                <div class="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
                                    <div class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Авторы
                                    </div>
                                    <div class="text-2xl font-bold text-orange-400 mt-1">{{ uniqueUsers }}</div>
                                </div>
                                <div class="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
                                    <div class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Комменты
                                    </div>
                                    <div class="text-2xl font-bold text-amber-400 mt-1">{{ totalComments }}</div>
                                </div>
                            </div>

                            <!-- Call to action for non-auth users -->
                            <div v-if="!user"
                                class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg p-5 text-white">
                                <div class="space-y-3">
                                    <h3 class="font-bold text-lg">Присоединяйтесь к обсуждению</h3>
                                    <p class="text-orange-100 text-sm">Войдите, чтобы создавать посты и комментировать
                                    </p>
                                    <NuxtLink to="/login"
                                        class="inline-flex items-center justify-center w-full px-4 py-2.5 bg-white text-orange-500 rounded-xl hover:bg-orange-50 transition-all font-medium shadow-md hover:shadow-lg">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                                            </path>
                                        </svg>
                                        Войти на форум
                                    </NuxtLink>
                                </div>
                            </div>

                            <!-- Filters -->
                            <div class="bg-white rounded-2xl shadow-sm border border-orange-100 p-4">
                                <h3 class="font-bold text-gray-800 mb-3">Фильтры</h3>
                                <div class="space-y-2">
                                    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                                        'w-full px-3 py-2.5 rounded-xl font-medium transition-all text-left flex items-center',
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-orange-50'
                                    ]">
                                        <component :is="tab.icon" class="w-5 h-5 mr-2" />
                                        {{ tab.label }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Posts feed -->
                    <div class="lg:col-span-3">
                        <!-- Search and sort -->
                        <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div class="relative flex-1 max-w-md">
                                <svg class="w-5 h-5 text-orange-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <input v-model="searchQuery" type="text" placeholder="Поиск по форуму..."
                                    class="w-full pl-12 pr-4 py-3 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 shadow-sm">
                            </div>

                            <div class="flex items-center space-x-2">
                                <button @click="sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'"
                                    class="px-4 py-2.5 bg-white border border-orange-200 rounded-xl hover:bg-orange-50 transition-all duration-200 flex items-center space-x-2">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path v-if="sortOrder === 'desc'" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                    </svg>

                                </button>
                            </div>
                        </div>

                        <!-- Posts -->
                        <div v-if="loading" class="space-y-6">
                            <div v-for="n in 3" :key="n"
                                class="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 animate-pulse">
                                <div class="flex items-center space-x-3 mb-4">
                                    <div class="w-10 h-10 bg-orange-200 rounded-full"></div>
                                    <div class="flex-1">
                                        <div class="h-4 bg-orange-200 rounded w-1/4 mb-2"></div>
                                        <div class="h-3 bg-orange-100 rounded w-1/3"></div>
                                    </div>
                                </div>
                                <div class="h-5 bg-orange-200 rounded w-3/4 mb-3"></div>
                                <div class="space-y-2">
                                    <div class="h-3 bg-orange-100 rounded w-full"></div>
                                    <div class="h-3 bg-orange-100 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="filteredPosts.length > 0" class="space-y-6">
                            <transition-group name="list">
                                <div v-for="post in sortedPosts" :key="post.id"
                                    class="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-orange-100 hover:border-orange-200 transition-all duration-300 overflow-hidden">
                                    <div class="p-6">
                                        <!-- Post header -->
                                        <div class="flex items-start justify-between mb-4">
                                            <div class="flex items-center space-x-3">
                                                <div class="relative">
                                                    <div
                                                        class="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                                        {{ getUserInitialsFromEmail(post.user_email) }}
                                                    </div>
                                                    <div
                                                        class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="font-bold text-gray-800">{{
                                                        getDisplayNameFromEmail(post.user_email) }}</div>
                                                    <div class="text-sm text-gray-500 flex items-center">
                                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        {{ formatDate(post.created_at) }}
                                                    </div>
                                                </div>
                                            </div>

                                            <button v-if="post.user_id === user?.id"
                                                class="p-2 text-gray-400 hover:text-orange-500 transition-colors rounded-lg hover:bg-orange-50">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>

                                        <!-- Post content -->
                                        <div class="mb-6">
                                            <h3 class="text-xl font-bold text-gray-800 mb-3">{{ post.title }}</h3>
                                            <p class="text-gray-600 whitespace-pre-line leading-relaxed">{{ post.content
                                                }}</p>
                                        </div>

                                        <!-- Comments section -->
                                        <div class="border-t border-orange-100 pt-4">
                                            <div class="mb-4">
                                                <div class="flex items-center justify-between mb-3">
                                                    <div class="text-sm font-medium text-gray-700 flex items-center">
                                                        <svg class="w-5 h-5 mr-2 text-orange-500" fill="none"
                                                            stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                                                            </path>
                                                        </svg>
                                                        Комментарии ({{ post.comments?.length || 0 }})
                                                    </div>
                                                </div>

                                                <!-- Comment form -->
                                                <div v-if="user" class="flex space-x-3 mb-4">
                                                    <div
                                                        class="w-10 h-10 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                        {{ getUserInitials(user) }}
                                                    </div>
                                                    <div class="flex-1">
                                                        <input v-model="newComments[post.id]"
                                                            @keyup.enter="addComment(post.id)" type="text"
                                                            placeholder="Напишите комментарий..."
                                                            class="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 placeholder-gray-400" />
                                                    </div>
                                                    <button @click="addComment(post.id)"
                                                        :disabled="!newComments[post.id]"
                                                        class="px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg">
                                                        <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div v-else class="text-center py-4 px-3 bg-orange-50 rounded-xl">
                                                    <NuxtLink to="/login"
                                                        class="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center">
                                                        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                                            </path>
                                                        </svg>
                                                        Войдите, чтобы комментировать
                                                    </NuxtLink>
                                                </div>
                                            </div>

                                            <!-- Comments list -->
                                            <div v-if="post.comments && post.comments.length > 0" class="space-y-3">
                                                <div v-for="comment in post.comments" :key="comment.id"
                                                    class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                                                    <div class="flex items-start space-x-3">
                                                        <div
                                                            class="w-8 h-8 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full flex items-center justify-center text-orange-700 font-bold text-xs flex-shrink-0">
                                                            {{ getUserInitialsFromEmail(comment.user_email) }}
                                                        </div>
                                                        <div class="flex-1 min-w-0">
                                                            <div
                                                                class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                                                <div class="font-medium text-gray-700 text-sm">
                                                                    {{ getDisplayNameFromEmail(comment.user_email) }}
                                                                </div>
                                                                <div
                                                                    class="text-xs text-gray-500 whitespace-nowrap mt-1 sm:mt-0">
                                                                    {{ formatDate(comment.created_at) }}
                                                                </div>
                                                            </div>
                                                            <div class="text-gray-600 text-sm">{{ comment.content }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition-group>
                        </div>

                        <!-- Empty state -->
                        <div v-else class="text-center py-12 px-4">
                            <div
                                class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl mb-6">
                                <svg class="w-12 h-12 text-orange-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                                    </path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-gray-700 mb-2">Пока нет публикаций</h3>
                            <p class="text-gray-500 mb-8 max-w-md mx-auto">Будьте первым, кто поделится мыслями на
                                Форуме Квадрата!</p>
                            <div v-if="user" class="space-x-4">
                                <button @click="scrollToCreateForm()"
                                    class="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl font-medium">
                                    Создать первый пост
                                </button>
                            </div>
                            <div v-else class="space-x-4">
                                <NuxtLink to="/login"
                                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl font-medium">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                                        </path>
                                    </svg>
                                    Войти, чтобы создать пост
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Floating action button for mobile -->
                <div v-if="user" class="lg:hidden fixed bottom-6 right-6 z-40">
                    <button @click="scrollToCreateForm()"
                        class="p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Toast notification -->
        <div v-if="toast.show" :class="[
            'fixed bottom-4 right-4 z-50 px-6 py-4 rounded-xl shadow-xl transition-all duration-300 animate-slide-up',
            toast.type === 'success'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
        ]">
            <div class="flex items-center space-x-3">
                <svg v-if="toast.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <div class="font-medium">{{ toast.title }}</div>
                    <div class="text-sm opacity-90">{{ toast.message }}</div>
                </div>
                <button @click="toast.show = false" class="ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
// Отключаем общий layout
definePageMeta({
    layout: false,
})

// Иконки для вкладок
const TabAllIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`
}

const TabPopularIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>`
}

// Используем Supabase композаблы
const user = useSupabaseUser()
const supabase = useSupabaseClient()

// Состояние компонента
const posts = ref([])
const loading = ref(true)
const searchQuery = ref('')
const activeTab = ref('all')
const sortOrder = ref('desc')
const mobileMenuOpen = ref(false)

const newPost = ref({
    title: '',
    content: ''
})

const newComments = ref({})
const toast = ref({
    show: false,
    type: 'success',
    title: '',
    message: ''
})

// Вкладки
const tabs = [
    { id: 'all', label: 'Все посты', icon: TabAllIcon },
    { id: 'popular', label: 'Популярные', icon: TabPopularIcon }
]

// Загружаем посты при монтировании
onMounted(async () => {
    await fetchPosts()
})

// Показываем тост
const showToast = (type, title, message) => {
    toast.value = { show: true, type, title, message }
    setTimeout(() => {
        toast.value.show = false
    }, 5000)
}

// Получение инициалов пользователя
const getUserInitials = (user) => {
    if (!user) return '?'
    if (user.user_metadata?.full_name) {
        return user.user_metadata.full_name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }
    return user.email?.slice(0, 2).toUpperCase() || '?'
}

// Получение отображаемого имени
const getUserDisplayName = (user) => {
    if (!user) return 'Гость'
    if (user.user_metadata?.full_name) {
        return user.user_metadata.full_name
    }
    if (user.user_metadata?.name) {
        return user.user_metadata.name
    }
    // Извлекаем имя из email
    return user.email?.split('@')[0] || 'Пользователь'
}

// Получение инициалов из email
const getUserInitialsFromEmail = (email) => {
    if (!email) return '?'
    return email.slice(0, 2).toUpperCase()
}

// Получение имени из email
const getDisplayNameFromEmail = (email) => {
    if (!email) return 'Аноним'
    return email.split('@')[0]
}

// Получение постов
async function fetchPosts() {
    loading.value = true
    try {
        const { data, error } = await supabase
            .from('forum_posts')
            .select(`
        *,
        comments:forum_comments(*)
      `)
            .order('created_at', { ascending: false })

        if (error) throw error
        posts.value = data || []
        console.log('Загружено постов:', posts.value.length)
    } catch (error) {
        console.error('Error fetching posts:', error)
        showToast('error', 'Ошибка', 'Не удалось загрузить посты')
        posts.value = []
    } finally {
        loading.value = false
    }
}

// Фильтрация и сортировка постов
const filteredPosts = computed(() => {
    let filtered = [...posts.value]

    // Фильтрация по поиску
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.user_email?.toLowerCase().includes(query)
        )
    }

    // Фильтрация по вкладке
    if (activeTab.value === 'popular') {
        filtered = filtered.sort((a, b) =>
            (b.comments?.length || 0) - (a.comments?.length || 0)
        )
    }

    return filtered
})

const sortedPosts = computed(() => {
    const sorted = [...filteredPosts.value]
    if (sortOrder.value === 'desc') {
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else {
        return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    }
})

// Выход
async function handleLogout() {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error

        showToast('success', 'Выход', 'Вы успешно вышли из аккаунта')

        // Редирект на форум для обновления состояния
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    } catch (error) {
        console.error('Error logging out:', error)
        showToast('error', 'Ошибка', 'Не удалось выйти из аккаунта')
    }
}

// Создание поста
async function createPost() {
    if (!user.value) {
        navigateTo('/login')
        return
    }

    if (!newPost.value.title.trim() || !newPost.value.content.trim()) {
        showToast('error', 'Ошибка', 'Заполните заголовок и содержание')
        return
    }

    loading.value = true
    try {
        const { data, error } = await supabase
            .from('forum_posts')
            .insert({
                title: newPost.value.title.trim(),
                content: newPost.value.content.trim(),
                user_id: user.value.id,
                user_email: user.value.email,
                user_name: user.value.user_metadata?.full_name ||
                    user.value.user_metadata?.name ||
                    user.value.email?.split('@')[0]
            })
            .select()

        if (error) {
            console.error('Supabase error:', error)
            throw new Error(error.message || 'Ошибка при создании поста')
        }

        if (data && data[0]) {
            data[0].comments = []
            posts.value.unshift(data[0])
            newPost.value = { title: '', content: '' }

            showToast('success', 'Успех!', 'Пост успешно опубликован')
        }
    } catch (error) {
        console.error('Error creating post:', error)
        showToast('error', 'Ошибка', error.message || 'Не удалось создать пост')
    } finally {
        loading.value = false
    }
}

// Добавление комментария
async function addComment(postId) {
    if (!user.value) {
        navigateTo('/login')
        return
    }

    const commentText = newComments.value[postId]?.trim()
    if (!commentText) return

    try {
        const { data, error } = await supabase
            .from('forum_comments')
            .insert({
                post_id: postId,
                content: commentText,
                user_id: user.value.id,
                user_email: user.value.email
            })
            .select()

        if (error) throw error

        if (data && data[0]) {
            // Находим пост и добавляем комментарий
            const postIndex = posts.value.findIndex(p => p.id === postId)
            if (postIndex !== -1) {
                if (!posts.value[postIndex].comments) {
                    posts.value[postIndex].comments = []
                }
                posts.value[postIndex].comments.push(data[0])

                // Обновляем реактивность
                posts.value = [...posts.value]
            }
            newComments.value[postId] = ''

            showToast('success', 'Комментарий', 'Комментарий успешно добавлен')
        }
    } catch (error) {
        console.error('Error adding comment:', error)
        showToast('error', 'Ошибка', 'Не удалось добавить комментарий')
    }
}

// Прокрутка к форме создания
function scrollToCreateForm() {
    if (!user.value) {
        navigateTo('/login')
        return
    }

    const formElement = document.querySelector('input[placeholder="О чем хотите рассказать?"]')
    if (formElement) {
        formElement.focus()
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}

// Форматирование даты
function formatDate(dateString) {
    try {
        const date = new Date(dateString)
        const now = new Date()
        const diff = now - date

        if (diff < 60000) return 'только что'
        if (diff < 3600000) return `${Math.floor(diff / 60000)} мин. назад`

        if (date.toDateString() === now.toDateString()) {
            return `сегодня в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
        }

        const yesterday = new Date(now)
        yesterday.setDate(yesterday.getDate() - 1)
        if (date.toDateString() === yesterday.toDateString()) {
            return 'вчера'
        }

        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
        })
    } catch (error) {
        return dateString
    }
}

// Вычисляемые свойства для статистики
const todayPosts = computed(() => {
    const today = new Date().toDateString()
    return posts.value.filter(post =>
        new Date(post.created_at).toDateString() === today
    ).length
})

const uniqueUsers = computed(() => {
    const emails = posts.value.map(post => post.user_email)
    return [...new Set(emails)].length
})

const totalComments = computed(() => {
    return posts.value.reduce((total, post) => {
        return total + (post.comments?.length || 0)
    }, 0)
})
</script>

<style>
/* Анимации */
@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(100%);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-in {
    animation: slide-in 0.3s ease-out;
}

.animate-slide-up {
    animation: slide-up 0.3s ease-out;
}

/* Стили для transition-group */
.list-move {
    transition: transform 0.3s ease;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

/* Кастомный скроллбар */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #fef3c7;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #f97316, #f59e0b);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #ea580c, #d97706);
}

/* Улучшенный selection */
::selection {
    background-color: rgba(249, 115, 22, 0.3);
    color: #7c2d12;
}

/* Оптимизация для touch devices */
@media (max-width: 640px) {
    .touch\:active\:scale-95:active {
        transform: scale(0.95);
    }
}

/* Улучшенный focus для доступности */
:focus-visible {
    outline: 2px solid #f97316;
    outline-offset: 2px;
}
</style>