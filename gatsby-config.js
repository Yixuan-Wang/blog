module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: `Pak`,
    description: `This is a blоg, not a blοg.`,
    author: `@Yixuan-Wang`,
    quarter: [`posts`, `sheets`, `talks`, `others`],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/contents/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sheets`,
        path: `${__dirname}/contents/sheets`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Yaml`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- more -->`,
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              maintainCase: true,
              removeAccents: false,
              enableCustomId: true,
              elements: [`h2`, `h3`],
            },
          }, // Must come before prismjs
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: { sh: 'bash' },
              noInlineHighlight: true,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-katex`,
        ],
      },
    },
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pak`,
        short_name: `Pak`,
        start_url: `/`,
        background_color: `#253137`,
        theme_color: `#FFE900`,
        display: `standalone`,
        icon: `static/icon.png`,
        lang: `zh-Hans`,
        theme_color_in_head: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: `src/helpers/sw-append.js`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
  ],
};
