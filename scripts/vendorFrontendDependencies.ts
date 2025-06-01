import * as fs from "fs";
import { join as pathJoin, basename as pathBasename, dirname as pathDirname } from "path";
import { assert } from "tsafe/assert";
import { run } from "./shared/run";
import { cacheDirPath as cacheDirPath_base } from "./shared/cacheDirPath.overridable";
import { getThisCodebaseRootDirPath } from "./tools/getThisCodebaseRootDirPath.overridable";

export function vendorFrontendDependencies() {
    const vendorDirPath = pathJoin(getThisCodebaseRootDirPath(), "dist", "tools", "vendor");
    const cacheDirPath = pathJoin(cacheDirPath_base, "vendorFrontendDependencies");

    const extraBundleFileBasenames = new Set<string>();

    fs.readdirSync(vendorDirPath)
        .filter(fileBasename => fileBasename.endsWith(".js"))
        .map(fileBasename => pathJoin(vendorDirPath, fileBasename))
        .forEach(filePath => {
            {
                const mapFilePath = `${filePath}.map`;

                if (fs.existsSync(mapFilePath)) {
                    fs.unlinkSync(mapFilePath);
                }
            }

            if (!fs.existsSync(cacheDirPath)) {
                fs.mkdirSync(cacheDirPath, { recursive: true });
            }

            const webpackConfigJsFilePath = pathJoin(cacheDirPath, "webpack.config.js");
            const webpackOutputDirPath = pathJoin(cacheDirPath, "webpack_output");
            const webpackOutputFilePath = pathJoin(webpackOutputDirPath, "index.js");

            fs.writeFileSync(
                webpackConfigJsFilePath,
                Buffer.from(
                    [
                        ``,
                        `module.exports = {`,
                        `   mode: 'production',`,
                        `  entry: Buffer.from("${Buffer.from(filePath, "utf8").toString("base64")}", "base64").toString("utf8"),`,
                        `  output: {`,
                        `    path: Buffer.from("${Buffer.from(webpackOutputDirPath, "utf8").toString("base64")}", "base64").toString("utf8"),`,
                        `    filename: '${pathBasename(webpackOutputFilePath)}',`,
                        `    libraryTarget: 'module',`,
                        `  },`,
                        `  target: "web",`,
                        `  module: {`,
                        `    rules: [`,
                        `      {`,
                        `        test: /\.js$/,`,
                        `        use: {`,
                        `          loader: 'babel-loader',`,
                        `          options: {`,
                        `            presets: ['@babel/preset-env'],`,
                        `          }`,
                        `        }`,
                        `      }`,
                        `    ]`,
                        `  },`,
                        `  experiments: {`,
                        `    outputModule: true`,
                        `  }`,
                        `};`
                    ].join("\n")
                )
            );

            run(`npx webpack --config ${pathBasename(webpackConfigJsFilePath)}`, {
                cwd: pathDirname(webpackConfigJsFilePath)
            });

            fs.readdirSync(webpackOutputDirPath)
                .filter(fileBasename => !fileBasename.endsWith(".txt"))
                .map(fileBasename => pathJoin(webpackOutputDirPath, fileBasename))
                .forEach(bundleFilePath => {
                    assert(bundleFilePath.endsWith(".js"));

                    if (pathBasename(bundleFilePath) === "index.js") {
                        fs.renameSync(webpackOutputFilePath, filePath);
                    } else {
                        const bundleFileBasename = pathBasename(bundleFilePath);

                        assert(!extraBundleFileBasenames.has(bundleFileBasename));
                        extraBundleFileBasenames.add(bundleFileBasename);

                        fs.renameSync(
                            bundleFilePath,
                            pathJoin(pathDirname(filePath), bundleFileBasename)
                        );
                    }
                });

            fs.rmSync(webpackOutputDirPath, { recursive: true });
        });
}
