import ApiError from "../error/ApiError.js";

export default function (err, req, res, next) {
    console.error(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }
    return res.status(500).json({ 
        message: err.message,
        stack: err.stack
    });
        // message: 'Непредвиденная ошибка!'});
}