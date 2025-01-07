"use client";
import Accordionitem from "@/components/festivalsystem/accordion/AccordionItem";
import { useState } from "react";

const Accordion = ({ questionOne, questionTwo, questionThree, questionFour, answerOne, answerTwo, answerThree, answerFour, DesktoptextSize, MobileTextSize }) => {
  const [isOpen, setIsOpen, item] = useState(0);
  return (
    <div>
      <ul className=" list-none w-full">
        <Accordionitem item={1} isOpen={isOpen} setIsOpen={setIsOpen} questionOne={questionOne} answerOne={answerOne} DesktoptextSize={DesktoptextSize} MobileTextSize={MobileTextSize} />
        <Accordionitem item={2} isOpen={isOpen} setIsOpen={setIsOpen} questionTwo={questionTwo} answerTwo={answerTwo} DesktoptextSize={DesktoptextSize} MobileTextSize={MobileTextSize} />
        <Accordionitem item={3} isOpen={isOpen} setIsOpen={setIsOpen} questionThree={questionThree} answerThree={answerThree} DesktoptextSize={DesktoptextSize} MobileTextSize={MobileTextSize} />
        <Accordionitem item={4} isOpen={isOpen} setIsOpen={setIsOpen} questionFour={questionFour} answerFour={answerFour} DesktoptextSize={DesktoptextSize} MobileTextSize={MobileTextSize} />
      </ul>
    </div>
  );
};

export default Accordion;
