const crypto = require('crypto');

function _hash_internal(method, salt, password) {
    const methodParts = method.split(':');
    const hashingMethod = methodParts[1]; // 'sha256' or other hash method
    const iterations = parseInt(methodParts[2], 10) || 260000; // Default to 260000 iterations if not specified

    // Use PBKDF2 hashing
    const hashBuffer = crypto.pbkdf2Sync(password, salt, iterations, 32, hashingMethod);
    return [hashBuffer.toString('hex')]; // Return the hashed password in hex format
}

const hashNewPassword = (req, res, next) => {
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: 'New password is required' });
    }

    // Generate a salt (you can customize the salt generation logic)
    const salt = crypto.randomBytes(16).toString('hex');
    
    // Hash the new password with PBKDF2 (you can change the method if you prefer something else)
    const [hashedPassword] = _hash_internal('pbkdf2:sha256:260000', salt, newPassword);

    // Attach the hashed password and salt to the request object for the controller
    req.hashedPassword = hashedPassword;
    req.salt = salt;

    // Call the next middleware (or controller)
    next();
};

module.exports = hashNewPassword;
