const files = import.meta.glob("../../../images/*.{jpeg,jpg,JPEG}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function fileNamed(name: string) {
  const match = Object.entries(files).find(([path]) => path.toLowerCase().endsWith(`/${name}`));
  return match?.[1];
}

const byPrefix: { prefix: string; src: string | undefined }[] = [
  { prefix: "KB", src: fileNamed("kebab.jpeg") },
  { prefix: "KR", src: fileNamed("karahi.jpeg") },
  { prefix: "PL", src: fileNamed("platter.jpeg") },
  { prefix: "BR", src: fileNamed("bread.jpeg") },
  { prefix: "DP", src: fileNamed("dip.jpeg") },
  { prefix: "SL", src: fileNamed("salad.jpeg") },
  { prefix: "H", src: fileNamed("handi.jpeg") },
  { prefix: "D", src: fileNamed("drinks.jpeg") },
  { prefix: "B", src: fileNamed("boti.jpeg") },
];

export function imageForCode(code: string) {
  const found = byPrefix.find((item) => code.toUpperCase().startsWith(item.prefix));
  return found?.src;
}
