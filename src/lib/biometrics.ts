import * as LocalAuthentication from 'expo-local-authentication';

/**
 * Returns true only if the device has biometric hardware AND the user
 * has enrolled at least one biometric (fingerprint / face / iris).
 */
export async function isBiometricAvailable(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return false;

  return LocalAuthentication.isEnrolledAsync();
}

/**
 * Triggers the OS-level biometric prompt.
 * Returns `{ success: true }` on success, or `{ success: false, error }` on failure.
 */
export async function authenticateWithBiometrics(): Promise<{
  success: boolean;
  error?: string;
}> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to continue',
    cancelLabel: 'Use password',
    disableDeviceFallback: false,
    fallbackLabel: 'Use passcode',
  });

  return {
    success: result.success,
    error: result.success ? undefined : result.error,
  };
}

/**
 * Returns a human-readable label for the primary biometric type
 * supported by the device (e.g. "Face ID", "Fingerprint").
 */
export async function getBiometricType(): Promise<string> {
  const types =
    await LocalAuthentication.supportedAuthenticationTypesAsync();

  if (
    types.includes(
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
    )
  )
    return 'Face ID';

  if (
    types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
  )
    return 'Fingerprint';

  if (types.includes(LocalAuthentication.AuthenticationType.IRIS))
    return 'Iris';

  return 'Biometric';
}
