
/**
 * Not being used right now but saved in case this is needed again in the future.
 */

export class Reader {
  public lines: string[];
  public idx: number;

  constructor(markdown: string) {
    this.lines = markdown.split(`\n`).map((line): string => line.trim()).filter((line): boolean => line.length > 0);
    this.idx = 0;
  }

  public get line(): string {
    if (this.isFinished()) {
      throw new Error('Reader is finished');
    }
    return this.lines[this.idx];
  }

  public advance(): void {
    if (this.isFinished()) {
      throw new Error('Reader is finished');
    }
    this.idx += 1;
  }

  public hasNext(): boolean {
    return this.idx < this.lines.length - 1;
  }

  public isFinished(): boolean {
    return this.idx >= this.lines.length;
  }
}

export interface Reader {
  idx: number;
  lines: string[];
  line: string;
}
