const crypto = require('crypto');

function _hash_internal(method, salt, password) {
    const methodParts = method.split(':');
    const hashingMethod = methodParts[1]; // 'sha256' or other hash method
    const iterations = parseInt(methodParts[2], 10) || 260000; // Default to 260000 iterations if not specified

    // Use PBKDF2 hashing
    const hashBuffer = crypto.pbkdf2Sync(password, salt, iterations, 32, hashingMethod);
    return [hashBuffer.toString('hex')]; // Return the hashed password in hex format
}

function check_password_hash(pwhash, password) {
    // Ensure the hash is correctly formatted with method, salt, and hash value
    if ((pwhash.match(/\$/g) || []).length < 2) {
        return false; // Invalid hash format
    }

    // Split the hash into method, salt, and hashed value
    const [method, salt, hashval] = pwhash.split('$', 3);

    // Generate the hash from the password and salt using the specified method
    const [generatedHash] = _hash_internal(method, salt, password);

    // Use timingSafeEqual to securely compare the generated hash with the stored hash
    return crypto.timingSafeEqual(Buffer.from(generatedHash, 'hex'), Buffer.from(hashval, 'hex'));
}

module.exports = check_password_hash;
