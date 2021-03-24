export function bindThis(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const adjMethod = originalMethod.bind(this)
            return adjMethod
        }
    }
    return adjDescriptor
}