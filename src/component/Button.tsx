interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({ text, className, onClick }: ButtonProps) {
  return (
    <button
      className={`w-full p-1 bg-amber-500 hover:bg-amber-400 ${className}`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
