import { useRef, useState } from "react";

function AssignRef() {
  const [toggle, setToggle] = useState(true);
  const elementRef = useRef<HTMLElement | null>(null);

  const assignRef = (element: HTMLElement | null) => {
    elementRef.current = element;
    console.log("Current ref:", elementRef.current);
  };

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Switch Ref</button>
      <div
        ref={toggle ? assignRef : null}
        style={{ padding: 20, background: "lightblue" }}
      >
        First Element
      </div>
      <div
        ref={!toggle ? assignRef : null}
        style={{ padding: 20, background: "lightcoral" }}
      >
        Second Element
      </div>
    </div>
  );
}

export default AssignRef;
