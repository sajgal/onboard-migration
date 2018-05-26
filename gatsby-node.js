const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('src/templates/page.js')
    const blogPostTemplate = path.resolve('src/templates/blog-post.js');

    graphql(`
      {
        allContentfulPage(limit: 100) {
          edges {
            node {
              id
              slug
              node_locale
            }
          }
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allContentfulPage.edges.forEach(edge => {
          createPage({
            path: `/${edge.node.node_locale}/${edge.node.slug}/`,
            component: pageTemplate,
            context: {
              slug: edge.node.slug,
              id: edge.node.id,
              langKey: edge.node.node_locale,
            },
          })
        })
        return
      })
      .then(() => {
        graphql(`
        {
          allContentfulBlog(limit: 100) {
            edges {
              node {
                id
                slug
                node_locale
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulBlog.edges.forEach(edge => {
          createPage({
            path: `/${edge.node.node_locale}/blog/${edge.node.slug}/`,
            component: blogPostTemplate,
            context: {
              slug: edge.node.slug,
              langKey: edge.node.node_locale,
            }
          });
        });
        return;
      })
      })

    resolve()
  })
}
