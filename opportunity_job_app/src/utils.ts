export function mapStringToLocalDateString(dateString: string) {
    return new Date(Date.parse(dateString)).toLocaleDateString("de");
}
