import React from "react";
// import ReactAutosizeTextarea from "react-autosize-textarea";
// import ReactTextareaAutosize from "react-textarea-autosize";
// import styled from "styled-components";

// const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
//   ...props
// }) => {
//   return <StyledTextarea {...props} />;
// };

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  ...props
}) => {
  return <textarea {...props} />;
};

// const StyledTextarea = styled(ReactTextareaAutosize)`
//   position: relative;
//   width: 100%;
//   min-height: 216px;
//   padding: 11px;
//   border: 1px solid ${({ theme }) => theme.gray_eb};
//   border-radius: 4px;
//   font-size: 16px;
//   outline: none;
//   resize: none;
//   font: inherit;
//   & ::placeholder {
//     color: ${({ theme }) => theme.gray_76};
//   }
//   & :focus {
//     border-color: ${({ theme }) => theme.dark_cyan};
//   }
// `;

export default React.memo(Textarea);
