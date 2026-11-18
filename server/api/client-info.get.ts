export default defineEventHandler((event) => {
  // Ambil semua header dari request Cloudflare
  const headers = getRequestHeaders(event);

  // 1. Ambil IP
  const ip =
    headers["cf-connecting-ip"] ||
    getRequestIP(event, { xForwardedFor: true }) ||
    "Unknown";

  // 2. Ambil Negara (ubah kode "ID" jadi nama negara)
  const countryCode = headers["cf-ipcountry"];
  let country = "Unknown";
  if (countryCode) {
    try {
      country =
        new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode) ||
        countryCode;
    } catch {
      country = countryCode;
    }
  }

  // 3. Ambil Kota (pastikan Managed Transforms di Cloudflare sudah aktif)
  const city = headers["cf-ipcity"] || "Unknown";

  // 4. Parse User-Agent untuk Device/Browser
  const ua = headers["user-agent"] || "";
  const device = describeUserAgent(ua);

  return {
    ip,
    country,
    city,
    device,
  };
});

function describeUserAgent(ua: string): string {
  const matchVersion = (pattern: RegExp, name: string) => {
    const m = ua.match(pattern);
    return m ? `${name} ${m[1]}` : null;
  };

  const browser =
    matchVersion(/Edg(?:e|A|iOS)?\/(\d+)/, "Edge") ||
    matchVersion(/OPR\/(\d+)/, "Opera") ||
    matchVersion(/SamsungBrowser\/(\d+)/, "Samsung Internet") ||
    matchVersion(/(?:Firefox|FxiOS)\/(\d+)/, "Firefox") ||
    matchVersion(/(?:Chrome|CriOS)\/(\d+)/, "Chrome") ||
    matchVersion(/Version\/(\d+).*Safari\//, "Safari") ||
    "Unknown browser";

  const os = ua.includes("Windows NT")
    ? "Windows"
    : ua.includes("Android")
      ? "Android"
      : ua.includes("iPhone") || ua.includes("iPad")
        ? "iOS"
        : ua.includes("Mac OS X")
          ? "macOS"
          : ua.includes("Linux")
            ? "Linux"
            : "Unknown OS";

  return `${browser} on ${os}`;
}
