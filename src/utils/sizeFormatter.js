export default (size) => {
    if (size > 1024 * 1024 * 1024) {
        return (size / (1024 * 1024 * 1024)).toFixed(1) + " Gb"
    }
    if (size > 1024 * 1024) {
        return (size / (1024 * 1024)).toFixed(1) + " Mb"
    }
    if (size > 1024) {
        return (size / (1024)).toFixed(1) + " Kb"
    }
    return size + " B"
}

export function percent(size) {
    console.log(100 - Math.round(((10737418240 - size) / 10737418240)))
    return 100 - Math.round((((1024*1024) - size) / 10737418240));
}