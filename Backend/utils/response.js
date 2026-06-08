// ========================================
// 统一的 API 响应助手
// 减少控制器中的重复代码
// ========================================

const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        ...data
    });
};

const sendError = (res, message, statusCode = 400, error = null) => {
    const response = {
        success: false,
        message
    };
    
    if (process.env.NODE_ENV === 'development' && error) {
        response.error = error.message;
    }
    
    res.status(statusCode).json(response);
};

const handleAsyncError = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            console.error(`${fn.name} 错误:`, err);
            sendError(res, '操作失败', 500, err);
        }
    };
};

module.exports = {
    sendSuccess,
    sendError,
    handleAsyncError
};
