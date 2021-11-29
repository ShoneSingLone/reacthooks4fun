import { Button } from "@alicloudfe/components";
import { useState } from "react";

function ButtonLabel(prop: any) {
  const count = prop.count;
  const color = count > 10 ? "red" : "blue";
  return <span style={{ color }}>{count}</span>;
}

export function CountLable() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        <ButtonLabel count={count} />
      </Button>
    </div>
  );
}
