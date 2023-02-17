import gsap from "/scripts/greensock/esm/all.js";
import { RequestType } from './setup.js';

export const renderHUD = async (data, html) => {
    if(game.user.isGM){
        const rightColumn = $(html).find('.col.right');
        $(rightColumn).append(await renderTemplate('modules/tile-reveal/templates/tileRevealHUD.hbs'));

        $(rightColumn).find('.tileReveal.revealHud').click(async () => {
            await toggleTileState(data.object);
            data.clear();
        });
    }
}

const toggleTileState = async (tile) => {
    await game.socket.emit(`module.tile-reveal`, { type: RequestType.animateReveal, data: { objectId: tile.id } });
    toggle(tile);
}

export const toggle = async (tile) => {
    let altImage = tile.document.getFlag('tile-reveal', 'alternativeImage');
    let currentImage = tile.document.texture.src;
    if(altImage != currentImage){
        const timeline = gsap.timeline(
            {
            onComplete: async () => {
                if(game.user.isGM){
                    tile.document.setFlag('tile-reveal', 'alternativeImage', currentImage);
                    await tile.document.update({ 'texture.src': altImage });
                }

                const timelineReturn = gsap.timeline({
                    onComplete: async () => {
                        if(game.user.isGM){
                            await tile.document.update({  'alpha': 1 });
                        }
                    }
                });
                await timelineReturn.fromTo(tile.mesh, {pixi: { alpha: 0 }},{pixi: { alpha: 1 }, duration: 1});
            }
        }
        );
        await timeline.to(tile.mesh, {pixi: { alpha: 0 }, duration: 1});
    }
} 