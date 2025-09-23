// export function timeAgo(dateString: string) {
//     const date = new Date(dateString);
//     const now = new Date();

//     // Difference in ms
//     let diff = now - date;

//     if (diff < 0) return "in the future"; // just in case

//     // Convert to seconds
//     let seconds = Math.floor(diff / 1000);

//     const years = Math.floor(seconds / (365 * 24 * 60 * 60));
//     seconds -= years * 365 * 24 * 60 * 60;

//     const months = Math.floor(seconds / (30 * 24 * 60 * 60));
//     seconds -= months * 30 * 24 * 60 * 60;

//     const days = Math.floor(seconds / (24 * 60 * 60));
//     seconds -= days * 24 * 60 * 60;

//     const hours = Math.floor(seconds / 3600);
//     seconds -= hours * 3600;

//     const minutes = Math.floor(seconds / 60);
//     seconds -= minutes * 60;

//     const parts = [];
//     if (years) parts.push(`${years} year${years > 1 ? "s" : ""}`);
//     if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
//     if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
//     if (hours && parts.length === 0) parts.push(`${hours} hr${hours > 1 ? "s" : ""}`);
//     if (minutes && parts.length === 0) parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
//     if (seconds && parts.length === 0) parts.push(`${seconds} sec${seconds > 1 ? "s" : ""}`);

//     return parts.length > 0 ? parts.join(" ") + " ago" : "just now";
// }


export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    // Difference in ms
    let diff = now.getTime() - date.getTime();

    if (diff < 0) return "in the future"; // just in case

    // Convert to seconds
    let seconds = Math.floor(diff / 1000);

    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    seconds -= years * 365 * 24 * 60 * 60;

    const months = Math.floor(seconds / (30 * 24 * 60 * 60));
    seconds -= months * 30 * 24 * 60 * 60;

    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * 24 * 60 * 60;

    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;

    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    const parts: string[] = [];
    if (years) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours && parts.length === 0) parts.push(`${hours} hr${hours > 1 ? "s" : ""}`);
    if (minutes && parts.length === 0) parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
    if (seconds && parts.length === 0) parts.push(`${seconds} sec${seconds > 1 ? "s" : ""}`);

    return parts.length > 0 ? parts.join(" ") + " ago" : "just now";
}
