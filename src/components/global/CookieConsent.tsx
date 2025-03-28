import { Component, createSignal, createEffect, Show } from "solid-js";
import { ToCacheBustable } from "./CacheBuster.astro";

// tell typescript that this function is defined in the global scope
// they are defined in the <head> per the previous instructions
declare function consentGranted(): void;
declare function getCookieConsent(): string;

const CookieConsent: Component = () => {
  const [cookies, setCookies] = createSignal("unk");
  const [isMounted, setIsMounted] = createSignal(false);

  const handleAccept = () => {
    setCookies("granted");
    // accepted cookie lasts for a year
    let d = new Date();
    let oneYear = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
    document.cookie = "cookie-consent=granted; expires=" + oneYear + "; path=/";
    consentGranted();
  };

  const handleDecline = () => {
    setCookies("denied");
    // declined cookie only lasts for the session
    document.cookie = "cookie-consent=denied; path=/";
  };

  // this waits to load the cookie banner until the component is mounted
  // so that there is not a component flash
  createEffect(() => {
    setIsMounted(true);
    // get cookie approval after component is mounted
    setCookies(getCookieConsent());
  });

  // if there is no cookie for "cookie-consent", display the banner
  return (
    <Show when={isMounted()} fallback={null}>
<div
  id="cookie-banner"
  class={`${cookies() === "granted" || cookies() === "denied" ? "hidden" : ""} fixed bottom-0 left-0 right-0 z-50 m-2 max-w-2xl mx-auto rounded-lg border-2 border-yellow-500 bg-blue-900 text-slate-800 shadow-xl`}
>
  <div class="p-4 flex items-center">
    <img
      src={ToCacheBustable("/images/cookie.webp")}
      alt="Mangeur de cookie"
      width={100}
      height={100}
      loading="eager"
      class="mr-4"
    />
    <div>
      <p class="mb-4 text-sm sm:text-base text-white">
        Nous utilisons des cookies pour analyser l'expérience utilisateur. Consultez notre{" "}
        <a
          class="text-yellow-500 underline hover:text-blue-600"
          href="/privacy-policy"
          target="_blank"
        >
          Politique de confidentialité.
        </a>
      </p>

      <div class="mx-auto">
        <button
          class="mr-1 items-center h-10 justify-center rounded-full font-semibold duration-200 focus:outline-none inline-flex px-3 py-3 border-2 hover:bg-transparent border-yellow-600 bg-yellow-600 focus-visible:outline-negroni-500 focus-visible:ring-negroni-500 hover:border-negroni-500 hover:text-negroni-500 text-charcoal-500 whitespace-nowrap"
          onClick={handleAccept}
        >
          Accepter
        </button>
        <button
          class="ml-1 items-center h-10 justify-center rounded-full font-semibold duration-200 focus:outline-none inline-flex px-3 py-3 border-2 hover:bg-transparent border-yellow-600 bg-yellow-600 focus-visible:outline-negroni-500 focus-visible:ring-negroni-500 hover:border-negroni-500 hover:text-negroni-500 text-charcoal-500 whitespace-nowrap"
          onClick={handleDecline}
        >
          Refuser
        </button>
      </div>
    </div>
  </div>
</div>
    </Show>
  );
};

export default CookieConsent;