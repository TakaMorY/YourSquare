<template>

    <!-- Секция "Форум" -->
    <section class="forum-section">
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">Форум <span class="accent">сообщества</span></h2>
                <p class="section-subtitle">Место для общения, советов и дискуссий</p>
            </div>

            <div class="forum-features">
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                                stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <h3>Обсуждения на любой вкус</h3>
                    <p>От настольных игр до подготовки к ЕГЭ — находи темы по своим интересам</p>
                    <ul class="feature-tags">
                        <li>Игры</li>
                        <li>Учеба</li>
                        <li>Музыка</li>
                        <li>Спорт</li>
                        <li>Кино</li>
                    </ul>
                </div>

                <div class="feature-card">
                    <div class="feature-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                                stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <h3>Анонимные вопросы</h3>
                    <p>Задавай сокровенные вопросы без страха быть узнанным</p>
                    <ul class="feature-list">
                        <li>Конфиденциальность гарантирована</li>
                        <li>Ответы от сверстников и экспертов</li>
                        <li>Модерация контента 24/7</li>
                    </ul>
                </div>

                <div class="feature-card">
                    <div class="feature-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <h3>Проверенные советы</h3>
                    <p>Получай реальные рекомендации от таких же подростков</p>
                    <ul class="feature-list">
                        <li>Лайфхаки для учебы</li>
                        <li>Советы по отношениям</li>
                        <li>Карьерные возможности</li>
                    </ul>
                </div>
            </div>

            <div class="forum-cta">
                <h3>Уже есть аккаунт? Присоединяйся к обсуждениям!</h3>
                <div class="forum-actions">
                    <NuxtLink to="/forum" class="btn btn-primary">
                        <span>Перейти на форум</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19 12H4.75" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </NuxtLink>
                    <NuxtLink to="/forum/rules" class="btn btn-outline">
                        <span>Правила сообщества</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>



</template>



<style scoped>
/* Секция "Форум" - Темная тема */
.forum-section {
    padding: 6rem 0;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    position: relative;
    overflow: hidden;
}

/* Добавляем декоративные элементы для темного фона */
.forum-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(circle, rgba(249, 115, 22, 0.05) 0%, transparent 70%);
    z-index: 0;
}

.forum-section::after {
    content: '';
    position: absolute;
    bottom: -50%;
    left: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
    z-index: 0;
}

.section-container {
    position: relative;
    z-index: 1;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #f8fafc;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-title .accent {
    background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-subtitle {
    font-size: 1.125rem;
    color: #94a3b8;
    font-weight: 400;
}

.forum-features {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto 4rem;
}

@media (min-width: 768px) {
    .forum-features {
        grid-template-columns: repeat(3, 1fr);
    }
}

.feature-card {
    background: rgba(30, 41, 59, 0.8);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(71, 85, 105, 0.3);
    box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    height: 100%;
    position: relative;
    backdrop-filter: blur(10px);
    overflow: hidden;
}

.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #f97316, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-8px);
    box-shadow:
        0 12px 40px rgba(249, 115, 22, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    border-color: rgba(249, 115, 22, 0.4);
    background: rgba(30, 41, 59, 0.95);
}

.feature-card:hover::before {
    opacity: 1;
}

.feature-icon {
    width: 64px;
    height: 64px;
    background: rgba(249, 115, 22, 0.15);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(249, 115, 22, 0.2);
    transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
    background: rgba(249, 115, 22, 0.25);
    border-color: rgba(249, 115, 22, 0.4);
    transform: scale(1.05);
}

.feature-icon svg {
    color: #f97316;
}

.feature-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 1rem;
    line-height: 1.3;
}

.feature-card p {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
}

.feature-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
}

.feature-tags li {
    background: rgba(249, 115, 22, 0.15);
    color: #fed7aa;
    padding: 0.375rem 0.75rem;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 1px solid rgba(249, 115, 22, 0.2);
}

.feature-tags li:hover {
    background: rgba(249, 115, 22, 0.3);
    color: #fff7ed;
    transform: translateY(-1px);
    border-color: rgba(249, 115, 22, 0.4);
}

.feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.feature-list li {
    padding: 0.5rem 0;
    color: #cbd5e1;
    position: relative;
    padding-left: 1.5rem;
    transition: color 0.3s ease;
}

.feature-list li:hover {
    color: #f1f5f9;
}

.feature-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #f97316;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1;
    transition: transform 0.3s ease;
}

.feature-list li:hover::before {
    transform: translateX(3px);
}

.forum-cta {
    background: rgba(15, 23, 42, 0.9);
    border-radius: 24px;
    padding: 3rem;
    text-align: center;
    border: 1px solid rgba(249, 115, 22, 0.3);
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.forum-cta::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
        radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    z-index: 0;
}

.forum-cta>* {
    position: relative;
    z-index: 1;
}

.forum-cta h3 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 2rem;
    line-height: 1.3;
}

.forum-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

/* Стилизация кнопок для темной темы */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: 2px solid transparent;
    outline: none;
    position: relative;
    overflow: hidden;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s;
}

.btn:hover::before {
    left: 100%;
}

.btn-primary {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
}

.btn-outline {
    background: transparent;
    color: #f8fafc;
    border: 2px solid rgba(248, 250, 252, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-outline:hover {
    border-color: #f97316;
    color: #f97316;
    box-shadow: 0 4px 15px rgba(249, 115, 22, 0.2);
    transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 768px) {
    .forum-section {
        padding: 4rem 0;
    }

    .forum-features {
        gap: 1.5rem;
        padding: 0 1rem;
    }

    .feature-card {
        padding: 1.5rem;
    }

    .forum-cta {
        padding: 2rem 1.5rem;
        margin: 0 1rem;
    }

    .forum-cta h3 {
        font-size: 1.5rem;
    }

    .section-title {
        font-size: 2rem;
    }
}

@media (max-width: 480px) {
    .forum-features {
        grid-template-columns: 1fr;
    }

    .forum-actions {
        flex-direction: column;
        width: 100%;
    }

    .btn {
        width: 100%;
    }
}

/* Дополнительные декоративные элементы */
.feature-card:nth-child(2) {
    animation-delay: 0.1s;
}

.feature-card:nth-child(3) {
    animation-delay: 0.2s;
}

/* Анимация появления */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.feature-card {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
}

/* Эффект свечения для заголовка */
.section-title {
    position: relative;
    display: inline-block;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #f97316, transparent);
    opacity: 0.5;
}
</style>