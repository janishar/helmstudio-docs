import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';

export default defineConfig({
  site: 'https://helmstudio.in',
  integrations: [
    starlight({
      title: 'helmstudio',
      description: 'A local-first studio for images, video and sound on your own Mac and NVIDIA machines.',
      logo: { dark: './src/assets/logo-dark.svg', light: './src/assets/logo-light.svg', replacesTitle: true },
      favicon: '/favicon.svg',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/janishar/helmstudio' }],
      editLink: { baseUrl: 'https://github.com/janishar/helmstudio-docs/edit/main/' },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/bricolage-grotesque',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/theme.css',
      ],
      plugins: [
        starlightLinksValidator({ exclude: ['/reference/http/', '/reference/http/**/*'] }),
        starlightOpenAPI([
          {
            base: 'reference/http',
            schema: './openapi/openapi.yaml',
            sidebar: { label: 'HTTP API reference', operations: { labels: 'path', badges: true } },
          },
        ]),
      ],
      sidebar: [
        { label: 'Start here', items: [{ autogenerate: { directory: 'start' } }] },
        { label: 'Using the studio', items: [{ autogenerate: { directory: 'studio' } }] },
        { label: 'Models', items: [{ autogenerate: { directory: 'models' } }] },
        { label: 'Agents and MCP', items: [{ autogenerate: { directory: 'mcp' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }, ...openAPISidebarGroups] },
        { label: 'Help', items: [{ autogenerate: { directory: 'help' } }] },
      ],
    }),
  ],
});
