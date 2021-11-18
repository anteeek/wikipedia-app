import styled from "@emotion/styled";

export const PrimaryButton = styled.button`
  border: 4px solid var(--color-primary);
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  font-size: var(--font-size-large);
  border-radius: 4px;
  padding: 10px 2rem;
  cursor: pointer;

  :hover {
    background-color: transparent;
    color: var(--color-primary);
  }
`;

export const OutlinedButton = styled.button`
  border: 4px solid var(--color-primary);
  font-size: var(--font-size-large);
  border-radius: 4px;
  padding: 10px 2rem;
  cursor: pointer;

  :hover {
    background-color: var(--color-primary);
    color: var(--color-primary-text);
  }
`;
