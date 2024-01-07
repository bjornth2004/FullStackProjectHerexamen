import jwt from 'jsonwebtoken';

const generateJwtToken = ({ email, role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'koten_app' };

    try {
        return jwt.sign({ email, role }, process.env.JWT_SECRET, options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };
