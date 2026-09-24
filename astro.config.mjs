import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://uminosign.nagoyc.stki.org',
  base: '/',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'ja',
    locales: [
      'ja',     // 日本語（既定）
      'en',     // 英語
      'zh-tw',  // 繁體中文（台湾・香港）
      'zh-cn',  // 簡体中文（中国本土）
      'ko',     // 韓国語
      'es'      // スペイン語
    ],
    routing: {
      prefixDefaultLocale: false // 日本語は / のまま、多言語のみ /en/ や /ko/ が付く
    }
  },
  integrations: [sitemap()]
});
