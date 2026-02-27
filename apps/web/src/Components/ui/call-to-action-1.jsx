import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

export default function CallToAction1() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleJoin = () => {
    if (token) {
      navigate("/lms/student/courses");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        .cta-poppins * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <div className="cta-poppins w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#5524B7] to-[#380B60] rounded-xl sm:rounded-2xl px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-14 lg:px-14 lg:py-16 text-white">
        <div className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-600/10 backdrop-blur border border-purple-500/40 text-xs sm:text-sm">
          <p className="font-medium leading-snug text-center">Join family of 5k students who are Vibing</p>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl md:leading-[1.2] lg:leading-[60px] font-semibold max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mt-4 sm:mt-5 bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          Unlock your next big opportunity.
          <button
            type="button"
            aria-label="Future use"
            className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors shrink-0"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </h2>
        <button
          type="button"
          onClick={() => navigate("/features/real-client-lab")}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-white bg-violet-600 hover:bg-violet-700 transition-all rounded-full uppercase text-sm sm:text-base md:text-lg lg:text-xl font-medium mt-5 sm:mt-6 md:mt-8"
        >
          Real Client Lab
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </>
  );
}
