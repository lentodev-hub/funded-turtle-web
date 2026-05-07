import oxHead from "@/assets/ox-head.jpg";

const AnimatedOx = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src={oxHead}
        alt="Funded Ox mascot"
        loading="lazy"
        width={1024}
        height={1024}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default AnimatedOx;
