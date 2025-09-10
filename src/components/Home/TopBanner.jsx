export default function TopBanner() {
  return (
    <div className="flex gap-4">
      <div className="w-3/5 h-[80vh] flex flex-col gap-4">
          <img
            className="h-[392px] w-full object-cover"
            src="https://i.ibb.co.com/h6RZ6QC/pexels-sora-shimazaki-5926445.jpg"
            alt="sale-image"
          />
          <img
            className="h-[392px] w-full object-cover"
            src="https://i.ibb.co.com/v4xFsCMV/pexels-karolina-grabowska-5650047.jpg"
          />
      </div>
      <div className="w-2/5 relative">
        <div className="">
            <img className="h-[800px]" src="https://i.ibb.co.com/KcWJ3Hrs/Gemini-Generated-Image-wt78iywt78iywt78.png" alt="" />
        </div>
      </div>
    </div>
  );
}
