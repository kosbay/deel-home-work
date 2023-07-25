import { FC } from "react";

interface TextWithHighlightProps {
  text: string
  stringToHighlight: string
}

const TextWithHighlight: FC<TextWithHighlightProps> = ({ text, stringToHighlight }) => {
  const startIndex = text.toLowerCase().indexOf(stringToHighlight.toLowerCase())

  if (startIndex === -1) return <>{text}</>

  const endIndex = startIndex + stringToHighlight.length

  return (
    <>
      {text.substring(0, startIndex)}
      <strong>{text.substring(startIndex, endIndex)}</strong>
      {text.substring(endIndex)}
    </>
  )
}

export default TextWithHighlight;