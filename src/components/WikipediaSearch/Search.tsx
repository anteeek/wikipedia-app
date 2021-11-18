import React from "react";
import styled from "@emotion/styled";
import { TextField } from "../UI/Inputs";
import { PrimaryButton } from "../UI/Buttons";

export function Search({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (newValue: string) => void;
  onSearch: () => void;
}) {
  return (
    <Container>
      <TextField
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search phrase"
      />

      <PrimaryButton onClick={onSearch}>Search</PrimaryButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
`;
