export function mapOptional<T>([value]: [T] | []) {
    return value; 
};

export function reverseOptional<T>(value: T | undefined) {
    return value ? [value] : [];
}
