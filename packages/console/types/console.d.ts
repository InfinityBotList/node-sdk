/* Authors: Resi Respati <https://github.com/resir014>
 *          Kingdaro <https://github.com/kingdaro>
 *          Joydip Roy <https://github.com/rjoydip>
 *          Klaus Sinani <https://github.com/klaussinani>
 */

import { Writable as WritableStream } from 'stream';

declare namespace _console {
  export type DefaultLogger =
    | 'await'
    | 'complete'
    | 'debug'
    | 'error'
    | 'fatal'
    | 'fav'
    | 'info'
    | 'log'
    | 'note'
    | 'pause'
    | 'pending'
    | 'star'
    | 'start'
    | 'success'
    | 'wait'
    | 'warn'
    | 'watch';

  export type ChalkColor =
    | 'black'
    | 'blue'
    | 'blueBright'
    | 'cyan'
    | 'cyanBright'
    | 'gray'
    | 'green'
    | 'greenBright'
    | 'magenta'
    | 'magentaBright'
    | 'red'
    | 'redBright'
    | 'white'
    | 'whiteBright'
    | 'yellow'
    | 'yellowBright';

  export type Secret = (string | number)[];

  export type LoggerFunction = (...message: any[]) => void;

  export type LogLevel = 'info' | 'timer' | 'debug' | 'warn' | 'error';

  export interface LoggerConfiguration {
    badge: string;
    color: ChalkColor;
    label: string;
    logLevel?: LogLevel;
    stream?: WritableStream | WritableStream[];
  }

  export interface InstanceConfiguration {
    displayBadge?: boolean;
    displayDate?: boolean;
    displayFilename?: boolean;
    displayLabel?: boolean;
    displayScope?: boolean;
    displayTimestamp?: boolean;
    underlineLabel?: boolean;
    underlineMessage?: boolean;
    underlinePrefix?: boolean;
    underlineSuffix?: boolean;
    uppercaseLabel?: boolean;
  }

  export interface ConstructorOptions<T extends string> {
    config?: InstanceConfiguration;
    disabled?: boolean;
    interactive?: boolean;
    logLevel?: LogLevel;
    scope?: string;
    secrets?: Secret;
    stream?: WritableStream | WritableStream[];
    types?: Partial<Record<T, LoggerConfiguration>>;
  }

  export interface Constructor {
    new <T extends string = DefaultLogger>(
      options?: ConstructorOptions<T>
    ): Instance<T>;
  }

  interface Base<T extends string = DefaultLogger> {
    addSecrets(secrets: Secret): void;
    clearSecrets(): void;
    config(configObj: InstanceConfiguration): Instance<T>;
    disable(): void;
    enable(): void;
    isEnabled(): boolean;
    scope(...name: string[]): Instance<T>;
    time(label?: string): string;
    timeEnd(label?: string): { label: string; span: number };
    unscope(): void;
  }

  export type Instance<T extends string = DefaultLogger> = Base<T> &
    Record<T, LoggerFunction> &
    Record<DefaultLogger, LoggerFunction>;
}

declare namespace console {
  export type Secret = _console.Secret;
  export type LogLevel = _console.LogLevel;
  export type ChalkColor = _console.ChalkColor;
  export type DefaultLogger = _console.DefaultLogger;
  export type LoggerFunction = _console.LoggerFunction;
  export interface SignaleConfiguration
    extends _console.InstanceConfiguration {}
  export interface LoggerConfiguration extends _console.LoggerConfiguration {}
  export interface SignaleConstructorOptions<T extends string = DefaultLogger>
    extends _console.ConstructorOptions<T> {}
}

declare const console: _console.Instance & {
  Console: _console.Constructor;
};

export = console;