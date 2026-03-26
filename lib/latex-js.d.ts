declare module "latex.js" {
  export interface HtmlGeneratorOptions {
    hyphenate?: boolean;
  }

  export class HtmlGenerator {
    constructor(options?: HtmlGeneratorOptions);
  }

  export interface LatexDocument {
    domFragment(): DocumentFragment;
    stylesAndScripts(base?: string): HTMLElement | null;
  }

  export function parse(
    latex: string,
    options?: { generator?: HtmlGenerator },
  ): LatexDocument;
}
