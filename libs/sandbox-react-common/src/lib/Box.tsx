import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  background-color: #a9adc1;
  border: 1px solid gray;
  margin: 4px;
  text-align: left;
`;

export function useRenderCounter() {
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.innerText = String(Number(ref.current.innerText || 0) + 1);
  });
  return (
    <span
      style={{
        backgroundColor: "#ccc",
        padding: 4,
        display: "inline-block",
      }}
      ref={ref}
    />
  );
}

export default function Box({
  children,
  name,
}: React.ComponentProps<"div"> & { name: string }) {
  const counter = useRenderCounter();
  return (
    <StyledBox>
      {counter} <strong>{name}</strong>
      <div style={{ padding: 5 }}>{children}</div>
    </StyledBox>
  );
}
