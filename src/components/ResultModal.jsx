import { useRef, useImperativeHandle } from "react";

export default function ResultModal({ ref, result, targetTime }) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog className="result-modal" ref={dialog}>
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>{" "}
      </p>
      <p>
        You stopeed the timer with <strong>x seconds.</strong>{" "}
      </p>
      <form action="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
