import React, { useRef } from "react";

export interface BackgroundOption {
  id: string;
  name: string;
  url: string;
  previewUrl: string;
}

export const DEFAULT_BACKGROUNDS: BackgroundOption[] = [
  {
    id: "back5",
    name: "پس‌زمینه اصلی (back5)",
    url: "/images/back5.jpg",
    previewUrl: "/images/back5.jpg",
  },
  {
    id: "back4",
    name: "پس‌زمینه ۴",
    url: "/images/back4.jpg",
    previewUrl: "/images/back4.jpg",
  },
  {
    id: "back3",
    name: "پس‌زمینه ۳",
    url: "/images/back3.jpg",
    previewUrl: "/images/back3.jpg",
  },
  {
    id: "background",
    name: "پس‌زمینه کلاسیک",
    url: "/images/background.jpg",
    previewUrl: "/images/background.jpg",
  },
];

interface BackgroundSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBgUrl: string;
  onSelectBg: (url: string) => void;
  bgFit: "cover" | "contain";
  onChangeBgFit: (fit: "cover" | "contain") => void;
  customBgs: BackgroundOption[];
  onAddCustomBg: (bg: BackgroundOption) => void;
}

export const BackgroundSettingsModal: React.FC<BackgroundSettingsModalProps> = ({
  isOpen,
  onClose,
  currentBgUrl,
  onSelectBg,
  bgFit,
  onChangeBgFit,
  customBgs,
  onAddCustomBg,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const customUrl = URL.createObjectURL(file);
      const newBg: BackgroundOption = {
        id: `custom-${Date.now()}`,
        name: file.name.length > 18 ? `${file.name.slice(0, 15)}...` : file.name,
        url: customUrl,
        previewUrl: customUrl,
      };
      onAddCustomBg(newBg);
      onSelectBg(customUrl);
    }
  };

  const allBackgrounds = [...customBgs, ...DEFAULT_BACKGROUNDS];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#051F20]/95 border border-[#8EB69B]/40 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-[#DAF1DE] flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#8EB69B]/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#235347]/80 text-[#DAF1DE]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#DAF1DE]">تنظیمات و تست پس‌زمینه</h2>
              <p className="text-xs text-[#8EB69B]">برای تست فوری، روی هر تصویر کلیک کنید</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8EB69B] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="بستن"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Fit Mode Toggle */}
          <div>
            <label className="block text-xs font-semibold text-[#8EB69B] mb-2">
              نحوه قرارگیری تصویر:
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#082622] p-1.5 rounded-xl border border-[#8EB69B]/20">
              <button
                type="button"
                onClick={() => onChangeBgFit("cover")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  bgFit === "cover"
                    ? "bg-[#235347] text-[#DAF1DE] shadow-md border border-[#8EB69B]/40"
                    : "text-[#8EB69B] hover:text-white"
                }`}
              >
                تمام صفحه (Cover)
              </button>
              <button
                type="button"
                onClick={() => onChangeBgFit("contain")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  bgFit === "contain"
                    ? "bg-[#235347] text-[#DAF1DE] shadow-md border border-[#8EB69B]/40"
                    : "text-[#8EB69B] hover:text-white"
                }`}
              >
                کامل بدون برش (Contain)
              </button>
            </div>
          </div>

          {/* Background Grid */}
          <div>
            <label className="block text-xs font-semibold text-[#8EB69B] mb-2.5">
              انتخاب از میان تصاویر آماده:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {allBackgrounds.map((bg) => {
                const isSelected = currentBgUrl === bg.url;
                return (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => onSelectBg(bg.url)}
                    className={`group relative flex flex-col rounded-xl overflow-hidden border-2 text-right transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-[#DAF1DE] ring-2 ring-[#DAF1DE]/40 shadow-[0_0_20px_rgba(218,241,222,0.3)] scale-[1.02]"
                        : "border-[#8EB69B]/30 hover:border-[#8EB69B]/80 hover:scale-[1.01]"
                    }`}
                  >
                    <div className="relative h-24 sm:h-28 w-full bg-[#082622] overflow-hidden">
                      <img
                        src={bg.previewUrl}
                        alt={bg.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#235347] border border-white flex items-center justify-center text-white shadow-md">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-[#0B2B26] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#DAF1DE] truncate">
                        {bg.name}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] text-[#8EB69B] font-semibold bg-[#235347]/80 px-1.5 py-0.5 rounded">
                          فعال
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload Custom Background */}
          <div className="pt-2 border-t border-[#8EB69B]/20">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#8EB69B]/60 hover:border-[#DAF1DE] hover:bg-[#235347]/40 text-xs font-semibold text-[#DAF1DE] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#8EB69B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>بارگذاری و تست تصویر جدید از سیستم / گوشی</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#8EB69B]/20 flex items-center justify-between">
          <p className="text-[11px] text-[#8EB69B]">
            تنظیمات انتخاب‌شده به صورت خودکار ذخیره می‌شوند.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#235347] hover:bg-[#235347]/80 text-[#DAF1DE] text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            تأیید و بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSettingsModal;
