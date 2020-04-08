import React from "react"
import { graphql } from "gatsby"
import * as random from "random"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Widget from "../components/widget"

import logo from "../images/logo-name.png"

export default ({ data }) => {
  function getRandomPost() {
    var idx = random.int(0, data.allPosts.edges.length - 1)
    return data.allPosts.edges[idx].node
  }

  function getImageFromPost(post) {
    var defaultImg = "https://bulma.io/images/placeholders/1280x960.png;"
    return post && post.image ? post.image.file.url : defaultImg
  }

  var freshPost = data.newestPosts.nodes[0]
  var insiderPost = data.insiderPosts.nodes[0]
  var stylePost = data.nokternelStyleGuide
  var devlogPost = data.projectAscendantDevlog
  var beginnerPost = data.beginnersGuide;

  return (
    <Layout>
      <SEO title="Unrealistic" />
      <div className="level">
        <div className="container">
          <div className="content has-text-centered">
            <figure
              className="image"
              style={{
                maxWidth: "512px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: ".5vmin",
              }}
            >
              <img src={logo} alt="logo" />
            </figure>
            <p style={{ fontStyle: "italic" }}>
              A place to learn about Unreal Engine 4,
              <br /> gamedev, and chasing your dreams
            </p>
          </div>
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-vertical">
          <div className="tile">
            <div className="tile is-parent is-9">
              <div className="tile is-child">
                <Widget
                  title={freshPost.title}
                  subtitle="Fresh Off the Press"
                  image={getImageFromPost(freshPost)}
                  to={freshPost.slug}
                  fullheight
                />
              </div>
            </div>
            <div className="tile is-parent is-vertical">
              <div className="tile is-child">
                <Widget
                  title={insiderPost.title}
                  subtitle="Insider Insight"
                  image={getImageFromPost(insiderPost)}
                  to={insiderPost.slug}
                />
              </div>
              <div className="tile is-child">
                <Widget
                  title={stylePost.title}
                  subtitle="Style"
                  image={stylePost.image.file.url}
                  to={stylePost.slug}
                />
              </div>
            </div>
          </div>
          <div className="tile">
            <div className="tile is-parent is-vertical is-4">
              <div className="tile is-child">
                <Widget
                  to={devlogPost.slug}
                  title="Project Ascendant"
                  subtitle="Devlog"
                  image={getImageFromPost(devlogPost)}
                />
              </div>
              <div className="tile is-child">
                <Widget
                  to={getRandomPost().slug}
                  title="Learn something new"
                  subtitle="Random"
                  image="https://cdn.vox-cdn.com/thumbor/2PaCKdhf1dUhQkcGE9P-pMwKcJQ=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/8587203/overwatch_loot_box.jpg"
                />
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                <Widget
                  to={beginnerPost.slug}
                  title="Build a tower defense game from top to bottom in 21 days."
                  subtitle="Beginner's Guide"
                  image={getImageFromPost(beginnerPost)}
                  fullheight
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        tipOfTheWeek
      }
    }
    allPosts: allContentfulBlogPost {
      edges {
        node {
          slug
          title
          id
          image {
            file {
              url
            }
          }
        }
      }
    }
    newestPosts: allContentfulBlogPost(
      filter: { tags: { nin: ["insider", "devlog", "series", "nokternel-style-guide"] } }
      sort: { fields: createdAt, order: DESC }
    ) {
      nodes {
        slug
        title
        image {
          file {
            url
          }
        }
      }
    }
    insiderPosts: allContentfulBlogPost(
      filter: { tags: { in: "insider" } }
      sort: { fields: createdAt, order: DESC }
    ) {
      nodes {
        slug
        title
        image {
          file {
            url
          }
        }
      }
    }
    editorPosts: allContentfulBlogPost(
      filter: { tags: { in: "editor" } }
      sort: { fields: createdAt, order: DESC }
    ) {
      nodes {
        slug
        title
        image {
          file {
            url
          }
        }
      }
    }
    nokternelStyleGuide: contentfulBlogPost(slug: { eq: "nokternel-style-guide" }) {
      title
      slug
      image {
        file {
          url
        }
      }
    }    
    projectAscendantDevlog: contentfulBlogPost(slug: { eq: "devlog-project-ascendant" }) {
      slug
      image {
        file {
          url
        }
      }
    }
    beginnersGuide: contentfulBlogPost(
      series: { eq: "Beginner's Guide" }
      seriesNum: { eq: 0 }
    ) {
      title
      slug
      image {
        file {
          url
        }
      }
    }
  }
`
