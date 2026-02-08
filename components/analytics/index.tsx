import dynamic from "next/dynamic";

// Lazy load analytics components - they don't need to block initial render
const GoogleAnalytics = dynamic(() => import("./google-analytics"), {
  ssr: false,
});

const OpenPanelAnalytics = dynamic(() => import("./open-panel"), {
  ssr: false,
});

export default function Analytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <OpenPanelAnalytics />
      <GoogleAnalytics />
    </>
  );
}
