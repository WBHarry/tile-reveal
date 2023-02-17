export const renderTileConfig = async (app, html) => {
    const altImage = app.object.getFlag('tile-reveal', 'alternativeImage') ?? '';
    const basicTab = $(html).find('div[data-tab=basic]');
    const firstGroup = $(basicTab).find('div.form-group').first();
    $(firstGroup).after(await renderTemplate('modules/tile-reveal/templates/tileRevealConfigBasic.hbs', { altImage: altImage }));
    $(basicTab).find('#alt-image-src').change(async event => {
        app.object.setFlag('tile-reveal', 'alternativeImage', event.currentTarget.value);
        app.render();
    });
    app.setPosition({ height: "auto" });
};