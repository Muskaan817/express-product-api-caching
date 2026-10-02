let cache = {};

const TTL = 60 * 1000; // 1 minute

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const value = cache[key];

    if (value) {
        const age = Date.now() - value.createdAt;

        if (age < TTL) {
            res.set("X-Cache", "HIT");

            return res.json(value.data);
        }

        // Cache expired
        delete cache[key];
    }

    res.set("X-Cache", "MISS");

    const originalJson = res.json;

    res.json = function (data) {
        cache[key] = {
            data: data,
            createdAt: Date.now()
        };

        return originalJson.call(this, data);
    };

    next();
}

module.exports = {
    cacheMiddleware
};