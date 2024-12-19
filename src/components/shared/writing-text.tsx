interface Props {
  className?: string;
  text?: string;
}

const WritingText = ({ className, text }: Props) => {
  return <div className={className}>{text}</div>;
};

export default WritingText;
