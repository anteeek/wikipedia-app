import React from "react";
import styled from "@emotion/styled";
import { TextField } from "../UI/Inputs";
import { OutlinedButton } from "../UI/Buttons";

export function Replace({
  onReplace,
  onReplaceAll,
}: {
  onReplace: (replaceWithPhrase: string) => void;
  onReplaceAll: (replaceWithPhrase: string) => void;
}) {
  const [replaceWithPhrase, setReplaceWithPhrase] = React.useState("");

  return (
    <Container>
      <TextField
        type="text"
        value={replaceWithPhrase}
        onChange={(e) => setReplaceWithPhrase(e.target.value)}
        placeholder="Replace phrase"
      />

      <ButtonsRow>
        <OutlinedButton onClick={() => onReplace(replaceWithPhrase)}>
          Replace
        </OutlinedButton>
        <OutlinedButton onClick={() => onReplaceAll(replaceWithPhrase)}>
          Replace all
        </OutlinedButton>
      </ButtonsRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: min(100%, 450px);
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 2rem;
  > * {
    flex: 1;
  }
`;
