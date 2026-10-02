let cache = {};

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const value = cache[key];

    if (value) {
        res.set("X-Cache", "HIT");
        return res.json(value);
    }

    res.set("X-Cache", "MISS");

    const originalJson = res.json;

    res.json = function (data) {
        cache[key] = data;

        return originalJson.call(this, data);
    };

    next();
}

module.exports = {
    cacheMiddleware
};