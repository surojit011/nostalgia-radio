"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { playlists } from "@/lib/tracks";
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
} from "@/components/icons";

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const existing = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      existing?.();
      resolve();
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Player() {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [apiReady, setApiReady] = useState(false);

  const playlist = playlists[playlistIndex];
  const activeTrack = playlist.tracks[trackIndex];

  const ytPlayerRef = useRef<YT.Player | null>(null);
  const wrapperElRef = useRef<HTMLDivElement | null>(null);
  const desktopRotorRef = useRef<HTMLDivElement | null>(null);
  const mobileRotorRef = useRef<HTMLDivElement | null>(null);
  const desktopRailRef = useRef<HTMLDivElement | null>(null);
  const mobileRailRef = useRef<HTMLDivElement | null>(null);

  const draggingRef = useRef(false);
  const loadedVideoIdRef = useRef<string | null>(null);
  const trackRef = useRef(activeTrack);
  const playlistRef = useRef(playlist);

  useEffect(() => {
    playlistRef.current = playlist;
  }, [playlist]);

  useEffect(() => {
    trackRef.current = activeTrack;
  }, [activeTrack]);

  const goNext = useCallback(() => {
    setTrackIndex(
      (i) => (i + 1) % playlistRef.current.tracks.length
    );
  }, []);

  const goPrev = useCallback(() => {
    setTrackIndex(
      (i) =>
        (i - 1 + playlistRef.current.tracks.length) %
        playlistRef.current.tracks.length
    );
  }, []);

  const selectPlaylist = useCallback((index: number) => {
    setPlaylistIndex(index);
    setTrackIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const togglePlay = useCallback(() => {
    const player = ytPlayerRef.current;

    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, [isPlaying]);

  const placeWrapper = useCallback(() => {
    const wrapper = wrapperElRef.current;

    if (!wrapper) return;

    const isDesktop = window.matchMedia("(min-width: 640px)").matches;

    const rotor = isDesktop
      ? desktopRotorRef.current
      : mobileRotorRef.current;

    if (rotor && wrapper.parentElement !== rotor) {
      rotor.appendChild(wrapper);
    }
  }, []);

  // Load the YouTube iframe API.
  useEffect(() => {
    let mounted = true;

    loadYouTubeIframeApi().then(() => {
      if (mounted) setApiReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Create the YouTube player once the API is ready.
  useEffect(() => {
    if (!apiReady || ytPlayerRef.current) return;
    if (!trackRef.current.videoId) return;

    const wrapper = document.createElement("div");
    wrapper.className = "absolute inset-0";

    const target = document.createElement("div");

    wrapper.appendChild(target);

    wrapperElRef.current = wrapper;

    const firstTrack = trackRef.current;
    loadedVideoIdRef.current = firstTrack.videoId;

    ytPlayerRef.current = new window.YT.Player(target, {
      videoId: firstTrack.videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: (event) => {
          const iframe = event.target.getIframe();

          iframe.style.position = "absolute";
          iframe.style.top = "50%";
          iframe.style.left = "50%";
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.border = "0";
          iframe.style.transform =
            "translate(-50%, -50%) scale(1.8)";

          setDuration(event.target.getDuration() || firstTrack.duration);
          placeWrapper();
        },

        onStateChange: (event) => {
          const state = window.YT.PlayerState;

          if (event.data === state.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === state.PAUSED) {
            setIsPlaying(false);
          } else if (event.data === state.ENDED) {
            setIsPlaying(false);
            goNext();
          }
        },

        onError: (event) => {
          track("youtube_playback_error", {
            code: event.data,
            videoId: trackRef.current.videoId,
          });

          goNext();
        },
      },
    });

    placeWrapper();

    window.addEventListener("resize", placeWrapper);

    return () => {
      window.removeEventListener("resize", placeWrapper);
    };
  }, [apiReady, goNext, placeWrapper]);

  // Change the YouTube video when the active track changes.
  useEffect(() => {
    const player = ytPlayerRef.current;

    if (!player || !apiReady || !activeTrack.videoId) return;

    if (loadedVideoIdRef.current === activeTrack.videoId) return;

    loadedVideoIdRef.current = activeTrack.videoId;

    setCurrentTime(0);
    setDuration(activeTrack.duration);

    player.loadVideoById(activeTrack.videoId);
  }, [activeTrack, apiReady]);

  // Update progress while playing.
  useEffect(() => {
    if (!isPlaying) return;

    let frame: number;

    const tick = () => {
      const player = ytPlayerRef.current;

      if (player && !draggingRef.current) {
        setCurrentTime(player.getCurrentTime());
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [isPlaying]);

  const makeSeekHandler = useCallback(
    (getRail: () => HTMLDivElement | null) => {
      return (e: React.PointerEvent<HTMLDivElement>) => {
        const rail = getRail();

        if (!rail || duration <= 0) return;

        draggingRef.current = true;

        const rect = rail.getBoundingClientRect();

        const update = (clientX: number) => {
          const ratio = Math.min(
            1,
            Math.max(0, (clientX - rect.left) / rect.width)
          );

          setCurrentTime(ratio * duration);

          return ratio;
        };

        update(e.clientX);

        const onMove = (event: PointerEvent) => {
          update(event.clientX);
        };

        const onUp = (event: PointerEvent) => {
          const ratio = update(event.clientX);

          ytPlayerRef.current?.seekTo(ratio * duration, true);

          draggingRef.current = false;

          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      };
    },
    [duration]
  );

  const progressPercent =
    duration > 0
      ? Math.min(100, (currentTime / duration) * 100)
      : 0;

  const vinyl = (
    rotorRef: React.RefObject<HTMLDivElement | null>,
    sizeClass: string
  ) => (
    <div
      className={`relative shrink-0 self-start overflow-hidden rounded-full ring-1 ring-white/15 ${sizeClass}`}
    >
      <div
        ref={rotorRef}
        className="vinyl-spin absolute inset-0"
        style={{
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <span className="h-3 w-3 rounded-full bg-black/70 ring-2 ring-white/40" />
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Playlist buttons */}
      <div className="mb-3 flex items-center justify-center gap-2">
        {playlists.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => selectPlaylist(idx)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              idx === playlistIndex
                ? "border-accent/60 bg-accent/20 text-white"
                : "border-white/10 bg-black/20 text-white/60 hover:text-white/90"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden items-center gap-4 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-3 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7] sm:flex">
        {vinyl(desktopRotorRef, "h-20 w-20")}

        <div className="min-w-0 flex-1 flex-col gap-1.5">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-tight">
              {activeTrack.title}
            </p>
            <p className="truncate text-[12.5px] text-white/70">
              {activeTrack.artist}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              ref={desktopRailRef}
              onPointerDown={makeSeekHandler(
                () => desktopRailRef.current
              )}
              className="group relative flex h-6 w-full touch-none items-center"
            >
              <div className="h-[3px] w-full rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div
                className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100"
                style={{ left: `${progressPercent}%` }}
              />
            </div>

            <span className="shrink-0 text-[10.5px] tabular-nums text-white/60">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1">
            <button
              aria-label="Previous track"
              onClick={goPrev}
              className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <PrevIcon className="h-4 w-4" />
            </button>

            <button
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-accent to-accent-dark text-black shadow-[0_4px_16px_-2px_var(--color-accent)] ring-1 ring-white/25"
            >
              {isPlaying ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </button>

            <button
              aria-label="Next track"
              onClick={goNext}
              className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <NextIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col gap-3 rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-4 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7] sm:hidden">
        <div className="flex items-center gap-3">
          {vinyl(mobileRotorRef, "h-16 w-16")}

          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-tight">
              {activeTrack.title}
            </p>
            <p className="truncate text-[12.5px] text-white/70">
              {activeTrack.artist}
            </p>
          </div>
        </div>

        <div
          ref={mobileRailRef}
          onPointerDown={makeSeekHandler(
            () => mobileRailRef.current
          )}
          className="group relative flex h-6 w-full touch-none items-center"
        >
          <div className="h-[3px] w-full rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div
            className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100"
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-3 items-center">
          <span className="justify-self-start text-[10.5px] tabular-nums text-white/60">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex items-center justify-center gap-2 justify-self-center">
            <button
              aria-label="Previous track"
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 active:bg-white/10"
            >
              <PrevIcon className="h-5 w-5" />
            </button>

            <button
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-b from-accent to-accent-dark text-black shadow-[0_6px_20px_-2px_var(--color-accent)] ring-1 ring-white/25"
            >
              {isPlaying ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5" />
              )}
            </button>

            <button
              aria-label="Next track"
              onClick={goNext}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 active:bg-white/10"
            >
              <NextIcon className="h-5 w-5" />
            </button>
          </div>

          <span className="justify-self-end" />
        </div>

        {!activeTrack.videoId && (
          <p className="text-center text-[10px] text-amber-300/80">
            No videoId set for this track — see lib/tracks.ts
          </p>
        )}
      </div>
    </div>
  );
}