import CounterInput from "./CounterInput";

export default function TentChoice({ title, price, count, setCount}) {
  return (
    <li className=" flex-row text-white flex gap-12 bg-gradient-to-tl border border-gray-900 from-customBlack_2 to-customBlack p-4 rounded-md">
                <div>
                  <h4 className="font-bold text-xl">{title}</h4>
                  <p className="text-xs font-normal text-gray-300">{price}</p>
                </div>
                <CounterInput
                  count={count}
                  setCount={setCount}
                />
              </li>
  )
}
