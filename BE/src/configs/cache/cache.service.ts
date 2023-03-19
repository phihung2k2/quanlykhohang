import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findOrCreateToken(key: string, value?: string) {
    const val = await this.cacheManager.get(key);
    if (val) {
      return true;
    }

    await this.cacheManager.set(key, value, 50000);
    return false;
  }

  genKeyFromParam(arg) {
    arg = JSON.stringify(arg);
    arg = arg.replaceAll(':', '_')
    arg = arg.replaceAll(/[^\w\s,]/gi, '')
    arg = arg.replaceAll(',', '-')
    return arg
  }

  async deleteKeysByPattern(pattern, redis) {
    let cursor = '0';
    do {
      const [newCursor, keys] = await redis.scan(cursor, 'MATCH', pattern);
      cursor = newCursor;
      for (const key of keys) {
        await redis.del(key);
      }

    } while (cursor !== '0');
  }

  async clearCache(cacheKey: string) {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(cacheKey)) {
        this.cacheManager.del(key);
      }
    });
  }
}
