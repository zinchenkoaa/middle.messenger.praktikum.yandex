export class EventBus {
    listeners: { [key: string]: any[] };

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: any): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: any): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener: any) => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener: any) => {
            if (typeof listener === 'function') {
                listener(...args);
            }
        });
    }

    once(event: string, callback: any): void {
        const wrapper = (...args: any[]): void => {
            callback(...args);
            this.off(event, wrapper); 
        };
        
        this.on(event, wrapper);
    }
}
