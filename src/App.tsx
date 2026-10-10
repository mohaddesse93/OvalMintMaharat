import { useState } from "react";
import PillButton from "./components/PillButton";
import Preloader from "./components/Preloader";
import BackgroundSettingsModal, { BackgroundOption } from "./components/BackgroundSettingsModal";

const ORBIT_BUTTONS = [
  { id: 1, title: "داستان مهارت", variant: "mist" as const },
  { id: 2, title: "ورود به دریچه", variant: "sage" as const },
  { id: 3, title: "کادر آموزشی و اجرایی", variant: "emerald" as const },
  { id: 4, title: "تقویم هفتگی", variant: "jade" as const },
  { id: 5, title: "رویدادها", variant: "pine" as const },
  { id: 6, title: "کارگاه ها", variant: "forest" as const },
  { id: 7, title: "تماس با ما", variant: "deepForest" as const },
];

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [bgUrl, setBgUrl] = useState<string>(() => {
    const saved = localStorage.getItem("maharat_bg_url_v2");
    return saved || "/images/back5.jpg";
  });
  const [bgFit, setBgFit] = useState<"cover" | "contain">(() => {
    return (localStorage.getItem("maharat_bg_fit_v2") as "cover" | "contain") || "cover";
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [customBgs, setCustomBgs] = useState<BackgroundOption[]>([]);

  const handleSelectBg = (url: string) => {
    setBgUrl(url);
    localStorage.setItem("maharat_bg_url_v2", url);
  };

  const handleChangeBgFit = (fit: "cover" | "contain") => {
    setBgFit(fit);
    localStorage.setItem("maharat_bg_fit_v2", fit);
  };

  const handleAddCustomBg = (bg: BackgroundOption) => {
    setCustomBgs((prev) => [bg, ...prev]);
  };

  return (
    <>
      {showPreloader && <Preloader onLoaded={() => setShowPreloader(false)} />}

      <BackgroundSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentBgUrl={bgUrl}
        onSelectBg={handleSelectBg}
        bgFit={bgFit}
        onChangeBgFit={handleChangeBgFit}
        customBgs={customBgs}
        onAddCustomBg={handleAddCustomBg}
      />

      {/* Floating Settings Button in Top-Left */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-[#051F20]/80 hover:bg-[#051F20] text-[#DAF1DE] border border-[#8EB69B]/40 shadow-xl backdrop-blur-md cursor-pointer transition-all hover:scale-105 active:scale-95"
        title="تنظیم و تعویض پس‌زمینه"
      >
        <svg className="w-4 h-4 text-[#8EB69B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs font-medium hidden min-[480px]:inline">تغییر پس‌زمینه</span>
      </button>

      <main
        className="relative flex min-h-screen lg:h-screen w-full items-center justify-center overflow-x-hidden overflow-y-auto lg:overflow-hidden p-3 sm:p-5 lg:p-6 bg-cover bg-center bg-no-repeat select-none"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        {/* Soft blur overlay on mobile and tablet to make background blend softly under elements */}
        <div className="absolute inset-0 block lg:hidden backdrop-blur-[2.5px] bg-black/25 pointer-events-none transition-all duration-300" />

        <div className="relative z-10 w-full max-w-[760px] flex flex-col items-center justify-center my-auto px-2">
          {/* Top Hero 3D Circular Button */}
          <div className="mb-3.5 sm:mb-5 lg:mb-6 xl:mb-7 flex justify-center float-node-center">
            <button
              type="button"
              className="group relative isolate flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 xl:w-52 xl:h-52 rounded-full p-2 sm:p-2.5 cursor-pointer select-none transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:translate-y-1.5 active:scale-[0.97] bg-gradient-to-b from-[#8EB69B]/90 via-[#235347] to-[#051F20] shadow-[0_25px_50px_-10px_rgba(0,0,0,0.95),0_12px_24px_-6px_rgba(0,0,0,0.85)]"
            >
              {/* Outer 3D Bevel Ring Edge */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-black/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-4px_8px_rgba(0,0,0,0.8)]"
              />

              {/* Inner 3D Convex Dome Surface */}
              <div className="relative w-full h-full rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0E352F] via-[#082622] to-[#031516] shadow-[inset_0_6px_14px_rgba(255,255,255,0.4),inset_0_-10px_20px_rgba(0,0,0,0.85),inset_0_-2px_6px_rgba(0,0,0,0.95)] border border-[#8EB69B]/30 overflow-hidden">
                {/* 3D Radial Specular Light Reflection (Top-Left Dome Highlight) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 -left-4 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-white/35 via-white/10 to-transparent blur-sm transform -rotate-12 group-hover:opacity-100 opacity-90 transition-opacity"
                />

                {/* 3D Bottom Ambient Rim Light */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 inset-x-0 h-1/3 rounded-b-full bg-gradient-to-t from-[#8EB69B]/20 to-transparent"
                />

                {/* Decorative Concentric Gold/Mint Ring */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-2 sm:inset-3 rounded-full border border-[#8EB69B]/35 shadow-[0_1px_2px_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,0.5)]"
                />

                {/* Embossed Text Content */}
                <span className="relative z-10 text-[10px] min-[400px]:text-[11px] sm:text-xs md:text-sm font-semibold text-[#8EB69B] tracking-wide leading-tight drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                  دبستان پسرانه
                </span>

                <span className="relative z-10 text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black text-[#DAF1DE] tracking-wider mt-0.5 sm:mt-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]">
                  مهارت
                </span>

                {/* Subtle 3D Leaf/Crown Accent */}
                <span className="relative z-10 mt-1 flex items-center gap-1 opacity-70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8EB69B]" />
                  <span className="w-6 sm:w-8 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#8EB69B] to-transparent" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8EB69B]" />
                </span>
              </div>
            </button>
          </div>

          {/* Buttons Layout: 1 column stacked on Mobile & Tablet (< lg), 2 columns on Desktop (lg+) */}
          <div className="animate-float-grid grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4 xl:gap-5 w-full items-center justify-items-center">
            <div className="float-node-1 w-full flex justify-center">
              <PillButton
                variant="mist"
                size="xl"
                className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-72 xl:max-w-80"
              >
                داستان مهارت
              </PillButton>
            </div>
            <div className="float-node-2 w-full flex justify-center">
              <PillButton
                variant="sage"
                size="xl"
                className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-72 xl:max-w-80"
              >
                ورود به دریچه
              </PillButton>
            </div>
            <div className="float-node-3 w-full flex justify-center">
              <PillButton
                variant="emerald"
                size="xl"
                className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-72 xl:max-w-80"
              >
                کادر آموزشی و اجرایی
              </PillButton>
            </div>
            <div className="float-node-4 w-full flex justify-center">
              <PillButton
                variant="jade"
                size="xl"
                className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-72 xl:max-w-80"
              >
                تقویم هفتگی
              </PillButton>
            </div>
            <div className="float-node-5 w-full flex justify-center">
              <PillButton
                variant="pine"
                size="xl"
                className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-72 xl:max-w-80"
              >
                رویدادها
              </PillButton>
            </div>
            <div className="float-node-6 w-full flex justify-center">
              <PillButton
                variant="forest"
                size="xl"
                className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-72 xl:max-w-80"
              >
                کارگاه ها
              </PillButton>
            </div>
            <div className="float-node-center col-span-1 lg:col-span-2 w-full flex justify-center">
              <PillButton
                variant="deepForest"
                size="xl"
                className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-72 xl:max-w-80"
              >
                تماس با ما
              </PillButton>
            </div>
          </div>
        </div>

        {/* Small discreet replay preloader button */}
        <button
          onClick={() => setShowPreloader(true)}
          className="fixed bottom-3 left-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#051F20]/70 hover:bg-[#051F20] text-[#DAF1DE]/80 hover:text-[#DAF1DE] text-xs backdrop-blur-sm border border-white/10 transition-all duration-200 shadow-lg cursor-pointer"
          title="مشاهده مجدد انیمیشن پیش‌بارگذاری (Preloader)"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>تست لودر</span>
        </button>
      </main>
    </>
  );
}
