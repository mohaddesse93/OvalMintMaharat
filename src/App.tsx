import PillButton from "./components/PillButton";

export default function App() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#8FB39A] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/background.jpg)" }}
    >

      <div className="relative flex flex-col items-center gap-3 sm:gap-4">
        <PillButton variant="mist" size="xl" className="w-72 translate-x-4 sm:w-80 sm:translate-x-6">
          Explore
        </PillButton>
        <PillButton variant="sage" size="xl" className="w-72 -translate-x-1 sm:w-80 sm:-translate-x-2">
          Services
        </PillButton>
        <PillButton variant="jade" size="xl" className="w-72 translate-x-6 sm:w-80 sm:translate-x-8">
          Contact
        </PillButton>
        <PillButton variant="pine" size="xl" className="w-72 -translate-x-4 sm:w-80 sm:-translate-x-6">
          View Work
        </PillButton>
        <PillButton variant="forest" size="xl" className="w-72 translate-x-2 sm:w-80 sm:translate-x-3">
          Learn More
        </PillButton>
        <PillButton variant="deepForest" size="xl" className="w-72 -translate-x-5 sm:w-80 sm:-translate-x-7">
          Get Started
        </PillButton>
      </div>
    </main>
  );
}
