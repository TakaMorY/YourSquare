// server/api/payment/create.js
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { courseId, userId, amount } = body

    // Конфигурация ЮKassa
    const yookassa = require('@yookassa/payment-sdk-node')
    const payment = new yookassa.Payment({
        amount: {
            value: amount,
            currency: 'RUB'
        },
        confirmation: {
            type: 'redirect',
            return_url: 'https://your-square.vercel.app/payment/success'
        },
        description: `Оплата курса ${courseId}`,
        metadata: {
            courseId,
            userId
        }
    })

    try {
        const paymentResponse = await payment.create()

        // Сохраняем платеж в БД
        const { data, error } = await supabase
            .from('payments')
            .insert([{
                user_id: userId,
                course_id: courseId,
                amount: amount,
                payment_id: paymentResponse.id,
                status: 'pending'
            }])

        if (error) throw error

        return {
            success: true,
            paymentId: paymentResponse.id,
            confirmationUrl: paymentResponse.confirmation.confirmation_url
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
})