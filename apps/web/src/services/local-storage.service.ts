enum LocalStorageKey {
  BACKEND_TOKEN = "BACKEND_TOKEN",
  ME = "ME"
}

class LocalStorageService {
  static set = (key: string, value: object, raw: boolean = false) => {
    localStorage.setItem(key, raw ? (value as any) : JSON.stringify(value));
  };

  static clearAuth = () => {
    this.remove(LocalStorageKey.BACKEND_TOKEN);
    this.remove(LocalStorageKey.ME);
  };

  static get = (key: string, isJSON: boolean = false) => {
    const ret = localStorage.getItem(key);
    if (!ret) return null;
    if (isJSON) {
      try {
        return JSON.parse(ret!);
      } catch (e) {
        console.log(e);
        return null;
      }
    } else {
      return ret;
    }
  };

  static remove = (key: string) => {
    return localStorage.removeItem(key);
  };
}

export default LocalStorageService;