type TextareaProps = {
  variant?: "default";
  placeholder?: string | undefined;
  value: string | number | undefined;
  onChange: any;
  className?: string;
};

export default function Textarea({
  value,
  variant = "default",
  onChange,
  className,
  placeholder = undefined,
}: TextareaProps) {
  const getStyleBtn = () => {
    switch (variant) {
      case "default":
        return "w-full appearance-none resize-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent";
    }
  };

  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`${className} ${getStyleBtn()}`}
      placeholder={placeholder}
    />
  );
}
