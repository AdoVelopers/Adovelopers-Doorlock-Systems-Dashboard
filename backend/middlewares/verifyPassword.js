const crypto = require('crypto');

function verifyPassword(pwhash, password) {
    // Check if the hash contains at least two "$" symbols
    if ((pwhash.match(/\$/g) || []).length < 2) {
        return false;
    }

    // Split the hash into method, salt, and hashed value
    const [method, salt, hashval] = pwhash.split('$', 3);

    // Extract the hashing algorithm and iterations from the method
    const methodParts = method.split(':');
    if (methodParts[0] !== 'pbkdf2' || methodParts.length < 2) {
        throw new Error(`Invalid hashing method: ${method}`);
    }

    const hashingMethod = methodParts[1]; // sha256
    const iterations = parseInt(methodParts[2]) || 260000; // Get iterations, default to 260000 if not specified

    // Hash the provided password using the method and salt
    const hashBuffer = crypto.pbkdf2Sync(password, salt, iterations, 32, hashingMethod);

    // Convert the stored hash value from Base64 to Buffer
    const storedHashBuffer = Buffer.from(hashval, 'hex'); // Assuming the stored hash is in hex format

    // Check if both buffers are of the same length
    if (hashBuffer.length !== storedHashBuffer.length) {
        throw new RangeError('Input buffers must have the same byte length');
    }

    // Use timingSafeEqual to compare
    return crypto.timingSafeEqual(hashBuffer, storedHashBuffer);
}

module.exports = verifyPassword;
