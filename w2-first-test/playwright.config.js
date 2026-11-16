//w2-first-test/playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
    use: {
        testIdAttribute: 'data-test',
    },
});
