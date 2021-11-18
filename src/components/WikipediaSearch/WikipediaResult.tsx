import React from "react";
import styled from "@emotion/styled";
import { IWikipediaResult } from "../../lib/wikipedia";

export function WikipediaResult({ result }: { result: IWikipediaResult }) {
  return <div>{JSON.stringify(result)}</div>;
}
