const path = require(`path`);
const router = require(`./src/scripts/router`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const query = await graphql(
    `
      {
        allContentfulPost {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulPlugin {
          edges {
            node {
              name
            }
          }
        }
        glossaryLists: allContentfulList(filter: { tags: { in: "glossary" } }) {
          nodes {
            id
            references {
              id
              slug
            }
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const postTemplate = path.resolve(`./src/templates/post.js`);
  query.data.allContentfulPost.edges.forEach(({ node }) => {
    const { slug } = node;
    const path = router.getPostSlug(slug);
    console.log("Creating page: " + path);
    createPage({
      path,
      component: postTemplate,
      context: {
        slug: slug
      }
    });
  });

  const pluginTemplate = path.resolve(`./src/templates/plugin.js`);
  query.data.allContentfulPlugin.edges.forEach(({ node }) => {
    const { name } = node;
    const path = router.getProductSlug(name.toLowerCase());
    console.log("Creating page: " + path);
    createPage({
      path,
      component: pluginTemplate,
      context: {
        name: name
      }
    });
  });

  const definedTermTemplate = path.resolve(`./src/templates/definedterm.js`);
  query.data.glossaryLists.nodes.forEach(({ id, references }) => {
    const categoryId = id;
    references.forEach(({ id, slug }) => {
      const path = `/glossary/${slug}`;
      console.log("Creating page: " + path);
      createPage({
        path,
        component: definedTermTemplate,
        context: {
          categoryId: categoryId,
          id: id
        }
      });
    });
  });
};
