export const slugify = (text: string = '') => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric ko "-" me convert karega
        .replace(/(^-|-$)+/g, '');   // start/end ke "-" remove karega
}