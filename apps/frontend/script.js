import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join, extname } from "path";

const REPLACEMENTS = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u', 'ñ': 'n',
    'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ü': 'U', 'Ñ': 'N',
};

const PATTERN = new RegExp(Object.keys(REPLACEMENTS).join("|"), "g");
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);

const process = (dir) => {
    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);

        if (statSync(path).isDirectory()) {
            process(path);
            continue;
        }

        if (!EXTENSIONS.has(extname(entry))) continue;

        const original = readFileSync(path, "utf-8");
        const replaced = original.replace(PATTERN, (m) => REPLACEMENTS[m]);

        if (original !== replaced) {
            writeFileSync(path, replaced, "utf-8");

            original.split("\n").forEach((line, i) => {
                const newLine = replaced.split("\n")[i];
                if (line !== newLine) {
                    console.log(`${path}:${i + 1}`);
                    console.log(`  - ${line.trim()}`);
                    console.log(`  + ${newLine.trim()}`);
                }
            });
        }
    }
};

const src = process.argv?.[2] ?? "./src";
process(src);