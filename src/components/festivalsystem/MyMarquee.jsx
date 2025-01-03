import Marquee from "react-fast-marquee";
import MyMarqueeComponent from "@/components/festivalsystem/MyMarqueeComponent";

const MyMarquee = () => {
  return (
    <div className="bg-gradient-to-r from-customPink via-customRed to-customOrange py-3">
      <Marquee>
        <MyMarqueeComponent />
        <MyMarqueeComponent />
        <MyMarqueeComponent />
        <MyMarqueeComponent />
        <MyMarqueeComponent />
        <MyMarqueeComponent />
        <MyMarqueeComponent />
        <MyMarqueeComponent />
        <MyMarqueeComponent />
      </Marquee>
    </div>
  );
};

export default MyMarquee;
