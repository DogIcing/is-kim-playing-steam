import express from 'express';
import sharp from 'sharp';

// Config
const app = express();
const {
    MAP_ENDPOINT = 'https://cdn.fastly.steamstatic.com/steam/publicstats/global_traffic.png',
    PORT = 3000
} = process.env;

// North Korea
const BOUNADRY = {
    left: 1085,
    top: 180,
    width: 5,
    height: 4
};

// Persistent data
let lastSeen: string;

// Helpers
const isAchromatic = (r: number, g: number, b: number, threshold: number = 50) =>
    Math.max(r, g, b) - Math.min(r, g, b) < threshold;

const randomFromArray = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)]!;

// Main route
app.get('/', async (req, res) => {
    // Fetch latest map
    const response = await fetch(MAP_ENDPOINT!);
    if (!response.ok) return res.status(500);

    // Compute buffer and extract boundary
    const mapBuffer = await response.arrayBuffer()
        .then(b => Buffer.from(b));

    const { data, info: { channels } } = await sharp(mapBuffer)
        .extract(BOUNADRY).raw()
        .toBuffer({ resolveWithObject: true });

    // Search for a chromatic pixel
    let online = false;
    for (let i = 0; i < data.length; i += channels) {
        const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
        if (!r || !g || !b) continue;

        if (!isAchromatic(r, g, b)) {
            lastSeen = new Date().toISOString();
            online = true;
            break;
        }
    }

    // Respond & choose a random message
    res.send({
        online, lastSeen,
        message: online ? randomFromArray([
            // Online messages
            'Even dictators need a break sometimes',
            'Steam infiltrates the Hermit Kingdom',
            'Kim is currently playing steam',
            'Kim\'s PC lives on, who knew?',
            'I wonder what he\'s playing',
            'North Korea\'s steaming',
        ]) : randomFromArray([
            // Offline messages
            'Has Kim actually touched grass?',
            'Kim\'s probably updating his PC',
            'All\'s quiet in North Korea',
            'Power outage in North Korea?',
            'Uh oh...',
        ]),
    });
});

// Start express
app.listen(PORT, () => {
    console.log(`Watching Kim\'s activity on port ${PORT}`);
});
