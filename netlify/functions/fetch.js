exports.handler = async function(event, context) {
  var CHANNEL = "Monetamarketsprice";
  var url = "https://t.me/s/" + CHANNEL;
  
  var response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 Chrome/120"
    }
  });
  
  var html = await response.text();
  
  var matches = [];
  var regex = /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  var match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  
  if (matches.length === 0) {
    return {
      statusCode: 404,
      headers: {"Access-Control-Allow-Origin": "*"},
      body: JSON.stringify({error: "not found"})
    };
  }
  
  var raw = matches[matches.length - 1]
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
  
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({text: raw})
  };
};
