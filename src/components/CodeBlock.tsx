import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

export const CodeBlock = ({language, value}: any) => {
  return (
    <SyntaxHighlighter showLineNumbers={true} language={language}>
      {value}
    </SyntaxHighlighter>
  )
}
