import React from "react";
import styled from "@emotion/styled";
import { Replace } from "./Replace";
import { Search } from "./Search";
import { searchWikipedia, IWikipediaResult } from "../../lib/wikipedia";
import { WikipediaResult } from "./WikipediaResult";

export function WikipediaSearch() {
  const [phrase, setQuery] = React.useState("");

  const { results, replace, triggerSearch } = useWikipediaSearch(phrase);

  return (
    <Container>
      <div>
        <Header>Wikipedia search</Header>
        <ControlsRow>
          <Search value={phrase} onChange={setQuery} onSearch={triggerSearch} />
          <HorizontalRule />
          <Header>Replace matches</Header>
          <Replace
            onReplace={(replaceWith) => replace(replaceWith, { all: false })}
            onReplaceAll={(replaceWith) => replace(replaceWith, { all: true })}
          />
        </ControlsRow>
      </div>

      <div>
        <Header>Results</Header>
        <ResultsContainer>
          {results.map((result) => (
            <WikipediaResult key={result.pageid} result={result} />
          ))}
        </ResultsContainer>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 4rem;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Header = styled.h1`
  font-size: 2rem;
`;

const HorizontalRule = styled.div`
  width: 100%;
  border: 4px dotted var(--color-primary);
`;

const ControlsRow = styled.div`
  width: min(100%, 600px);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const ResultsContainer = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;

  width: min(600px, 100%);

  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const DEBOUNCE_THRESHOLD = 1500;

function useWikipediaSearch(phrase: string) {
  const [results, setResults] = React.useState<IWikipediaResult[]>([]);
  const lastSearchDateRef = React.useRef(0);
  const awaitingPhraseRef = React.useRef("");
  const awaitingPhraseTimeoutRef = React.useRef<NodeJS.Timeout>();

  const replace = (replaceWith: string, options: { all: boolean }) => {
    setResults((currentResults) => {
      const newResults = JSON.parse(
        JSON.stringify(currentResults)
      ) as IWikipediaResult[];

      for (const result of newResults) {
        const titleHasPhrase = result.title.includes(phrase);

        if (titleHasPhrase) {
          if (options.all) {
            result.title = result.title.replaceAll(phrase, replaceWith);
          } else {
            result.title = result.title.replace(phrase, replaceWith);
            break;
          }
        }

        const snippetHasPhrase = result.snippet.includes(phrase);

        if (snippetHasPhrase) {
          if (options.all) {
            result.snippet = result.snippet.replaceAll(phrase, replaceWith);
          } else {
            result.snippet = result.snippet.replace(phrase, replaceWith);
            break;
          }
        }
      }

      return newResults;
    });
  };

  const search = async (searchedPhrase: string) => {
    setResults(await searchWikipedia(searchedPhrase, { limit: 10 }));
  };

  React.useEffect(() => {
    if (
      phrase &&
      Date.now() - lastSearchDateRef.current >= DEBOUNCE_THRESHOLD
    ) {
      lastSearchDateRef.current = Date.now();

      search(phrase);
    } else {
      awaitingPhraseRef.current = phrase;
      if (awaitingPhraseTimeoutRef.current) {
        clearTimeout(awaitingPhraseTimeoutRef.current);
      }
      awaitingPhraseTimeoutRef.current = setTimeout(() => {
        search(awaitingPhraseRef.current);
      }, 1000);
    }
  }, [phrase]);

  return {
    results,
    triggerSearch: () => !!phrase && search(phrase),
    replace,
  };
}
