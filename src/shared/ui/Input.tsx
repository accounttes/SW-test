import * as React from "react";

import styled from "styled-components";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyledInput = styled.input`
  display: flex;
  height: 2.25rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  padding: 0.75rem 0.75rem;
  font-size: 0.875rem;
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  color: #71717a;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <StyledInput type={type} className={className} ref={ref} {...props} />
    );
  }
);
Input.displayName = "Input";

export { Input };
