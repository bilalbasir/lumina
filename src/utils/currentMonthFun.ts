export const isCurrentMonth = (dateStr: string) => {
    if (!dateStr) return false
    const d = new Date(dateStr) // parses 2025-03-16T14:04:04.075+00:00
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
}
