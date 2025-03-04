import styled from "styled-components";

const Cell = styled.td<{ $depth: number; $disabled: boolean }>`
  padding-left: ${(props) => `${props.$depth * 1.25}rem`};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "default")};
`;

const Button = styled.button`
  padding: 3px;
  width: fit-content;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;

  transition: all 0.3s ease-in-out;

  & > * {
    width: 1rem;
    height: 1rem;
  }
`;

const CreateButton = styled(Button)`
  color: #7891b2;
`;

const DeleteButton = styled(Button)`
  color: #df4445;
  opacity: 0;
`;

const Controls = styled.div<{ $depth: number }>`
  z-index: 999;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
  width: fit-content;
  margin-left: 10px;
  border-radius: 7px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.card};
    ${DeleteButton} {
      opacity: 1;
    }
  }
`;

const Node = styled.div<{
  $depth: number;
  $rowsToParent: number;
  $isActive: boolean;
}>`
  position: relative;

  display: ${(props) => props.$depth === 0 && `none`};
  z-index: 0;
  &::before {
    content: "";
    position: absolute;
    top: 13px;
    transform: translateY(50%);
    left: 5px;
    width: 11px;
    height: 1px;
    background-color: #c6c6c6;
    z-index: -1;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -14px;
    transform: translate(0, 0);
    left: 5px;
    width: 1px;
    height: calc(
      ((${(props) => props.$rowsToParent}) * 45.4px) +
        (${(props) => (props.$isActive ? "13px" : "0px")})
    );
    background-color: #c6c6c6;
    z-index: -1;
  }
`;

export { Node, Controls, DeleteButton, CreateButton, Cell };
