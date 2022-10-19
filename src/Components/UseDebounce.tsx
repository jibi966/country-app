import React from "react";

function UseDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = React.useState<string>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}

export default UseDebounce;
