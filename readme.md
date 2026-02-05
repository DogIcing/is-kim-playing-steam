# is-kim-playing-steam

For years there's been a single tiny green dot in North Korea on steam's [traffic map](https://store.steampowered.com/stats/content/tothemoon). Nobody knows for certain who exactly is playing from the hermit kingdom but we all know for sure that the amount of grass left untouched by whoever's playing is mildly concerning.

So, lo and behold, here's one of the most useless APIs for your entertainment (or stalking?)

---

## 🔥 API Usage

**Base URL:** `is-kim-playing-steam.up.railway.app`

**Method:** `GET`

**Sample Request**
```http
GET /
```

**Sample Response**
```json
{
  "online": true,
  "lastSeen": "2026-02-05T09:06:57.782Z",
  "message": "Even dictators need a break sometimes"
}
```

---

## 🤔 Self Hosting

Want to stalk Kim yourself? Self-hosting `is-kim-playing-steam` is as simple as cloning this repository and installing dependencies.

### Getting Started

**1. Clone repo**
```bash
git clone https://github.com/dogicing/is-kim-playing-steam.git
```

**2. Install dependencies**
```bash
npm install
```

**3. Start API**
```bash
npm run start
```

### Customization

**Data source**

`is-kim-playing-steam` operates by extracting pixel data in the North-Korea region from the steam traffic map. You can customize the image source through the `MAP_ENDPOINT` environment variable.

**Port**

You can customize the port through the `PORT` environment variable.

---

## ❤️ Dependencies

- [**Sharp**](https://www.npmjs.com/package/sharp) for extracting pixel data from the map
- [**Express**](https://www.npmjs.com/package/express) as the heart of the API
- [**Typescript**](https://www.npmjs.com/package/typescript) to make javascript ever so slightly more bearable

---

## ✅ License

MIT, do whatever you want with this 🤷‍♂️
