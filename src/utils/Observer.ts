type Listener<T> = (data: T) => void;
type Subscription = () => void;

export interface ObserverInterface<T extends any> {
  notify(data: T): void;
  subscribe(listener: Listener<T>): Subscription;
}

export default class Observer<T extends any> implements ObserverInterface<T> {
  private listeners: Listener<T>[];

  constructor() {
    this.listeners = [];
  }

  public notify(data?: T): void {
    this.listeners.forEach(listener => {
      listener(data as T);
    });
  }

  public subscribe(listener: Listener<T>): Subscription {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter(_listener => _listener !== listener);
    };
  }
}
