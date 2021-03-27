// Remove bar 2 for all tokens on map.
const tokens = canvas.tokens.placeables.map(token => {
    return {
        _id: token.id,
        "bar1.attribute": "attributes.hp",
        "bar2.attribute": "attributes.ac",
    };
});
canvas.scene.updateEmbeddedEntity('Token', tokens)