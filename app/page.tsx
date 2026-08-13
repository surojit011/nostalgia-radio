import Clock from "@/components/Clock";
import ListenerCount from "@/components/ListenerCount";
import SocialLinks from "@/components/SocialLinks";
import Player from "@/components/Player";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <div className="hero-bg fixed inset-0 -z-20 bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>

      <div className="grain-overlay fixed inset-0 -z-10" />

      <div className="fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-10 grid grid-cols-3 items-center pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
        <div className="justify-self-start">
          <Clock />
        </div>

        <div className="justify-self-center">
          <ListenerCount />
        </div>

        <div className="justify-self-end">
          <SocialLinks />
        </div>
      </div>

      <div className="relative z-10 mt-auto w-full max-w-xl px-[max(1rem,env(safe-area-inset-left))] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Player />
      </div>
    </main>
  );
}