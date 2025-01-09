import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const Accordionitem = ({ DesktoptextSize, MobileTextSize, isOpen, setIsOpen, questionOne, questionTwo, questionThree, questionFour, item, answerOne, answerTwo, answerThree, answerFour }) => {
  return (
    <li className="w-full my-3">
      <button type="text"
        onClick={() => {
          isOpen == item ? setIsOpen(0) : setIsOpen(item);
        }}
        className="flex items-center justify-between border-white w-full border-b-2"
      >
        <div className=" hover:bg-customBlack_4 hover:bg-opacity-10 w-full h-full flex justify-between items-center ">
          <div className="py-2 pl-1 text-left">
            <p className={`${MobileTextSize} md:${DesktoptextSize}`}>{questionOne}</p>
            <p className={`${MobileTextSize} md:${DesktoptextSize}`}>{questionTwo}</p>
            <p className={`${MobileTextSize} md:${DesktoptextSize}`}>{questionThree}</p>
            <p className={`${MobileTextSize} md:${DesktoptextSize}`}>{questionFour}</p>
          </div>
          <div>{isOpen == item ? <FiMinus className="w-10 h-10 text-white pr-2" /> : <GoPlus className=" w-10 h-10 text-white pr-2" />}</div>
        </div>
      </button>
      {isOpen == item && (
        <div className="pt-1">
          <p className="text-base md:text-lg text-customWhite"> {answerOne}</p>
          <p className="text-base md:text-lg text-customWhite"> {answerTwo}</p>
          <p className="text-base md:text-lg text-customWhite"> {answerThree}</p>
          <p className="text-base md:text-lg text-customWhite"> {answerFour}</p>
        </div>
      )}
    </li>
  );
};

export default Accordionitem;
