export class Collector<K, C, V> {
  collector: Map<K, C>;
  init: () => C;
  collect: (container: C, value: V) => void;

  constructor(init: () => C, collect: (container: C, value: V) => void) {
    this.collector = new Map<K, C>();
    this.init = init;
    this.collect = collect;
  }

  has(key: K): boolean {
    return this.collector.has(key);
  }

  add(key: K, value: V) {
    if (!this.collector.has(key)) this.collector.set(key, this.init());

    this.collect(this.collector.get(key)!, value);
  }
}
