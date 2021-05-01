export default function formatPrice(value, { locale = "en-US", currency = "USD" } = {}) {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}
