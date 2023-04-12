// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const sidebar = require('./sidebars')
const abbreviations = require('./src/remark/abbreviations')
const math = require('remark-math')
const katex = require('rehype-katex')

/** @returns {import('@docusaurus/types').Config} */
async function createConfig() {
  const mdxMermaid = await import('mdx-mermaid')

  return {
    staticDirectories: ['static'],
    scripts: [
      {
        src: '/scripts/init.js',
        async: true,
      },
    ],
    title: 'Snowplow Documentation',
    tagline:
      'Build, deploy, and scale your next data creation project using Snowplow.',
    url: 'https://docs.snowplow.io',
    baseUrl: '/',
    // reset this back to throw, set to warn so that site builds
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'throw',
    favicon: 'img/favicon.ico',
    trailingSlash: true,
    organizationName: 'snowplow',
    projectName: 'documentation',
    deploymentBranch: 'main',
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },

    clientModules: [
      require.resolve('./cookieConsent.js'),
      require.resolve('./snowplow.js'),
      require.resolve('./google.js'),
    ],

    themes: ['@saucelabs/theme-github-codeblock'],

    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        {
          docs: {
            showLastUpdateTime: true,
            editUrl: 'https://github.com/snowplow/documentation/tree/main/',
            remarkPlugins: [mdxMermaid.default, abbreviations, math],
            rehypePlugins: [katex],
            async sidebarItemsGenerator({
              defaultSidebarItemsGenerator,
              ...args
            }) {
              return sidebar.swapDocItemsToLinkItems(
                await defaultSidebarItemsGenerator(args),
                args.docs
              )
            },
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        },
      ],
    ],

    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        docs: {
          sidebar: {
            autoCollapseCategories: true,
            hideable: true,
          },
        },
        navbar: {
          logo: {
            alt: 'Snowplow Logo',
            src: 'img/snowplow-logo.svg',
          },
          items: [
            {
              type: 'doc',
              docId: 'introduction',
              position: 'left',
              className: 'nav-link__first',
              label: 'Docs',
            },
            {
              href: 'https://discourse.snowplow.io',
              label: 'Discourse',
              position: 'left',
            },
            {
              href: 'https://github.com/snowplow/',
              label: 'GitHub',
              position: 'left',
            },
            {
              to: 'https://try.snowplowanalytics.com/?utm_content=hero-cta&utm_campaign=snowplow-docs',
              label: 'Try Snowplow',
              className: 'snwpl-nav-button',
              position: 'right',
            },
            {
              to: 'https://go.snowplowanalytics.com/l/571483/2021-02-19/3sn5nml',
              label: 'Book a demo',
              className: 'snwpl-nav-button',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              label: 'Change cookie preferences',
              href: '/cookie-preferences',
            },
            {
              label: 'Terms and conditions',
              href: '/terms-and-conditions',
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} Snowplow Analytics Ltd. Built with Docusaurus.`,
        },
        prism: {
          theme: require('prism-react-renderer/themes/shadesOfPurple'),
          // Docusaurus comes with a subset of commonly used languages -https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js.
          // To add syntax highlighting for additional Prism supported languages, add reference from https://prismjs.com/#supported-languages.
          // NOTE: do a `yarn build` to ensure that it does build properly
          additionalLanguages: [
            'arduino',
            'csharp',
            'dart',
            'docker',
            'gradle',
            'hcl',
            'java',
            'lua',
            'php',
            'properties',
            'r',
            'ruby',
            'scala',
            'swift',
            'brightscript',
            'rust',
            'toml',
            'django',
            'yaml',
            'kotlin',
          ],
        },
        algolia: {
          appId: '9HS3C2MKTH',
          apiKey: 'f22e24c1b333034a75914759b0f045c3',
          indexName: 'snowplow',
          contextualSearch: true,
        },
      }),
  }
}

module.exports = createConfig
