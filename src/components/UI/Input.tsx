type InputProps = {
  variant?: "default" | "datetime" | "checkbox";
  type?: "number" | "text" | "datetime-local";
  placeholder?: string | undefined;
  value?: string | number | undefined;
  onChange: any;
  className?: string;
}

export default function Input({
  variant = "default",
  type = undefined,
  placeholder = undefined,
  value,
  onChange,
  className = "",
}: InputProps) {
  const getStyleBtn = () => {
    switch (variant) {
      case "default":
        return "rounded-lg border w-full focus:outline-none border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent";
      case "datetime":
        return "rounded-lg outline-none mx-[10px] border-transparent py-2 px-2 border border-gray-300";
    }
  };

  return (
    <input
      type={type}
      className={`${className} ${getStyleBtn()}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
