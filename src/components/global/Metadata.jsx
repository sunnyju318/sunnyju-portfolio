const BASE_URL = "https://jisun-ju.ca";
const DEFAULT_OG_IMAGE = "/assets/images/metadata/og-home.jpg";

function Metadata({
  title = "Sunny Ju",
  description = "Vancouver-based front-end developer blending code and UI/UX design to create thoughtful, engaging web experiences.",
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  appendSiteName = true,
  // 사이트의 이름을 제목 뒤에 붙일지 말지 결정하는 스위치 역할
}) {
  const fullTitle =
    appendSiteName && title !== "Sunny Ju" ? `${title} | Sunny Ju` : title;

  const canonicalUrl = `${BASE_URL}${path}`;
  const ogImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${BASE_URL}${ogImage}`;

  // 👇 디버깅 코드 추가
  console.log("Metadata rendered:", {
    fullTitle,
    description,
    canonicalUrl,
    ogImageUrl,
  });

  return (
    <>
      {/*  React 19 native metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/*  Open Graph (KakaoTalk, LinkedIn, Facebook, etc.) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </>
  );
}

export default Metadata;
