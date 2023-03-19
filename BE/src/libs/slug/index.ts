import slugify from 'slugify';
import { v4 } from 'uuid';

const config = {
  replacement: '-',
  lower: true,
};
export function makeSlug() {
  function create(name: string) {
    return slugify(name, config);
  }

  function random(name: string) {
    const uid = v4().split('-')[0];

    const slugRan = create(name) + config.replacement + uid;

    return slugRan;
  }

  return { create, random };
}
