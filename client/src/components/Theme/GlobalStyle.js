import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all .5s linear;
    border-color: ${({ theme }) => theme.border};
  }
  .css-b7k0tb-MuiAutocomplete-listbox {
    background: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text} !important;
  }
  #logintitle {
    content: url(${({ theme }) => (theme.logintitle)});
  }
  #headertitle {
    content: url(${({ theme }) => theme.headertitle});
  }
`;

export default GlobalStyle;
