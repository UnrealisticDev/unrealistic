import React, { useState } from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import GitHubButton from "react-github-btn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlgolia } from "@fortawesome/free-brands-svg-icons";

import Layout from "../components/layout";
import SEO from "../components/seo";

import { connectHits, InstantSearch } from "react-instantsearch-dom";
import searchClient from "../components/search/client";
import SearchBox from "../components/search/searchbox";
import HitCount, { countHit } from "../components/spectacle/hitcount";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const Title = styled.h1`
  @font-face {
    font-family: "basic-sans";
    src: url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("woff2"),
      url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("woff"),
      url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("opentype");
    font-style: normal;
    font-weight: 900;
    font-display: auto;
  }
  font-family: "basic-sans", sans-serif;
  color: #363636;

  margin-bottom: 5vh !important;
`;

const SSearchBox = styled(SearchBox)`
  margin-bottom: 1rem;
`;

const HitType = styled.h2`
  ${"" /* font-family: "Lato", sans-serif; */}
  font-family: 'Bungee', cursive;
  color: #363636;
  display: inline-block;
  margin-top: 2rem;
  margin-bottom: 1rem;
  ${"" /* font-size: calc(10px + 1.8vw); */}
  border-bottom: 2px solid hsl(204, 86%, 53%);
`;

const HitKey = styled.h3`
  margin-bottom: 0.5rem;

  color: #363636;
  &:hover {
    color: hsl(204, 86%, 53%);
  }
`;

const Hit = ({ hit }) => {
  return (
    <Link
      id={hit.id}
      to={`/glossary/${hit.slug}`}
      className=""
      style={{ display: "block" }}
      onClick={() => countHit()}
    >
      <HitKey>{hit.keyFriendly}</HitKey>
    </Link>
  );
};

const types = [
  "Class",
  "Struct",
  "Function",
  "Property",
  "Interface",
  "Enum",
  "EnumMeta"
];

const TypeWrapper = styled.ul`
  border-style: solid;
  border-width: 0px 2px 0px 2px;
  border-radius: 0.3rem;
  border-color: rgba(32, 156, 238, 0);

  &:hover {
    border-color: rgba(32, 156, 238, 100);
  }

  @media screen and (max-width: 768px) {
    border-style: none;
  }
`;

const RESULT_CHUNK_SIZE = 4;

const SearchResults = ({ hits }) => {
  return (
    <div className="columns is-multiline is-centered">
      {types.map(type => {
        var hitsOfType = hits.filter(hit => {
          return hit.type === type;
        });

        const chunks = [];
        for (var i = 0; i < hitsOfType.length; i += RESULT_CHUNK_SIZE) {
          chunks.push(hitsOfType.slice(i, i + RESULT_CHUNK_SIZE));
        }

        console.log(chunks);

        return (
          chunks.length > 0 && (
            <div className={`column is-${chunks.length * 3}`}>
              <HitType>{type}</HitType>
              <TypeWrapper className="columns">
                {chunks.map(chunk => (
                  <div className="column">
                    {chunk.map(hit => (
                      <Hit hit={hit} key={hit.id} />
                    ))}
                  </div>
                ))}
              </TypeWrapper>
            </div>
          )
        );
      })}
    </div>
  );
};

const CSearchResults = connectHits(SearchResults);

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 3.25rem);
`;

const MainContainer = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const ShoutoutContainer = styled.div`
  flex-grow: 0;
  width: 100%;

  margin-top: 2rem;
`;

const PoweredBy = styled.a`
  color: hsl(0, 0%, 71%);
  &:hover {
    color: hsl(204, 86%, 53%);
  }
`;

const BuyMeCoffee = styled.a`
  color: hsl(0, 0%, 71%);
  &:hover {
    color: hsl(204, 86%, 53%);
  }
`;

export default () => {
  const [, setFocus] = useState(false);
  const [query, setQuery] = useState();

  return (
    <>
      <Helmet>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </Helmet>
      <Layout>
        <SEO
          title="Spectacle"
          description="Search for class, struct, property and other specifiers for Unreal Engine 4, all in one place."
        />
        <MainSection className="section">
          <MainContainer className="container">
            <div class="level">
              <div class="level-left">
                <HitCount className="level-item" />
              </div>
              <div class="level-right">
                <div class="level-item" style={{ height: "2rem" }}>
                  <GitHubButton
                    href="https://github.com/UnrealisticDev/Spectacle"
                    data-icon="octicon-star"
                    data-show-count="true"
                    data-size="large"
                    aria-label="Star UnrealisticDev/Spectacle on GitHub"
                  >
                    Star
                  </GitHubButton>
                  {/* <iframe src="https://ghbtns.com/github-btn.html?user=UnrealisticDev&repo=Renom&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe> */}
                </div>
              </div>
            </div>
            <InstantSearch
              searchClient={searchClient()}
              indexName="UnrealSpecifiers"
              onSearchStateChange={({ query }) => setQuery(query)}
            >
              <div class="columns is-centered">
                <div class="column is-half">
                  <Title className="title is-1 has-text-centered">
                    Spectacle
                  </Title>
                  {/* <Searchbar /> */}
                  <p className="subtitle has-text-centered">
                    The first <em>global</em> search for Unreal Engine 4
                    specifiers.
                  </p>
                  <SSearchBox
                    placeholder="BlueprintReadWrite"
                    onFocus={() => setFocus(true)}
                  />
                </div>
              </div>
              {query && query.length > 0 && <CSearchResults />}
            </InstantSearch>
          </MainContainer>
          <ShoutoutContainer className="container">
            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <BuyMeCoffee
                    className="level is-mobile"
                    href="https://www.buymeacoffee.com/mowgl33"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="level-item">
                      <FontAwesomeIcon icon={faMugHot} size="lg" />
                    </div>
                    <div className="level-item">Buy me coffee</div>
                  </BuyMeCoffee>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <PoweredBy
                    className="level is-mobile"
                    href="https://www.algolia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div class="level-item">
                      <p>Powered by</p>
                    </div>
                    <div class="level-item">
                      <FontAwesomeIcon icon={faAlgolia} size="lg" />
                    </div>
                  </PoweredBy>
                </div>
              </div>
            </div>
          </ShoutoutContainer>
        </MainSection>
      </Layout>
    </>
  );
};
