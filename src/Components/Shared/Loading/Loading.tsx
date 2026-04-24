import { RotatingLines } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center text-black dark:text-white ">
      <RotatingLines
        visible={true}
        height="90"
        width="90"
        color="currentColor"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
