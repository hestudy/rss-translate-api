export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain: string;
  port: number;
  apiPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;
  fireCrawlUrl?: string;
  scrapyFull?: boolean;
  openaiApiKey: string;
  openaiBaseUrl: string;
  openaiModel: string;
  translateLanguage: string;
};
