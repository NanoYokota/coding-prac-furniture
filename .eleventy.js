import pluginPug from '@11ty/eleventy-plugin-pug';
import yaml from 'js-yaml';
import prettier from 'prettier';

let prettierOptions;

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginPug);

  eleventyConfig.addWatchTarget('./src/');

  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",
    port: 2525,
    startPath: '/',
    open: 'external',
    notify: false,
    ghostMode: false
  });

  eleventyConfig.addTransform("formatHTML", async (content, outputPath) => {
    if (outputPath?.endsWith(".html")) {
      if (!prettierOptions) {
        prettierOptions = await prettier.resolveConfig("test.html", {
          editorconfig: true,
        });
      }

      // 出力先パスから docs/ 以降の部分を取り出す
      const relativeOutput = outputPath.replace(/^.*docs[\\/]/, "");

      // ディレクトリ階層を算出 (最後のファイル名を pop して残りがディレクトリ階層)
      const segments = relativeOutput.split(/[\\/]/);
      segments.pop(); // ファイル名(index.html)を除去
      const depth = segments.length;

      // ルート ( docs の直下 ) からこのファイルが何階層下なのかを見て、../ を繰り返す
      // 階層が 0 (ルート直下) の場合は "./" にする
      const prefix = depth > 0 ? "../".repeat(depth) : "./";

      // 絶対パスを置換する
      content = content.replace(
        /(src|href)="\/([^"]+)"/g,
        (_, p1, p2) => {
          return `${p1}="${prefix}${p2}"`;
        }
      );

      return prettier.format(content, {
        ...prettierOptions,
        parser: "html",
      });
    }

    return content;
  });

  return {
    pathPrefix: '/',
    passthroughFileCopy: true,
    templateFormats: [
      // "html",
      // "liquid",
      // "ejs",
      // "md",
      // "hbs",
      // "mustache",
      // "haml",
      "pug",
      // "njk",
      // "11ty.js",
    ],
    dir: {
      input: 'src',
      output: 'docs',
      includes: '_template',
      layouts: "_template",
      data: '_data',
    },
  }
};



