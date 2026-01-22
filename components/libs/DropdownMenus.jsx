import { FaChevronDown } from "react-icons/fa";
import Button from "./Button";

export default function DropdownMenus({
  placeholder = "Select",
  selected,
  setSelected,
  options,
  className = "",
  disabled = false,
  error = false,
  size = "md",
}) {
  const [showList, setShowList] = useState(false);
  const listItemRef = useOutsideClick(() => setShowList(false));

  const label =
    options.find((option) => option.value === selected)?.label ?? placeholder;

  return (
    <div ref={listItemRef} className={`relative ${className}`}>
      <Button
        type="button"
        variant="outline"
        size={size}
        className={`w-full justify-between! font-normal! px-4! ${
          error
            ? "border-error! text-error!"
            : label !== placeholder
              ? "border-border! text-black! dark:text-white!"
              : "border-border! text-gray-500! dark:text-gray-400!"
        }`}
        onClick={() => setShowList((p) => !p)}
        borderBottom={!showList}
        disabled={disabled}
      >
        {label}
        <FaChevronDown
          className={`transition-all ${showList ? "rotate-180" : ""}`}
        />
      </Button>

      {showList && (
        <div className="absolute top-full w-full bg-card border border-border border-t-0 shadow-lg divide-y divide-border rounded-b-md z-50 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => {
                setSelected(option.value);
                setShowList(false);
              }}
              className={`w-full p-2 text-left transition-all ${
                selected === option.value
                  ? "bg-gray-300 dark:bg-border/60"
                  : "hover:bg-gray-200 dark:hover:bg-border"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
