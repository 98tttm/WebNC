const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "FashionData";

const fashionData = [
    // ===== Street Style (5 items) =====
    {
        title: "Phil Oh's Best Street Style Photos From the Fall 2023 Shows in Paris",
        details: `<p>There are two street style camps in Paris this season—those who are willing to brave the cold and go coatless for the sake of fashion, and others who are bundled up in their warmest furs and scarves.</p>
<p>Phil Oh has captured the best of both approaches. He's also snapped a healthy mix of personal style and brand devotion—as seen by the Rick Owens obsessives who wear him head-to-toe. Follow along as Phil Oh captures the best street style from the shows here.</p>
<img src="https://assets.vogue.com/photos/63fd7b tried/slide/streetstyle-paris-fw23-day1.jpg" alt="Street Style Paris" />`,
        thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop",
        style: "Street Style",
        creationDate: new Date("2026-03-01T10:00:00Z"),
    },
    {
        title: "Phil Oh's Best Street Style Photos From the Fall 2023 Shows in Milan",
        details: `<p>Milan Fashion Week brought out the city's most stylish residents and international fashion enthusiasts alike. The streets were alive with bold colors, daring silhouettes, and innovative layering techniques.</p>
<p>From oversized outerwear to statement accessories, Milan's street style scene continues to push boundaries and redefine contemporary fashion.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
        style: "Street Style",
        creationDate: new Date("2026-02-28T14:00:00Z"),
    },
    {
        title: "Phil Oh's Best Street Style Photos From the Fall 2023 Shows in London",
        details: `<p>London's street style during Fashion Week is always a masterclass in eclectic dressing. This season was no exception, with attendees mixing high fashion with vintage finds and emerging designer pieces.</p>
<p>The British capital's unique approach to style—irreverent, creative, and utterly confident—was on full display outside the city's most iconic venues.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=300&fit=crop",
        style: "Street Style",
        creationDate: new Date("2026-02-25T09:00:00Z"),
    },
    {
        title: "Vivienne Westwood Is Remembered in London",
        details: `<p>Fashion's punk godmother Vivienne Westwood left an indelible mark on the industry. London's fashion community came together to celebrate her legacy through street style that paid homage to her revolutionary designs.</p>
<p>From tartan prints to corsetry, the influence of Westwood was seen throughout the city's most fashionable neighborhoods.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=300&fit=crop",
        style: "Street Style",
        creationDate: new Date("2026-02-20T16:00:00Z"),
    },
    {
        title: "Why the Short Suit Should Be Your Next Spring Investment",
        details: `<p>The short suit has emerged as one of the most versatile and stylish options for the modern wardrobe. Perfect for transitional weather, this trend combines the structure of tailoring with the ease of warm-weather dressing.</p>
<p>Whether you opt for a matching set or mix separates, the short suit is a street style favorite that works for everything from office days to weekend outings.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1544957992-20514f595d6f?w=400&h=300&fit=crop",
        style: "Street Style",
        creationDate: new Date("2026-02-18T11:00:00Z"),
    },

    // ===== Casual (4 items) =====
    {
        title: "Effortless Weekend Looks That Redefine Casual Dressing",
        details: `<p>Casual dressing doesn't mean compromising on style. This season's most exciting casual looks blend comfort with carefully considered design choices.</p>
<p>Think elevated basics—perfectly worn-in denim paired with luxe knitwear, sneakers that are as stylish as they are comfortable, and accessories that add just the right amount of polish to your off-duty wardrobe.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop",
        style: "Casual",
        creationDate: new Date("2026-03-02T08:00:00Z"),
    },
    {
        title: "The Art of Layering: Mastering Transitional Season Style",
        details: `<p>As the seasons change, so does our approach to getting dressed. Layering is the key to navigating unpredictable weather without sacrificing personal style.</p>
<p>The trick lies in mixing textures and proportions—a lightweight trench over a hoodie, a vest layered atop a crisp button-down, or a scarf draped over a simple tee. These combinations create visual interest while keeping you comfortable throughout the day.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop",
        style: "Casual",
        creationDate: new Date("2026-02-27T13:00:00Z"),
    },
    {
        title: "Denim on Denim: How to Pull Off the Canadian Tuxedo",
        details: `<p>Once considered a fashion faux pas, the double denim look has been fully embraced by the style set. The key to making it work is playing with different washes and textures.</p>
<p>Pair a dark indigo jacket with lighter wash jeans, or try a chambray shirt with rigid selvedge denim. The contrast creates depth and shows that your denim-on-denim moment is intentional, not accidental.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=300&fit=crop",
        style: "Casual",
        creationDate: new Date("2026-02-22T10:00:00Z"),
    },
    {
        title: "Sneaker Culture Meets High Fashion: The Best Casual Kicks of 2026",
        details: `<p>The line between sneaker culture and high fashion continues to blur. This season's most coveted casual footwear ranges from retro-inspired runners to minimalist leather designs.</p>
<p>Whether you're a collector or simply appreciate good design, investing in the right pair of sneakers can elevate even the most basic casual outfit into something noteworthy.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        style: "Casual",
        creationDate: new Date("2026-02-15T15:00:00Z"),
    },

    // ===== Formal (4 items) =====
    {
        title: "The Return of Old Hollywood Glamour on the Red Carpet",
        details: `<p>Hollywood's golden age is making a triumphant return to the red carpet. Designers are channeling the elegance and sophistication of classic cinema with flowing gowns, dramatic silhouettes, and luxurious fabrics.</p>
<p>Think sweeping trains, intricate beadwork, and figure-flattering cuts that harken back to the days of Grace Kelly and Audrey Hepburn. This trend proves that true glamour never goes out of style.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=300&fit=crop",
        style: "Formal",
        creationDate: new Date("2026-03-03T12:00:00Z"),
    },
    {
        title: "Modern Tailoring: The New Rules of the Business Suit",
        details: `<p>The business suit has undergone a radical transformation. Gone are the days of boxy, ill-fitting corporate uniforms. Today's tailoring is all about personal expression within professional boundaries.</p>
<p>Expect to see relaxed fits, unexpected color choices, and creative styling—open-collar shirts, bold pocket squares, and statement shoes that bring personality to the boardroom.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        style: "Formal",
        creationDate: new Date("2026-02-26T09:00:00Z"),
    },
    {
        title: "Evening Wear Trends: What to Wear to Every Formal Occasion",
        details: `<p>Navigating the dress code for formal events can be challenging, but this season's evening wear options make it easier than ever to look impeccable.</p>
<p>From black-tie galas to cocktail parties, the key is choosing pieces that feel both appropriate and personal. Velvet blazers, silk blouses, and statement jewelry are your best friends for any dressed-up occasion.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&h=300&fit=crop",
        style: "Formal",
        creationDate: new Date("2026-02-21T17:00:00Z"),
    },
    {
        title: "The Power of Accessories in Formal Dressing",
        details: `<p>In formal dressing, accessories are not just additions—they're essential components that can make or break an outfit. The right watch, the perfect pair of cufflinks, or a carefully chosen tie can elevate a standard suit into something truly special.</p>
<p>This season, look for statement pieces that reflect your personal style: vintage brooches, artisan-crafted leather goods, and timepieces that tell a story beyond the hour.</p>`,
        thumbnail: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=300&fit=crop",
        style: "Formal",
        creationDate: new Date("2026-02-17T14:00:00Z"),
    },
];

async function seedData() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection("Fashion");

        // Clear existing data
        await collection.deleteMany({});
        console.log("Cleared existing Fashion data");

        // Insert sample data
        const result = await collection.insertMany(fashionData);
        console.log(`Inserted ${result.insertedCount} fashion items`);

        console.log("\nSample data seeded successfully!");
        console.log("Styles: Street Style (5), Casual (4), Formal (4)");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await client.close();
    }
}

seedData();
