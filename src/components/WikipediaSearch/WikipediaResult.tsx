import React from "react";
import styled from "@emotion/styled";
import { IWikipediaResult } from "../../lib/wikipedia";

export function WikipediaResult({ result }: { result: IWikipediaResult }) {
  return (
    <Container>
      <Title>{result.title}</Title>
      <Snippet dangerouslySetInnerHTML={{ __html: result.snippet }} />
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid var(--color-primary);
  border-radius: 4px;
  padding: 10px 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h5`
  margin: 0;
  font-size: 1.5rem;
`;

const Snippet = styled.article`
  .searchmatch {
    background-color: yellow;
    color: black;
  }
`;
