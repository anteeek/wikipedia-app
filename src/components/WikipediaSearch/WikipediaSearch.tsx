import React from "react";
import styled from "@emotion/styled";
import { Replace } from "./Replace";
import { Search } from "./Search";
import { useQuery } from "react-query";
import { searchWikipedia, IWikipediaResult } from "../../lib/wikipedia";
import { WikipediaResult } from "./WikipediaResult";

export function WikipediaSearch() {
  const [query, setQuery] = React.useState("");

  const { data: wikipediaResults, refetch } = useQuery(
    ["wikipedia-search", query],
    () => searchWikipedia(query, { limit: 10 }),
    { enabled: !!query }
  );

  const [processedResults, setProcessedResults] = React.useState<
    IWikipediaResult[]
  >([]);

  React.useEffect(() => {
    if (!!wikipediaResults) {
      setProcessedResults(wikipediaResults);
    }
  }, [wikipediaResults]);

  const handleReplace = () => {};
  const handleReplaceAll = () => {};

  return (
    <ControlsRow>
      <Search value={query} onChange={setQuery} onSearch={refetch} />
      <Replace onReplace={handleReplace} onReplaceAll={handleReplaceAll} />

      <ResultsContainer>
        {processedResults.map((result) => (
          <WikipediaResult key={result.pageid} result={result} />
        ))}
      </ResultsContainer>
    </ControlsRow>
  );
}

const ControlsRow = styled.div`
  display: flex;
  gap: 2rem;
`;

const ResultsContainer = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
