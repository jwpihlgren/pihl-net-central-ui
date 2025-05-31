export class UrlBuilder<T, R = never> {
  private baseUrl: string;
  private endpoint: string;
  private queryParams: Record<string, any> = {};

  private constructor(
    baseUrl: string,
    endpoint: string,
    requiredParams?: R
  ) {
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;

    if (requiredParams) {
      Object.entries(requiredParams as Record<string, any>).forEach(([key, value]) => {
        this.queryParams[key] = String(value);
      });
    }
  }

  // Static factory method for optional parameters only
  static create<T = Record<string, any>>(
    baseUrl: string,
    endpoint: string
  ): UrlBuilder<T, never> {
    return new UrlBuilder<T, never>(baseUrl, endpoint);
  }

  // Static factory method for optional + required parameters
  static createWithRequired<T = Record<string, any>, R = Record<string, any>>(
    baseUrl: string,
    endpoint: string,
    requiredParams: R
  ): UrlBuilder<T, R> {
    return new UrlBuilder<T, R>(baseUrl, endpoint, requiredParams);
  }

  addParam<K extends keyof T>(key: K, value: any): UrlBuilder<T, R> {
    this.queryParams[String(key)] = value;
    return this;
  }

  removeParam<K extends keyof T>(key: K): UrlBuilder<T, R> {
    delete this.queryParams[String(key)];
    return this;
  }

  build(): string {
    const url = new URL(this.endpoint, this.baseUrl);
    Object.entries(this.queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  }
}

