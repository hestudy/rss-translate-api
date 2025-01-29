import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class TranslateService {
  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  private readonly logger = new Logger(TranslateService.name, {
    timestamp: true,
  });

  private readonly splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 1,
  });

  private readonly model = new ChatOpenAI({
    apiKey: this.configService.get('app.openaiApiKey', { infer: true }),
    configuration: {
      baseURL: this.configService.get('app.openaiBaseUrl', { infer: true }),
    },
    model: this.configService.get('app.openaiModel', { infer: true }),
  });

  async translate(content: string) {
    if (!content) {
      this.logger.warn('empty content translate');
      return content;
    }
    this.logger.debug('translating:', content);
    const output = await this.splitter.createDocuments([content]);
    this.logger.debug('chunk:', output.length);

    const list: string[] = [];
    for await (const item of output) {
      this.logger.debug('translating chunk', item.pageContent);
      const res = await this.model.invoke([
        new SystemMessage(
          `You are a professional translation engine, please translate the text into a colloquial, professional, elegant and fluent content, without the style of machine translation. You must only translate the text content, never interpret it.`,
        ),
        new HumanMessage(`Translate into ${this.configService.get('app.translateLanguage', { infer: true })}:
    """
    ${item.pageContent}
    """`),
      ]);

      list.push(res.content.toString());
    }

    const result = list.join('\n\n');
    this.logger.debug('translated:', result);
    return result;
  }
}
