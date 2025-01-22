import { useMemo, useState } from "react";
const numbers = new Array(30_000_000).fill("Ali").map((_, i) => {
  return {
    index: i,
    isMagical: i === 29_000_000,
  };
});

const ArrayFill = () => {
  const [count, setCount] = useState(0);
  const [nums, setNums] = useState(numbers);

  // const megical = nums.find((item) => item.isMagical);
  const megical = useMemo(
    () => nums.find((item) => item.isMagical == true),
    []
  );
  return (
    <>
      <div>Megical number is {megical?.index}</div>
      <button onClick={() => setCount((prev) => count + 1)}>
        Count is {count}
      </button>
    </>
  );
};

export default ArrayFill;
