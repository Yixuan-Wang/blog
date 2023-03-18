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
    if (!this.collector.has(key))
      this.collector.set(key, this.init());

    this.collect(this.collector.get(key)!, value);
  }

  map<R>(f: (_: C) => R): () => Generator<[K, R]> {
    const collectors = this.collector.entries();
    return function*() {
      for (const [k, c] of collectors)
        yield [k, f(c)] as [K, R];
    };
  }

  toObject(): Record<K | any, C> {
    return Object.fromEntries(this.collector.entries());
  }

  toArray(): C[] {
    return Array.from(this.collector.values());
  }

  stringify() {
    let peek: C | undefined;
    for (const val of this.collector.values()) {
      peek = val;
      break;
    }

    if (!peek) {
      return {};
    }
    else if (peek instanceof Set) {
      const pairs = [];
      for (const [key, container] of this.collector.entries())
        pairs.push(`${JSON.stringify(key)}:new Set(${JSON.stringify(Array.from((container as Set<V>).values()))})`);

      return `{${pairs.join(",")}}`;
    }
    else if (peek instanceof Map) {
      const pairs = [];
      for (const [key, container] of this.collector.entries())
        pairs.push(`${JSON.stringify(key)}: new Map(${JSON.stringify(Array.from((container as Map<any, V>).entries()))})`);

      return `{${pairs.join(",")}}`;
    }
    else { return JSON.stringify(this.toObject()); }
  }
}
