export default interface PurchaseProps {
    className?: string
    testId?: string
    id: string
    totalAmount: number
    paidAmount: number
    paidAmountCrypto: number
    purchaseDate: string
    paymentMethod: string
    paymentCurrency: string
    productName: string
    productCurrency: string
}
