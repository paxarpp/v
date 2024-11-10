const userDevice = [/Android/, /iPhone/, /Symbian/, /Windows Phone/];

export const useDeviceDetect = () => {
  const isMobile =
    window.innerWidth < 768 ||
    userDevice.some((regexp) => regexp.test(navigator?.userAgent || ''));

  return { isMobile };
};
