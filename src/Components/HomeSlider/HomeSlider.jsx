import img1 from "../../assets/images/HomeSlid1.jpg";
import img2 from "../../assets/images/HomeSlid2.jpg";
import img3 from "../../assets/images/HomeSlid3.jpg";

export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12 mb-5">
        <div className="col-span-8">
          <img
            className="w-full object-cover h-[100%]"
            src={img1}
            alt="Home Slid"
          />
        </div>
        <div className="col-span-4">
          <img
            className="w-full object-cover h-[50%]"
            src={img2}
            alt="Home Slid"
          />
          <img
            className="w-full object-cover h-[50%]"
            src={img3}
            alt="Home Slid"
          />
        </div>
      </div>{" "}
    </>
  );
}
