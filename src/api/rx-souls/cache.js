import { shareReplay } from 'rxjs/operators';

const CACHE_SIZE = 1;
const DEFAULT_OPTIONS = {
  ttl: 0
};

// https://blog.thoughtram.io/angular/2018/03/05/advanced-caching-with-rxjs.html
class ObservableCache {
  cache = new Map();

  get(key, fetcher, options = {}) {
    const { ttl } = { ...options, ...DEFAULT_OPTIONS };
    const date = new Date();
    const source = fetcher.pipe(shareReplay(CACHE_SIZE));

    if (!this.cache.get(key)) {
      this.cache.set(key, {
        ttl,
        date,
        source
      });
    }

    const { date: keyDate, ttl: keyTtl } = this.cache.get(key);

    if (keyTtl > 0 && date - keyDate > keyTtl) {
      this.cache.set(key, {
        ttl,
        date,
        source
      });
    }

    return this.cache.get(key).source;
  }
}

export default new ObservableCache();
