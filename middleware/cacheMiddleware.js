const fs = require("fs/promises");
const path = require("path");

const cachePath = path.join(__dirname, "../database/cache.json");
const TTL = 60 * 1000; // 1 minute

async function readCache() {
    try {
        const data = await fs.readFile(cachePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

async function writeCache(cache) {
    await fs.writeFile(
        cachePath,
        JSON.stringify(cache, null, 2)
    );
}

async function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const cache = await readCache();
    const value = cache[key];
    if (value) {
        const age = Date.now() - value.createdAt;
        if (age < TTL) {
            res.set("X-Cache", "HIT");
            return res.json(value.data);
        }
        delete cache[key];
        await writeCache(cache);
    }
    res.set("X-Cache", "MISS");

    const originalJson = res.json.bind(res);
    res.json = async function (data) {
        if (res.statusCode === 200) {
            const latestCache = await readCache();
            latestCache[key] = {
                data: data,
                createdAt: Date.now()
            };
            await writeCache(latestCache);
        }
        return originalJson(data);
    };
    next();
}

async function clearCache() {
    await writeCache({});
}

module.exports = {
    cacheMiddleware,
    clearCache
};