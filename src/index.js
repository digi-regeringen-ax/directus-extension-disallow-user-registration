/**
 * This extension disables the public registration.
 *
 * @param {Object} param - The parameter object.
 * @param {Function} param.filter - The filter function to register the filters.
 */

import {createError, ErrorCode} from '@directus/errors';

// Define a custom error for invalid payloads when public registration is not allowed
const InvalidPayloadError = createError(ErrorCode.InvalidPayload, 'Public registration not allowed', 500);

export default ({filter}) => {
    /**
     * Disables public registration by setting the `public_registration` property to `false`
     * if the `PUBLIC_REGISTRATION_ALLOWED` environment variable is not set or is set to `false`.
     * Throws an error if public registration is attempted and `PUBLIC_REGISTRATION_THROW_ERROR` is set to `true`.
     *
     * @param {Object} input - The input settings object.
     * @returns {Object} - The modified settings object with `public_registration` set to `false`
     *                     if `PUBLIC_REGISTRATION_ALLOWED` is not set or is set to `false`, otherwise the original input.
     * @throws {InvalidPayloadError} - If public registration is attempted and `PUBLIC_REGISTRATION_THROW_ERROR` is set to `true`.
     */
    const disablePublicRegistration = input => {
        const isPublicRegistrationAllowed = (process.env.PUBLIC_REGISTRATION_ALLOWED === 'true' || process.env.PUBLIC_REGISTRATION_ALLOWED === true);
        if (
            !isPublicRegistrationAllowed
            && input.public_registration
            && (process.env.PUBLIC_REGISTRATION_THROW_ERROR === 'true' || process.env.PUBLIC_REGISTRATION_THROW_ERROR === true)) {
            throw new InvalidPayloadError();
        }
        // Overwrite the public_registration property if public registration is not allowed
        return isPublicRegistrationAllowed ? input : {...input, public_registration: false};
    }

    // Register the disablePublicRegistration function to the 'settings.create' and 'settings.update' filters
    filter('settings.create', disablePublicRegistration);
    filter('settings.update', disablePublicRegistration);
};