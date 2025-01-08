import { FiPlus, FiMinus } from "react-icons/fi";

const CounterInput = ({ count, setCount, max, name }) => {
  const addQuantity = () => {
    if (count === max) {
      return;
    }
    setCount(count + 1);
  };

  const subtractQuantity = () => {
    if (count - 1 < 0) {
      return;
    }
    setCount(count - 1);
  };

  //Update: Her bliver a11y forbedret med tailwind. Her bruger jeg så for label en className ved navn 'sr-only'(screen readers only) :
  // Link til source: https://tailwindcss.com/docs/screen-readers

  // For at også kunne forbinde label med de andre elementer bruges en aria-labelledby attribut.
  // Link til source: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby

  // Der bliver derudover brugt en aria-live attribut med "polite" så se antallet af varer i kurven der bliver opdateres.
  // Link til source: https://stackoverflow.com/questions/27546070/difference-between-aria-live-assertive-and-aria-live-polite
  // Der var overvejelser til at skulle bruge assertive, men ud fra kilden er den bedre til at vise fejl (kan bruges til error besked)
  // eller andre kritiske updates.
  // Link til aria-labelledby: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby

  // Vi gruppere desuden vores counterInput for a11y, så det ses som et 'samlet' input
  // Link til source: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role

  return (
    <div
      aria-labelledby={`counter-${name}-describtion`}
      aria-describedby={`counter-${name}-label`}
      className="flex item-center max-w-[8rem]"
      role="group"
    >
      <label
        htmlFor="numberInput"
        id={`counter-${name}-label`}
        className="sr-only"
      >
      </label>
      <p id={`counter-${name}-describtion`} className="sr-only">
        Det kun muligt at købe maks {max}
      </p>
      {/* Fortæller her at vi gerne vil gruppere vores elementer som samlet input.
       Vi har inde i vores Card givet en property 'name' der kan adskille om det så er en vip eller single billet */}
      <button
        aria-label="Minsk Antal Billetter"
        onClick={subtractQuantity}
        type="button"
        className="appearance-textfield bg-gray-950 hover:bg-gray-900 border border-gray-800 p-3 h-11 rounded-s-lg"
      >
        <FiMinus />
      </button>
      <input
        aria-labelledby={`counter-${name}-label`}
        name={name}
        value={count}
        onChange={() => {}}
        type="number"
        required
        // Informere brugeren opdateringen
        aria-live="polite"
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-textfield disabled-none text-white text-center bg-gray-950 border-y border-gray-800 h-11 py-2.5 w-full"
      />
      <button
        aria-label="Øg Antal Billetter"
        onClick={addQuantity}
        type="button"
        className=" appearance-textfield bg-gray-950 hover:bg-gray-900 border border-gray-800 p-3 h-11 rounded-e-lg"
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default CounterInput;
