import { renderHUD } from './modules/tileRevealHud.js';
import { renderTileConfig } from './modules/tileRevealConfig.js';
import { setupGSAP, setupSockets } from "./modules/setup.js";

Hooks.once('init', async () => {
    setupGSAP();
    setupSockets();
});

Hooks.on('renderTileHUD', async (data, html) => {
    await renderHUD(data, html);
});

Hooks.on('renderTileConfig', async (options, html) => {
    await renderTileConfig(options, html);
});

Hooks.on('ready', async () => {
    await setupSockets();
});