import useTypingEffect from "../../hooks/useTypingEffect";

interface Props {
  className?: string;
  text?: string;
}

const WritingText = ({ className, text }: Props) => {
  const { displayText } = useTypingEffect(text ? text : "", 20);
  return <div className={className}>{displayText}</div>;
};

export default WritingText;
