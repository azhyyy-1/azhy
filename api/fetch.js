export default async function handler(req, res) {
  const CHANNEL = "Monetamarketsprice";
  const url = "https://t.me/s/" + CHANNEL;
  
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 Chrome/120" }
  });
  
  const html = await response.text();
  
  var matches = [];
  var regex = /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  var match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  
  if (matches.length === 0) {
    return res.status(404).json({ error: "پەیامێک نەدۆزرایەوە" });
  }
  
  var raw = matches[matches.length - 1]
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ text: raw });
}
