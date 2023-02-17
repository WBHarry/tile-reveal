import gsap, { PixiPlugin } from '/scripts/greensock/esm/all.js';
import { toggle } from './tileRevealHud.js';

export const setupGSAP = () => {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
}

export const setupSockets = async() => {
        game.socket.on(`module.tile-reveal`, async request => {
            switch(request.type){
                case RequestType.animateReveal:
                    const tile = game.canvas.tiles.get(request.data.objectId);
                    toggle(tile);
                    break;
            }
        });
};

export const RequestType = {
    animateReveal: 'Animate Reveal',
};